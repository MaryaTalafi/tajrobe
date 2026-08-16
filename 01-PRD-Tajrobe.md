# Tajrobe (تجربه) — Product Requirements Document

**Role:** Senior Product Manager
**Product:** Event Management Platform (comparable to Evand / eSeminar)
**Phase:** MVP
**Deploy target:** Vercel

---

## 1. Vision & Positioning

**Tajrobe** ("Experience") is an event discovery and management platform — online, in-person,
or offline/recorded. Copy, empty states, emails, and visual tone should feel like an invitation
into something meaningful, not a ticketing transaction. The product must be fully in Farsi and
fully RTL, since the target user base is Iranian.

## 2. Terminology / Role Glossary

| Generic term | Product term (FA) | Product term (EN, for docs/code) | Role |
|---|---|---|---|
| Organizer | میزبان تجربه | **Experience Host** | Creates & manages events |
| Attendee / Participant | تجربه‌گرا | **Tajrobegara** (Experience Seeker) | Registers & attends events |
| Admin | ادمین | **Admin** | Platform-wide management |

## 3. Target Users / Personas

1. **Experience Host** — creates and manages events.
2. **Tajrobegara** — discovers and joins events; can browse freely without an account.
3. **Admin** — platform operator; manages events, users, and categories.

### 3.1 Host/Seeker Model

There is no separate "Host account type," matching how Evand and eSeminar actually work: any
authenticated user can create an event, and the moment they do, they become the **Host of that
specific event** (event-level ownership, not an account-level role). A user can simultaneously
be the Host of some events and a Tajrobegara registered for others.

## 4. Competitive Frame of Reference

Evand and eSeminar are the reference platforms for the core discovery → registration loop and
for the organizer/attendee permission logic (§3.1). Tajrobe differentiates on tone (warm,
experience-first copy) and on not requiring an account just to browse.

## 5. Functional Requirements

### 5.1 Event Creation (Host)

- Title (required), start/end date (required), optional start/end time toggle, cover image
  (required), optional price (default = Free), mode (`Online` / `In-person` /
  `Offline (recorded)`), category (required), rich-text description.
- Draft vs Published state.
- Mode-specific fields: join link (Online), address (In-person), recording link
  (Offline/recorded).
- Creating an event requires login (see §5.7).

### 5.2 Explore / Discovery Page

- Public — no login required to browse or search.
- Free-text search across title/description.
- Filters on event attributes:
  - Category
  - Event mode (Online / In-person / Offline-recorded)
  - Price (Free / Paid)
  - Date range
- Event card shows: name, banner image, mode, price ("Free" if unset), host name. Ratings are
  **not** shown on the card — they only appear on the event detail page (§5.3), to keep the
  card scan-friendly.

### 5.3 Event Detail Page

- Fully viewable without login: description, schedule, host, mode info — except the
  gated/sensitive fields (join link / address / recording link), which stay hidden until the
  viewer has registered.
- **Register** button → if the viewer isn't logged in, triggers the OTP login flow, then
  completes registration immediately (no payment gate this phase).
- **Favorite/wishlist** toggle — requires login.
- **Add to Google Calendar.**
- Host view: an **Edit** entry point and an **attendee list**, visible only to the event's
  Host.
- **Comments & Ratings:**
  - Any Tajrobegara who has registered for the event may leave a **1–5 star rating** and an
    optional text comment, at any time after registering — there is no restriction requiring
    the event to have started or ended first.
  - One rating/comment per user per event, editable by its author.
  - Since only registered attendees can rate/comment at all, every comment inherently comes
    from someone who joined that experience. To make this visible and credible to readers
    (rather than leaving it as an invisible backend rule), each comment displays a small,
    understated badge next to the commenter's name — e.g. **"این تجربه رو تجربه کرده"**
    ("Experienced this"). The badge must read as a quiet trust signal, not a loud "verified"
    checkmark — low-contrast styling, small type, positioned beside the name rather than
    competing with the comment text itself, so it never distracts from or confuses the reading
    of the comments themselves.
  - Average rating is displayed prominently at the top of the detail page; individual comments
    are listed below, newest first.

### 5.4 Admin Panel

- Manage all events (view/edit/unpublish/delete).
- Manage all users (view, change role, deactivate).
- Manage categories: create a new category, delete an existing one. When a category is
  deleted, any events that were assigned to it are automatically reassigned to the **"سایر"
  (Other)** category rather than being left uncategorized or blocked from deletion.

### 5.5 Authentication

- Passwordless, OTP-only: user enters their email, receives a one-time code, logs in with it —
  no password is ever created or stored.
