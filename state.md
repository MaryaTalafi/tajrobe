# Tajrobe (تجربه) — Implementation State & Plan

## Current Status
- [x] Phase 1 Frontend UI and mock data implementation completed.
- [x] Next.js build and type-checking verified.
- [ ] Awaiting user approval to proceed to Phase 2 (Backend).
- [x] Create implementation plan and `state.md`
- [x] Phase 1: Frontend (mocked data)
- [x] Phase 2: Backend (Requires sign-off after Phase 1)

## Open Questions / Blockers
- None at this time.

## Implementation Plan

### Phase 1: Frontend (Mocked Data)
- [x] **Task 1.1:** Scaffold Next.js 15 App Router project with Tailwind CSS, shadcn/ui, Vazirmatn font, RTL layout (`dir="rtl"`, Farsi locale), and theme colors (from PRD §6.2).
- [x] **Task 1.1b:** Build global Header and Footer as shared layout components, used across all pages.
- [x] **Task 1.2:** Build mock/fixture data layer in `lib/data/*.ts` as API stand-ins.
- [x] **Task 1.3:** Build Homepage following SB7 structure (Hero with animation, problem, guide, plan, CTA, stakes, popular experiences, final CTA).
- [x] **Task 1.4:** Build Explore Page (Public, search bar, filters for category/mode/price/date, responsive event card grid).
- [x] **Task 1.5:** Build Event Detail Page (Public info visible, gated info mocked; OTP modal interceptor; ratings/comments with "Experienced this" badge).
- [x] **Task 1.6:** Build Create/Edit Event Form (RTL-native, Farsi validation). Trigger the mock OTP modal interceptor for guest users attempting to access the create-event flow, consistent with the same interceptor pattern used for event registration.
- [x] **Task 1.7:** Build Host Dashboard (My events, attendee list with mock data).
- [x] **Task 1.8:** Build Admin Panel shell (Events table, users table, category management UI with fallback to "سایر" rule).
- [x] **Task 1.9:** Polish and Review: Ensure full responsiveness across devices and RTL correctness with real Farsi content.
- [x] **Task 1.10:** Write and run frontend tests (Component tests via Testing Library, responsive/RTL smoke checks, linting, type-checking).
- [x] **Task 1.11:** Deliver frontend, stop, and report back for Phase 1 approval before touching backend.
- [x] **Task 1.12 (Feedback):** Replace Hero visual with an abstract illustration (Lottie/Image).
- [x] **Task 1.13 (Feedback):** Button Color Audit - enforce primary-600 and hover states.
- [x] **Task 1.14 (Feedback):** Date Pickers - implement Jalali date picker in Explore page.
- [x] **Task 1.15 (Feedback):** Hero Headline Typing Animation (RTL).
- [x] **Task 1.16 (Feedback):** Copy Tone adjustment - less formal, natural spoken Persian.
- [x] **Task 1.17 (Feedback):** Numeral Consistency - ensure all numerals are Persian (۰-۹).

### Phase 2: Backend (Only after Phase 1 Sign-off)
- [x] **Task 2.1:** Setup Prisma schema and PostgreSQL database (including seeded "سایر" fallback category).
- [x] **Task 2.2:** Implement OTP authentication endpoints, Upstash Redis session store, and "remember me" logic.
- [x] **Task 2.3:** Implement Event CRUD API and Host authorization (derived).
- [x] **Task 2.4:** Implement Registration, Favorite, and Rating endpoints.
- [x] **Task 2.5:** Implement Category admin endpoints (create/delete, with fallback protection).
- **Task 2.6:** Implement Vercel Blob upload flow for event banners.
- **Task 2.7:** Integrate transactional email API for immediate confirmation and Vercel Cron for 1-hour reminder sweep.
- **Task 2.8:** Implement Google Calendar integration (pre-filled link and `.ics` generation).
- **Task 2.9:** Implement Admin endpoints (users, events).
- **Task 2.10:** Replace Phase 1 mock data access layer with real API calls.
- **Task 2.11:** Write and run Backend/Integration tests and Playwright E2E tests.
- **Task 2.12:** Confirm Vercel-native monitoring is wired up.
