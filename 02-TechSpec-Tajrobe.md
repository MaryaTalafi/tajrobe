# Tajrobe (تجربه) — Technical Specification

**Role:** Senior Tech Lead
**Companion doc:** `01-PRD-Tajrobe.md`
**Deploy target:** Vercel
**Handoff note:** Build order — **Frontend first (mocked data) → run frontend tests → get
stakeholder sign-off → Backend.** See §11.

---

## 1. Stack

| Layer | Choice |
|---|---|
| Framework | **Next.js 15** (App Router), single codebase for frontend + backend |
| UI | **shadcn/ui** + **Tailwind CSS**, RTL-first, **Vazirmatn** font |
| Database | **PostgreSQL** |
| ORM | **Prisma** |
| Auth | Passwordless **OTP** (email), sessions cached in **Redis** (recommend **Upstash Redis** — serverless-compatible, works natively with Vercel) |
| File storage | **Vercel Blob** for event banners |
| Email | Transactional email API (e.g. Resend) — serverless-friendly |
| Scheduled jobs | Vercel Cron (1-hour-before reminder sweep) |
| Monitoring | Vercel-native (Logs, Analytics, Speed Insights) |
| Deploy | Vercel |
| Testing | Vitest/Jest + Testing Library (unit/component), Playwright (e2e) |
| Version control | Git, initialized at project start, committed continuously (§12) |

## 2. Architecture Overview

```
                    ┌──────────────────────────────┐
                    │         Next.js 15 App         │
                    │   (App Router, Vercel deploy)  │
   Browser ───────▶ │  UI (RSC + client components)  │
   (public browse,  │  Route Handlers / Server Actions│
    no login)       └───────────┬────────────────────┘
                                 │
        ┌────────────────┬──────┼─────────────┬────────────────┐
        ▼                ▼      ▼             ▼                ▼
   PostgreSQL      Upstash Redis  Vercel Blob   Email Provider   Vercel Cron
   (Prisma)      (sessions, OTP  (event banners) (confirmation /  (hourly reminder
                   rate-limit)                    reminder email)  sweep)
```

Everything runs inside the single Next.js app on Vercel — no self-hosted services.

## 3. Data Model (Prisma schema)

```prisma
enum Role {
  ADMIN
  USER   // "Host" status is derived from event ownership, not stored here
}

enum EventMode {
  ONLINE
  IN_PERSON
  OFFLINE_RECORDED
}

enum EventStatus {
  DRAFT
  PUBLISHED
  UNPUBLISHED
}

model User {
  id            String         @id @default(cuid())
  email         String         @unique
  role          Role           @default(USER)
  createdAt     DateTime       @default(now())
  eventsHosted  Event[]        @relation("HostedEvents") // presence of rows here == "is a Host"
  registrations Registration[]
  favorites     Favorite[]
  ratings       Rating[]
}

model OtpCode {
  id        String   @id @default(cuid())
  email     String
  codeHash  String
  expiresAt DateTime
  consumed  Boolean  @default(false)
  createdAt DateTime @default(now())

  @@index([email])
}

model Category {
  id          String  @id @default(cuid())
  name        String  @unique
  slug        String  @unique
  isFallback  Boolean @default(false) // true only for "سایر" (Other) — non-deletable
  events      Event[]
}

model Event {
  id            String         @id @default(cuid())
  title         String
  description   String
  bannerUrl     String
  startDate     DateTime
  endDate       DateTime
  hasTime       Boolean        @default(false)
  price         Int?           // null/0 == free
  mode          EventMode
  location      String?        // IN_PERSON
  joinLink      String?        // ONLINE
  recordingUrl  String?        // OFFLINE_RECORDED
  status        EventStatus    @default(DRAFT)
  hostId        String
  host          User           @relation("HostedEvents", fields: [hostId], references: [id])
  categoryId    String
  category      Category       @relation(fields: [categoryId], references: [id])
  registrations Registration[]
  favorites     Favorite[]
  ratings       Rating[]
  createdAt     DateTime       @default(now())
  updatedAt     DateTime       @updatedAt

  @@index([status, startDate])
  @@index([categoryId])
  @@index([mode])
}

model Registration {
  id             String    @id @default(cuid())
  userId         String
  eventId        String
  user           User      @relation(fields: [userId], references: [id])
  event          Event     @relation(fields: [eventId], references: [id])
  reminderSentAt DateTime?
  createdAt      DateTime  @default(now())

  @@unique([userId, eventId])
  @@index([eventId]) // used for "most popular" ranking (count by eventId)
}

model Favorite {
  id      String @id @default(cuid())
  userId  String
  eventId String
  user    User   @relation(fields: [userId], references: [id])
  event   Event  @relation(fields: [eventId], references: [id])

  @@unique([userId, eventId])
}

model Rating {
  id        String   @id @default(cuid())
  userId    String
  eventId   String
  score     Int      // 1–5
  comment   String?
  user      User     @relation(fields: [userId], references: [id])
  event     Event    @relation(fields: [eventId], references: [id])
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt

  @@unique([userId, eventId]) // one rating per user per event, editable
}
```