- Only two actions require login: **(1)** registering for an event, **(2)** creating an event.
  Everything else — browsing, searching, filtering, reading an event's public details, reading
  ratings/comments — is open, no account needed.
- **"Remember me"**: if unchecked, the session does not persist — the user is logged out the
  next time they open the app. If checked, the session persists across visits.

### 5.6 Categories

Starter category set (Admin can add more or delete unused ones at any time; "سایر" is the
permanent fallback bucket described in §5.4 and should never itself be deletable):

1. آموزشی و کارگاه (Workshop & Educational)
2. سمینار و کنفرانس (Seminar & Conference)
3. موسیقی و کنسرت (Music & Concert)
4. هنر و فرهنگ (Art & Culture)
5. ورزشی (Sports)
6. کسب‌وکار و استارتاپ (Business & Startup)
7. فناوری (Technology)
8. شبکه‌سازی و میت‌آپ (Networking & Meetup)
9. سلامت و سبک زندگی (Health & Lifestyle)
10. سفر و طبیعت‌گردی (Travel & Outdoor)
11. کودک و خانواده (Kids & Family)
12. سایر (Other) — permanent, non-deletable fallback category

### 5.7 Notifications — Email

- Immediate confirmation email on successful registration.
- Reminder email sent 1 hour before the event's start time.
- Both written in warm, Farsi, branded copy (see §6.4).

### 5.8 Google Calendar Integration

Every event offers an "Add to Google Calendar" action (and an `.ics` download as a fallback),
pre-filled with title, date/time, location or join link, and description. Surfaced on the
event detail page and in the confirmation email.

### 5.9 Responsiveness

Every page — public and admin — must be fully responsive across mobile, tablet, and desktop,
tested against real Farsi content (long titles, RTL numeral formatting). This is a hard
requirement for Phase 1 sign-off, not a later pass.

## 6. Design Requirements

### 6.1 Overall Direction

Warm, human, experience-first.

### 6.2 Color Palette — Sage / Sedr Green

**Primary — Sedr/Sage Green scale**

| Token | Hex | Usage |
|---|---|---|
| primary-50 | `#F2F6F0` | Page tints, subtle backgrounds |
| primary-100 | `#E1EADD` | Hover backgrounds, badges |
| primary-200 | `#C3D6BB` | Borders, dividers on light surfaces |
| primary-300 | `#A0BE93` | Secondary icons, disabled-active states |
| primary-400 | `#7FA46E` | Secondary buttons, links |
| primary-500 | `#5F8A4F` | Core brand accent |
| primary-600 | `#4A6E3E` | Primary buttons, brand mark |
| primary-700 | `#3A5631` | Button hover/active |
| primary-800 | `#2C4126` | Headings on light bg (high contrast) |
| primary-900 | `#20301C` | Dark mode surfaces / footer |

**Secondary — Warm Sand/Gold**

| Token | Hex | Usage |
|---|---|---|
| accent-100 | `#FBF1DD` | Highlight backgrounds |
| accent-400 | `#E3B15C` | "Paid" tag, star/favorite icon |
| accent-600 | `#C6902F` | Accent hover state |

**Neutrals**

| Token | Hex | Usage |
|---|---|---|
| neutral-0 | `#FFFFFF` | Surfaces |
| neutral-50 | `#F7F8F6` | App background |
| neutral-200 | `#E4E7E1` | Borders |
| neutral-500 | `#7C8579` | Secondary text |
| neutral-800 | `#2B2F29` | Primary text |

**Semantic**

| Token | Hex | Usage |
|---|---|---|
| success | `#4A6E3E` | Reuses primary-600 (registration confirmed) |
| warning | `#C6902F` | Reuses accent-600 |
| error | `#B3462C` | Form errors, destructive actions |
| info | `#3D6B8A` | Neutral informational messages |

### 6.3 Typography & RTL

- **Vazirmatn** is the confirmed typeface across the entire product — headings, body, forms,
  admin panel, and emails where feasible.
- RTL is a first-class layout requirement, built RTL-native from the start: icon direction,
  form field order, chevrons, date pickers, and scroll/overflow behavior all need to work
  correctly with real Farsi content, not be mirrored after the fact.

### 6.4 Voice & Tone — Warm

Copy should read like a person who's genuinely glad you showed up — warmth through specificity
and directness, not through exclamation-driven hype or corporate phrasing. All shipped copy
must be written in Farsi; the table below shows the tone target via English glosses for
documentation purposes only.

