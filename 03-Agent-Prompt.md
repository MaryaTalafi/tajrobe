# Prompt for the Implementation Agent (Antigravity CLI)

Copy everything below this line into the agent.

---

You are implementing **Tajrobe (تجربه)**, an event management platform, based on two
specification documents that are attached/provided to you:

- `01-PRD-Tajrobe.md` — Product Requirements Document
- `02-TechSpec-Tajrobe.md` — Technical Specification

Read both documents fully before doing anything else. They are authoritative — if something in
this prompt seems to conflict with them, the specs win; ask for clarification rather than
guessing.

## Ground rules

1. **Git first.** Initialize a git repository as your very first action, before writing any
   planning file or any code. Commit continuously and meaningfully throughout the entire
   project — after each logical unit of work (a completed page, a completed endpoint, a passing
   test suite) — with clear, descriptive commit messages. Never do one giant commit at the end.
   Keep the repository in a state that could be handed to another engineer at any point.

2. **Plan before you build.** Based on the PRD and Tech Spec, produce a full implementation
   plan before writing product code. Break it into concrete, checkable tasks, following the
   phase structure already defined in the Tech Spec (§11): Phase 1 = Frontend, Phase 2 =
   Backend, in that order, with a mandatory approval gate between them.

3. **Maintain `state.md` at all times.** Create a file named `state.md` at the root of the
   repository as part of your planning step. This file must always reflect, in real time,
   which phase and which task you are currently on. Update it every time you move to a new
   task or complete one — do not let it go stale. At minimum it should show:
   - The full task list/plan (derived from step 2)
   - Which task is currently in progress
   - Which tasks are done
   - Any open questions or blockers you've hit
   Commit `state.md` updates as part of your normal commit flow (see rule 1).

4. **Build order: Frontend → Backend, with a hard stop in between.**
   - Build the **entire frontend first**, using mocked/fixture data — no real backend, no real
     database, no real auth server. Follow PRD §6.7 for the homepage structure (StoryBrand
     SB7 order) and the Tech Spec §11 Phase 1 checklist for what pages/components are required.
   - The frontend must be fully responsive, RTL-native, use the **Vazirmatn** font, and all
     shipped copy must be in **Farsi**, in the warm tone described in PRD §6.4.
   - Once the frontend is complete, **run the required frontend tests** (component tests,
     responsive/RTL checks, lint/type-check — see Tech Spec §13) before considering it done.
   - **Deliver the finished frontend and then stop. Do not start backend work.** Present what
     you built and explicitly ask the user for confirmation to proceed to the backend. Do not
     assume approval and do not continue automatically — wait for an explicit go-ahead.
   - Only after receiving that confirmation, begin **Phase 2 (backend)** per the Tech Spec:
     Prisma schema, OTP auth + Redis sessions, event/registration/favorite/rating endpoints,
     category admin endpoints, Vercel Blob uploads, email + Vercel Cron reminders, calendar
     integration, admin endpoints — then wire the frontend's mock data layer up to the real
     API.

5. **Deploy target is Vercel only.** Do not introduce self-hosted infrastructure (no
   self-hosted Postgres/Redis/Minio/Grafana/Loki/Prometheus). Use the Vercel-compatible choices
   specified in the Tech Spec (Upstash Redis, Vercel Blob, Vercel Cron, Vercel-native
   monitoring).

6. **Testing is mandatory, not optional**, at both phase boundaries — see Tech Spec §13 for
   exactly what's expected at each stage.

7. **When you hit an open question** listed in either spec document (or a new one you
   discover), record it in `state.md` under "Open questions / blockers" and ask the user rather
   than silently deciding — these affect data model and UX decisions that are hard to walk
   back later.

## What to do right now

1. Initialize git.
2. Read both spec documents in full.
3. Write your implementation plan and create `state.md` reflecting it.
4. Commit the initial plan + `state.md`.
5. Begin Phase 1 (frontend), keeping `state.md` and git commits up to date as you go.
6. When Phase 1 is complete and tested, stop and report back for approval before touching the
   backend.