**Host-status note**: "is this user a Host?" is answered by `eventsHosted.length > 0`, not a
stored role. Any authenticated `USER` can create an event and instantly becomes that event's
Host.

**Popularity ranking** (homepage "Most Popular Experiences"): order published events by
`COUNT(Registration)` per event, descending — a straightforward aggregate query.

**Category deletion**: deleting a `Category` reassigns every `Event` referencing it to the
fallback `Category` where `isFallback = true` ("سایر" / Other), seeded once at setup and never
deletable itself (enforce this in the delete-category endpoint, not just by convention).

**Rating/attendee badge**: since only users with a `Registration` row for that event can create
a `Rating` (enforced at the API layer, §5–§6), every rating is, by construction, from someone
who registered for that event — no separate "verified attendee" flag is needed on the model.
The "Experienced this" badge shown in the UI (PRD §5.3/§6.4) is a **display-layer** decision,
not a data-layer one: when rendering a `Rating`, the frontend/API response simply needs to
include enough to label it (e.g. join the `Registration` existence, which is guaranteed true),
and render it as a small, low-contrast badge next to the commenter's name.

## 4. Authentication — Passwordless OTP + Redis

- OTP request generates a 6-digit code, stores a **hash** of it (never the raw code) in
  `OtpCode` with a short expiry (e.g. 5 minutes), and rate-limits repeated requests via Redis
  (e.g. max 3 requests / 10 minutes per email).
- OTP verify checks the hash, expiry, and `consumed` flag; on success creates a session:
  session data stored in Redis (`session:<sessionId>` → `{ userId, role }`), with an opaque
  `sessionId` in a signed, httpOnly cookie.
- **"Remember me" checked**: persistent cookie (e.g. 30-day `Max-Age`) + matching long Redis
  TTL.
- **"Remember me" unchecked**: session cookie (no `Max-Age`) + short Redis TTL — on the next
  visit after the browser closes, the cookie is gone and the user must re-authenticate. Always
  validate against the Redis-stored session server-side on every request, never trust the
  cookie alone.

