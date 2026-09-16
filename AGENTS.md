# ⚠️ AGENTS.md — MANDATORY FIRST READ FOR EVERY AGENT
# This file MUST be read before taking ANY action in this project.
# No exceptions. No shortcuts. These are binding rules.

---

## 🏭 Project Context

**Medikiosk** is an **industry-grade product**, NOT a hobby project.

- **Expected users:** 1,000–2,000 unique users, many of whom are **repeat/returning users**.
- **Hosting:** Vercel (Free Tier — all resource usage must stay within Vercel Free Tier limits).
- **Database:** Supabase (configuration details will be provided by the owner; never assume a schema).
- **Any external resource or service used MUST be free or within a free tier (no paid services without explicit owner approval).**

---

## 📋 RULE 1 — UI/UX: Always Reference the UI/UX Pro Max Intelligence Skill

> **Trigger:** Mandatory before modifying ANY code that affects the frontend.

- Before making any frontend change (HTML, CSS, JS, React components, layout, colors, typography, animations, interactions), you **MUST** first reference and read the **UI/UX Pro Max Intelligence Skill** configured in this project.
- The skill will be located at `.agents/skills/uiux-pro-max/SKILL.md` once configured. Check for it before starting.
- If the skill file does not exist yet, **stop and notify the owner** before proceeding with frontend work.
- This applies to every agent, every time, with no exceptions.

---

## 📋 RULE 2 — Adaptive Responsiveness

- Evaluate every UI component and page for adaptive responsiveness needs.
- If adaptive responsiveness should be applied, **apply it** and **explicitly tell the owner** that you did and why.
- Never silently skip responsiveness. Never assume a desktop-only layout is acceptable.
- Breakpoints, fluid layouts, and adaptive typography must be considered for all screen sizes.

---

## 📋 RULE 3 — Always Choose the Right Path, Not the Fast Path

- **Never rush to completion.** Taking a shortcut now creates technical debt and production bugs later.
- When faced with an "easy method" vs. a "right method," you **MUST always choose the right method**.
- If you are ever unsure which approach is correct, **stop and ask the owner** rather than guessing.
- Incomplete or shortcut implementations must NEVER be committed or presented as done.

---

## 📋 RULE 4 — Industry-Grade Quality for 1,000–2,000 Users

- Every feature, API, component, and query must be built **as if it will serve 1,000–2,000 simultaneous users**, many of whom return regularly.
- Design for:
  - **Scalability**: Code must not degrade under repetitive or concurrent load.
  - **Reliability**: No single points of failure in critical paths.
  - **Performance**: Optimize queries, assets, and rendering paths proactively.
  - **User retention**: Returning users expect consistent, bug-free experiences.
- Never build something "good enough for now." Build it right the first time.

---

## 📋 RULE 5 — Future-Proof Code

- Every line of code must be written with **long-term maintainability** in mind.
- Follow industry standards (naming conventions, separation of concerns, SOLID principles where applicable).
- Avoid magic numbers, hardcoded secrets, or environment-specific assumptions in code.
- Code must be readable and maintainable by a team, not just the original author.
- Leave meaningful comments for non-obvious logic. Do not comment obvious code.

---

## 📋 RULE 6 — Always Choose the Right Method Over the Easy Method

- This is a direct extension of Rule 3. When there are multiple ways to solve a problem:
  - Evaluate each approach on correctness, security, performance, and maintainability.
  - **Always select the approach that scores highest on all four dimensions**, even if it takes more time.
  - Document why you chose the approach in a code comment or in your response.

---

## 📋 RULE 7 — Industry-Grade Terminal Logging

- All server-side code must implement **structured, production-grade logging**.
- Logging standards:
  - Use structured log formats (JSON preferred for server logs) with fields: `timestamp`, `level`, `event`, `userId` (if applicable), `ip`, `method`, `path`, `statusCode`, `durationMs`, `message`.
  - Log levels: `DEBUG`, `INFO`, `WARN`, `ERROR`, `CRITICAL`.
  - **Security events MUST be logged with `WARN` or `ERROR` level**, including:
    - Failed authentication attempts (with IP, timestamp, user agent).
    - Rate limit violations.
    - Unauthorized access attempts (403s, permission denials).
    - Input validation failures on sensitive endpoints.
    - Any detected injection or attack pattern.
  - Logs must NEVER contain sensitive data (passwords, tokens, full credit card numbers, PII beyond necessary identifiers).
  - All logs must be timestamped in ISO 8601 UTC format.
- If a logging utility does not exist in the project yet, create one at `src/lib/logger.ts` (or equivalent) before writing any server-side code that needs logging.