| Context | Avoid | Use |
|---|---|---|
| Sign up as attendee | "Register as user" | "Join as a Tajrobegara" |
| Organizer dashboard | "Organizer panel" | "Experience Host panel" |
| Empty search state | "No results found" | "No experiences match — yet" |
| Registration success | "Registration complete" | "You're in — your experience is booked" |
| Reminder email subject | "Event reminder" | "Your experience starts in 1 hour" |
| Rating prompt | "Leave a review" | "How was it? Tell us about your experience" |
| Attendee comment badge | "Verified" | "Experienced this" |

### 6.5 Component System

Built on shadcn/ui + Tailwind CSS.

### 6.6 Header

- Logo / site name (Tajrobe)
- "Explore experiences" nav link
- Search bar
- Category access point
- "Host an experience" button
- Account menu — shows a login/OTP entry point for guests, and an avatar with
  profile/favorites/logout for authenticated users

### 6.7 Footer

The footer follows standard site-footer conventions, organized into clear columns/sections:

- **Brand column**: logo/site name, one-line tagline reinforcing the warm/experience-first
  positioning, and social media icons (if/when accounts exist).
- **Explore column**: links to the Explore page, and to each category (or a subset of
  featured categories) for quick discovery.
- **Host column**: "Host an experience," and any future host-facing resources (e.g. host
  guidelines) once they exist.
- **Company column**: About, Contact/Support (an email or contact form).
- **Legal column**: Terms of Service, Privacy Policy.
- **Bottom bar**: copyright line (e.g. "© [year] Tajrobe — All rights reserved," in Farsi) and,
  optionally, a language indicator if the product ever becomes multilingual (not required for
  this phase since Farsi is the only supported language).

The footer must be fully responsive: multi-column on desktop, collapsing to a stacked or
accordion layout on mobile, consistent with the RTL requirement across the rest of the product.

### 6.8 Homepage — Landing Page, Structured via StoryBrand (SB7)

This section defines content structure and section order only — not visual design. The
homepage is an attractive landing page: a hero section with a polished animation, then a scroll
into a "Most Popular Experiences" section.

**Section 1 — Hero (Character meets Guide)**
- Establishes the user's underlying desire: real, memorable experiences — not "browsing event
  listings."
- Headline speaking directly to that desire; one-sentence subheadline clarifying what the
  platform does (discover, join, or host experiences — online, in person, or recorded).
- Primary CTA: "Explore experiences" (leads straight into browsing — no login wall). Secondary,
  smaller CTA: "Host an experience."
- Visual: an original hero animation — no existing brand animation assets are available yet, so
  this should be produced as part of Phase 1 (a subtle looping illustration or motion element
  evoking movement/energy/connection). It must feel alive, not static.

**Section 2 — The Problem**
- Names the pain in three registers, kept short (2–3 lines total, not a wall of text):
  - *External*: event listings are scattered and low-signal, hard to find things worth your
    time.
  - *Internal*: the feeling of missing out, of routine, of not having done anything memorable
    lately.
  - *Philosophical*: everyone deserves access to real experiences, not just polished ads for
    them.

**Section 3 — The Guide**
- One warm sentence showing the brand understands the problem above.
- Authority signal(s): concrete numbers once available (experiences hosted, Tajrobegaras,
  featured hosts). Do not fabricate numbers before real data exists — design this section so
  real stats can be slotted in later.

**Section 4 — The Plan**
- A simple 3-step plan:
  1. یک تجربه پیدا کن (Find an experience)
  2. با یک کلیک عضو شو (Join with one click)
  3. تجربه‌ش کن (Experience it)
- Communicates low friction — no account needed until step 2.

**Section 5 — Direct Call to Action**
- A clear "Explore experiences" CTA, echoing the hero CTA.

**Section 6 — Stakes**
- One or two light lines on what's missed without Tajrobe: missed events, more of the same
  routine, clunky ticketing elsewhere. Not fear-driven.

**Section 7 — Success (transformation + social proof) — "Most Popular Experiences"**
- The requested scroll-to-see-popular-experiences moment lives here, doubling as SB7's
  "success" beat. A scannable grid/carousel of top experiences, ranked by registration count,
  reusing the standard event card component (§5.2). Optionally includes a testimonial/quote
  block once real testimonials exist.

**Section 8 — Final CTA + Footer**
- One last direct CTA ("Explore experiences" / "Host an experience"), followed by the standard
  footer defined in §6.7.

This order (Hero → Problem → Guide → Plan → CTA → Stakes → Success/Popular Experiences → Final
CTA → Footer) should not be reordered, since SB7's persuasive logic depends on the sequence.

## 7. Out of Scope for This Phase

- Payment gateway integration.
- Any infrastructure that isn't natively Vercel-compatible (see Tech Spec for the concrete
  stack choices this resolves to).

## 8. Open Questions

None outstanding at this time — all prior open items have been resolved in this revision.