**Trigger points**: browsing, searching, filtering, and viewing event detail pages (minus
gated join-link/address/recording-link fields) are fully public. Login is only triggered by
**Register** on an event and **Create an experience**. Any other account-scoped action
(favorite toggle, leaving a rating, viewing "my favorites," the Host dashboard) also requires a
session, since it's inherently tied to an account, but the *product-level* framing is: login is
only ever forced at the two moments above — everything else that needs a session does so as a
natural consequence of the action itself (you can't favorite something anonymously), not as an
extra gate.

Implementation detail: when a gated action is attempted while logged out, intercept and open
the OTP modal in place rather than redirecting away, so the user returns to exactly where they
were (e.g., mid-registration on event X) after logging in.

## 5. Authorization (RBAC)

| Capability | Admin | Host (derived) | Any authenticated user | Guest |
|---|---|---|---|---|
| Browse/search/filter events | ✅ | ✅ | ✅ | ✅ |
| View event detail (public fields) | ✅ | ✅ | ✅ | ✅ |
| Register for an event | ✅ | ✅ | ✅ | ❌ (prompted to log in) |
| Create an event (becomes Host of it) | ✅ | ✅ | ✅ | ❌ (prompted to log in) |
| Edit/delete *own* hosted event | – | ✅ (own only) | – | – |
| Edit/delete *any* event | ✅ | – | – | – |
| View own event's attendee list | – | ✅ (own only) | – | – |
| Rate/comment on an event | ✅ | ✅ | ✅ (must be registered for that event) | ❌ |
| Manage users | ✅ | – | – | – |
| Create/delete categories | ✅ | – | – | – |

## 6. API Surface

```
POST   /api/auth/otp/request        { email }
POST   /api/auth/otp/verify         { email, code, rememberMe }
POST   /api/auth/logout

GET    /api/events                  ?search=&category=&mode=&price=&dateFrom=&dateTo=&page=
GET    /api/events/:id
POST   /api/events                  (auth required — creator becomes Host)
PATCH  /api/events/:id              (Host, own event only)
DELETE /api/events/:id              (Admin, or Host own event)
GET    /api/events/popular          top events by registration count (homepage)

POST   /api/events/:id/register     (auth required)
GET    /api/events/:id/attendees    (Host, own event only)

POST   /api/events/:id/favorite     toggle (auth required)
GET    /api/me/favorites            (auth required)

GET    /api/events/:id/ratings      list, includes attendee-badge flag (public)
POST   /api/events/:id/ratings      create/update own rating (auth + must be registered)

GET    /api/events/:id/calendar.ics
                                     + Google Calendar pre-filled render link (client-built)

GET    /api/categories              (public)
POST   /api/admin/categories        (Admin) create
DELETE /api/admin/categories/:id    (Admin) delete — reassigns its events to the fallback
                                     "سایر" category; the fallback category itself cannot be
                                     targeted by this endpoint

# Admin
GET    /api/admin/events
GET    /api/admin/users
PATCH  /api/admin/users/:id
```

## 7. File Storage — Vercel Blob

- Event banners uploaded via `@vercel/blob`'s client upload flow: the frontend requests a
  signed upload token from a server action, uploads directly to Blob storage, then submits the
  resulting URL as part of the event form.
- Store the resulting public URL on `Event.bannerUrl`.

## 8. Email System

Immediate confirmation on registration + a Vercel Cron sweep for the "starts in 1 hour"
reminder (query `Registration`s joined to `Event` in the `[now+55m, now+65m]` window where
`reminderSentAt IS NULL`, then stamp it). Copy is Farsi and warm, per PRD §6.4.

## 9. Google Calendar Integration

Pre-filled Google Calendar render link (`calendar.google.com/calendar/render?action=TEMPLATE...`)
plus a downloadable `.ics` fallback, both surfaced on the event detail page and in the
confirmation email. No OAuth required for either.

## 10. Monitoring & Storage

- **Monitoring**: Vercel's built-in Logs, Analytics, and Speed Insights — no self-hosted
  observability stack.
- **File storage**: Vercel Blob (§7) — no self-hosted object storage.
- **Redis**: Upstash Redis (or any HTTP-based/serverless-compatible Redis), since traditional
  self-hosted Redis doesn't suit serverless function connection patterns.

The full stack is deployable as Vercel + managed PostgreSQL + managed Redis + managed email,
with nothing left to self-host.

## 11. Implementation Phases

### Phase 1 — Frontend (mocked data)
1. Project scaffold: Next.js 15 App Router + Tailwind + shadcn/ui, Vazirmatn font wired in,
   RTL layout at the root (`dir="rtl"`, Farsi locale), theme tokens from PRD's color palette.
2. Mock/fixture data layer standing in for the API, isolated behind a `lib/data/*.ts` interface
   so Phase 2 can swap in real fetches without touching components.
3. Homepage built per the SB7 structure in PRD §6.8: hero (with an original animation) →
   problem → guide → plan → CTA → stakes → popular experiences (mock-ranked list) → final CTA →
   footer (PRD §6.7).
4. Explore page: search bar + filter controls for category, mode, price, date range; responsive
   event card grid (no rating badge on the card, per PRD §5.2).
5. Event detail page: public info always visible; gated info (join link/address/recording,
   register button behavior, favorite toggle) wired to a mock "requires login" interceptor that
   opens the OTP modal shell. Ratings/comments section with average score, comment list, the
   "Experienced this" badge next to each commenter's name, and a submission form.
6. Create/Edit Event form.
7. Host dashboard: my events, attendee list (mock data).
8. Admin panel shell: events table, users table, category management (create/delete UI,
   reflecting that deleting a category reassigns its events to "سایر").
9. Every page reviewed for full responsiveness (mobile/tablet/desktop) and RTL correctness with
   real Farsi sample content (long strings, numerals).
10. All copy shipped in this phase is Farsi, in the warm tone from PRD §6.4.
11. After the frontend is complete, run the required frontend tests (component tests via
    Testing Library, responsive/RTL smoke checks, lint/type-check) before it's considered done.
12. Deliver the finished frontend and stop. Do not begin backend work yet.

### Phase 1 → Phase 2 Gate
Explicit stakeholder confirmation is required before starting backend work. Present the
finished frontend and wait for approval; do not auto-proceed.

### Phase 2 — Backend (only after sign-off)
1. Prisma schema + migrations (§3) against PostgreSQL, including the seeded fallback "سایر"
   category.
2. Auth: OTP endpoints, Upstash Redis session store, remember-me logic (§4).
3. Event CRUD + derived-Host authorization (§5, §6).
4. Registration + Favorite + Rating endpoints, including the category-reassignment-on-delete
   logic.
5. Category admin endpoints (create/delete, with fallback protection).
6. Vercel Blob upload flow for banners (§7).
7. Email integration: immediate confirmation + Vercel Cron reminder job (§8).
8. Calendar link/.ics generation (§9).
9. Admin endpoints (users/events/categories).
10. Replace Phase 1 mock data-access layer with real API calls.
11. Backend/integration + e2e tests (§13).
12. Confirm Vercel-native monitoring is wired up (§10).

### Phase 3 — Explicitly Out of Scope Now
- Payment gateway integration.

## 12. Version Control Requirements

- Initialize a git repository at the very beginning of implementation, before any planning
  artifacts or code are written.
- Commit continuously and meaningfully throughout the work — after each logical unit (a
  completed page, a completed endpoint, a passing test suite) — with clear commit messages, not
  one large commit at the end.
- The repository itself is a deliverable and should be usable/handoff-ready at any point in the
  process.

## 13. Testing Requirements

- **Phase 1 (frontend) exit criteria**: component tests (Testing Library) for core interactive
  components (event card, filters, OTP modal shell, rating form with the attendee badge), a
  responsive/RTL smoke pass, and a clean lint/type-check — all run and passing before frontend
  is marked complete.
- **Phase 2 (backend) — unit tests**: OTP hashing/verification, price/free formatting, event
  date validation, "most popular" ranking query, reminder-window query logic, category-delete
  reassignment logic.
- **Phase 2 — integration tests**: full auth flow against test DB + test Redis; authorization
  checks (a Host can't edit another Host's event; only registered users can rate; only Admin
  can manage categories; the fallback category can't be deleted).
- **Phase 2 — e2e tests** (Playwright): guest can browse/search/filter without login → gets
  prompted to log in only at Register/Create-event → full register-for-event happy path → leave
  a rating and see the attendee badge render → remember-me-unchecked results in logout on next
  visit.

## 14. Security Checklist

- [ ] OTP codes hashed at rest, never logged in plaintext.
- [ ] OTP request + verify endpoints rate-limited via Redis.
- [ ] Session validated against Redis on every request, not just cookie presence.
- [ ] Remember-me unchecked → non-persistent cookie **and** short Redis TTL, verified by test.
- [ ] New session ID issued on every login (no fixation).
- [ ] CSRF protection on all mutating endpoints.
- [ ] Role/ownership checks enforced server-side on every protected route (including "is this
      user the Host of this specific event," not just "is this user a Host").
- [ ] Blob upload tokens scoped/short-lived.

## 15. Open Technical Questions

None outstanding at this time.