---

## 📋 RULE 8 — Security: Non-Negotiable, Zero Compromise

> **Security is the highest priority. It can NEVER be compromised.**

Mandatory security requirements:

### Authentication & Authorization
- Use industry-standard authentication (e.g., Supabase Auth with JWT). Never roll your own crypto.
- Implement proper **Row Level Security (RLS)** on all Supabase tables.
- Every API route/server action must validate the session/token before processing.
- Implement **role-based access control (RBAC)** — users, shop owners, and admins have strictly separated permissions.

### Input Validation & Sanitization
- **All user input MUST be validated on the server side**, regardless of client-side validation.
- Use a validation library (e.g., Zod) for all API inputs.
- Sanitize all inputs to prevent XSS, SQL injection, and command injection.
- Never trust client-supplied data for authorization decisions (e.g., never trust a `userId` from the request body — always derive it from the verified session).

### API Security
- Implement **rate limiting** on all public-facing API endpoints.
- Use CSRF protection on state-mutating operations.
- Set proper security HTTP headers (Content-Security-Policy, X-Frame-Options, HSTS, etc.).
- Never expose stack traces or internal error details to the client. Log them server-side; return generic error messages to the client.

### Secrets Management
- **NEVER hardcode secrets, API keys, or credentials** in source code.
- All secrets must be in environment variables, loaded via `.env.local` (local) or Vercel environment variable settings (production).
- Never commit `.env` files. Ensure `.gitignore` always excludes them.

### Dependency Security
- Never add a dependency without checking it is actively maintained and has no known critical vulnerabilities.

---

## 📋 RULE 8b — Git History & Pushing

- **Maintain a clean, meaningful git history at all times.**
- Commit messages must follow the Conventional Commits format:
  `type(scope): short description`
  Examples: `feat(auth): add JWT refresh logic`, `fix(ui): correct mobile nav overflow`, `chore(deps): update supabase-js`
- **Never push to any remote branch without explicit owner instruction.**
  When work is complete, state: _"Ready to push. Awaiting your instruction."_
- Never force-push unless the owner explicitly requests it.
- Commits should be atomic — one logical change per commit.

---

## 📋 RULE 9 — Challenge Wrong Approaches; Teach the Right Way

- If the owner's requested approach is technically incorrect, insecure, or will cause problems, **you MUST say so immediately and clearly**.
- Do not comply silently with a bad approach just to please. Respectfully explain:
  1. What is wrong with the requested approach.
  2. What the correct approach is.
  3. Why the correct approach is better (security, performance, maintainability, standards).
- Only proceed with the owner's approach after they have been informed and have explicitly chosen to proceed.
- Teaching is part of your role. Always help the owner learn the right way.

---

## 📋 RULE 10 — Free Tier Only (No Paid Resources Without Approval)

- Every external service, API, library, or infrastructure component used **MUST be free or within its free tier**.
- Before introducing a new external service or dependency, confirm it is free/free-tier eligible.
- If a required feature can only be reasonably achieved with a paid service, **stop and inform the owner** with alternatives before proceeding.

---

## 📋 RULE 11 — No Mock Data Without Explicit Owner Approval

- **Never use mock/fake/placeholder data in production code paths.**
- If mock data is needed for development or testing purposes:
  - It MUST live in a completely separate, clearly named file (e.g., `src/mocks/data.ts` or `__mocks__/`).
  - It MUST be clearly marked with a comment: `// MOCK DATA — REMOVE BEFORE PRODUCTION`.
  - The production code path must have a clear separation from mock data paths.
- **If the owner says "do not use mock data," stop immediately. Do not use it for any purpose.**
- All data displayed on the frontend must either come from the owner-provided data source, or from the live database.

---

## 📋 RULE 12 — Frontend Content Must Be Admin Portal Ready

- **Every piece of data shown on the frontend must be manageable from a future Admin Portal.**
- While building frontend features, maintain a running awareness of:
  - What data is displayed.
  - Where it comes from (database table, API, config).
  - What CRUD operations would be needed to manage it from an admin panel.
- Organize data sources and content logically so that a non-technical admin can eventually manage it.
- When adding new frontend content, document (in a comment or your response) what admin portal operations would control it.
- The Admin Portal has not been built yet. When the owner says to build it, **everything on the frontend must already be wired to manageable, organized data sources**.

---

## 📋 RULE 13 — Strict, Logical File Structure

- Every file must live in the folder that makes the most semantic sense for its purpose.
- If a file grows large enough to warrant splitting, **split it** — but only into logically coherent, well-named files.
- Follow this general structure (adapt as the project stack requires):

```
kochaswala/
├── src/
│   ├── app/              # Next.js App Router pages & layouts
│   ├── components/       # Reusable UI components
│   │   ├── ui/           # Generic, design-system-level components
│   │   └── [feature]/    # Feature-specific components
│   ├── lib/              # Utility functions, helpers, clients
│   │   ├── logger.ts     # Structured logger (REQUIRED — see Rule 7)
│   │   ├── supabase/     # Supabase client initialization
│   │   └── validators/   # Zod schemas / validation logic
│   ├── hooks/            # Custom React hooks
│   ├── types/            # TypeScript type definitions
│   ├── styles/           # Global styles, CSS variables
│   ├── mocks/            # Mock data ONLY (see Rule 11)
│   └── config/           # App-level configuration constants
├── public/               # Static assets (images, fonts, icons)
├── .env.local            # Local environment variables (NEVER commit)
├── AGENTS.md             # This file — mandatory agent rules
└── ...
```

- Never dump files in the root unless they are configuration files that must be there (e.g., `next.config.js`, `package.json`, `AGENTS.md`).
- All changes must stay within **Vercel Free Tier limits** (no large static asset folders that would exceed deployment size limits).

---

## 📋 RULE 14 — Vercel Free Tier Deployment Compliance

- The project is hosted on **Vercel Free Tier**. All decisions must respect these constraints:
  - **Serverless function execution:** Max 10 seconds per invocation (Hobby plan).
  - **Build output size:** Keep within Vercel's free tier limits; optimize assets aggressively.
  - **Edge functions vs. serverless:** Choose appropriately; edge functions have stricter runtime limits.
  - **No long-running background jobs** that require persistent server processes.
  - **Image optimization:** Use `next/image` with Vercel's built-in optimization (within free tier quota limits).
  - **Environment variables:** Managed via Vercel dashboard for production; `.env.local` for local dev.
- If a feature requires infrastructure that exceeds Vercel Free Tier, **stop and inform the owner** before proceeding.

---

## 📋 RULE 15 — Strictly Separated Databases

The project uses **completely separate database schemas/tables** for different domains. Never mix them:

| Domain | Contents | Notes |
|---|---|---|
| **Users DB** | End-user accounts, profiles, preferences, sessions | Customers / app users |
| **Shops DB** | Shop listings, shop details, shop categories, inventory | Shop entity data |
| **Shop Owners DB** | Shop owner accounts, ownership mappings, business details | Separate from end users |
| **Admin/Owner DB** | Project owner + team member accounts, roles, admin permissions | Internal team access only |

- **Never merge these into a single table with a "role" flag.** Keep them architecturally separate.
- Database schema and credentials will be provided by the owner. **Do not assume or create schemas without owner input.**
- When working with any database, always confirm with the owner which domain it belongs to.

---

## 📋 RULE 16 — Never Break Unrelated Code

- Before modifying any file, understand what other parts of the codebase depend on it.
- **Changes to shared utilities, types, database clients, or layouts must be tested against all dependents.**
- If a change would break or alter the behavior of unrelated functionality, **explicitly call this out** in your response before making the change.
- Propose a safe migration path if a breaking change is unavoidable.
- Run any available linting, type-checking, or tests after changes to verify nothing is broken.

---

## 📋 RULE 17 — Ask Before Adding

> If you think something should be added that the owner has not explicitly requested, **ask first, act second.**

- This includes: new dependencies, new pages, new database fields, new API routes, new configuration, new environment variables, new third-party integrations.
- State clearly:
  1. What you want to add.
  2. Why you think it's needed.
  3. What the impact/risk is.
- Wait for explicit owner approval before adding it.

---

## Agent Self-Checklist (Run Before Every Response)

Before taking any action or writing any code, answer these:

- [ ] Have I read this entire `AGENTS.md` file?
- [ ] Does this change affect the frontend? → Did I reference the **UI/UX Pro Max Intelligence Skill**?
- [ ] Have I chosen the **right method**, not just the easy one?
- [ ] Is all user input **validated and sanitized server-side**?
- [ ] Are there **no hardcoded secrets** in my code?
- [ ] Are **security events properly logged**?
- [ ] Does my code stay within **Vercel Free Tier limits**?
- [ ] Does my change **break any unrelated existing code**?
- [ ] Is all data from a **real source** (not mock, unless explicitly approved)?
- [ ] Have I asked the owner before **adding anything not explicitly requested**?
- [ ] Is the **git history clean** and am I waiting for the owner to say "push"?

---

*Last updated by: Project Owner (medikiosk)*
*Enforced for: All AI agents, all sessions, all time.*

<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->
