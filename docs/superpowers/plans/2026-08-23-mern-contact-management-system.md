# MERN Contact Management System Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a recruiter-ready MERN contact manager with React + TypeScript frontend, Express + TypeScript backend, MongoDB/Mongoose persistence, CRUD, search, category filtering, validation, tests, and polished documentation.

**Architecture:** A Vite React client calls a typed Axios API layer. An Express API validates requests with Zod, delegates persistence to Mongoose models/controllers, and returns a consistent JSON/error contract. Search and category filtering are server-side; the client owns presentation and interaction state only.

**Tech Stack:** React 18+, TypeScript, Vite, Axios, React Testing Library, Vitest, Node.js 20+, Express, Mongoose, MongoDB, Zod, Supertest.

**Spec:** `docs/superpowers/specs/2026-08-23-mern-contact-management-system-design.md`

## Global Constraints

- Preserve scope as a single shared contact collection; no auth, JWT, roles, uploads, pagination, or real-time features.
- Contact fields: firstName, lastName, email, phone, optional company, category, optional notes, timestamps.
- Category values are exactly `personal`, `work`, `other`.
- Search must run through the API across first name, last name, email, phone, and company.
- `.env` files must never be committed; provide `.env.example` files instead.
- No real personal contact dataset may be committed.
- README must disclose this is a reconstructed and polished university coursework project.

---

### Task 1: Repository foundation and backend validation/model

**Files:**
- Create: `.gitignore`
- Create: `server/package.json`
- Create: `server/tsconfig.json`
- Create: `server/.env.example`
- Create: `server/src/models/Contact.ts`
- Create: `server/src/validation/contact.ts`
- Create: `server/src/validation/contact.test.ts`

**Interfaces:**
- Produces `ContactCategory`, Mongoose `Contact` model, `contactInputSchema`, `contactQuerySchema`.

- [ ] **Step 1:** Add server package/config files with Express, Mongoose, Zod, CORS, dotenv, TypeScript, Vitest, Supertest, tsx, and type packages.
- [ ] **Step 2:** Write failing validation tests for required fields, email normalization, allowed categories, and notes length.
- [ ] **Step 3:** Run `npm test -- contact.test.ts` in `server` and confirm RED.
- [ ] **Step 4:** Implement Zod schemas and the Mongoose model matching the spec exactly.
- [ ] **Step 5:** Run validation tests and confirm GREEN.
- [ ] **Step 6:** Commit `feat: add contact model and validation`.

### Task 2: Express app, error contract, and database wiring

**Files:**
- Create: `server/src/app.ts`
- Create: `server/src/server.ts`
- Create: `server/src/config/db.ts`
- Create: `server/src/middleware/errorHandler.ts`
- Create: `server/src/app.test.ts`

**Interfaces:**
- Produces `createApp()` and `/health` endpoint.

- [ ] **Step 1:** Write failing tests for `GET /health` and 404 JSON behavior.
- [ ] **Step 2:** Run tests and confirm RED.
- [ ] **Step 3:** Implement `createApp()` with JSON size limit, configured CORS origin, routes placeholder, 404 handler, and central error middleware.
- [ ] **Step 4:** Implement Mongo connection helper and startup entrypoint using `MONGODB_URI` and `PORT`.
- [ ] **Step 5:** Run tests and confirm GREEN.
- [ ] **Step 6:** Commit `feat: add express application foundation`.

### Task 3: Contact CRUD API

**Files:**
- Create: `server/src/controllers/contacts.ts`
- Create: `server/src/routes/contacts.ts`
- Create: `server/src/routes/contacts.test.ts`

**Interfaces:**
- Produces `GET /api/contacts`, `GET /api/contacts/:id`, `POST /api/contacts`, `PUT /api/contacts/:id`, `DELETE /api/contacts/:id`.

- [ ] **Step 1:** Write failing API tests for create, list, get, update, delete, malformed ID, and not-found behavior using an isolated test DB or model-level test doubles only where unavoidable.
- [ ] **Step 2:** Run tests and confirm RED.
- [ ] **Step 3:** Implement controllers with Zod validation, Mongoose operations, and the exact error contract from the spec.
- [ ] **Step 4:** Wire routes under `/api/contacts`.
- [ ] **Step 5:** Run API tests and confirm GREEN.
- [ ] **Step 6:** Commit `feat: add contact CRUD API`.

### Task 4: Search and category filtering

**Files:**
- Modify: `server/src/controllers/contacts.ts`
- Modify: `server/src/routes/contacts.test.ts`

**Interfaces:**
- Extends `GET /api/contacts?search=&category=`.

- [ ] **Step 1:** Add failing tests for case-insensitive search and category filtering, including combined filters.
- [ ] **Step 2:** Run tests and confirm RED.
- [ ] **Step 3:** Implement escaped regex search across firstName, lastName, email, phone, company and validated category filtering; sort by `updatedAt` descending.
- [ ] **Step 4:** Run tests and confirm GREEN.
- [ ] **Step 5:** Commit `feat: add contact search and filtering`.

### Task 5: React client foundation and typed API

**Files:**
- Create: `client/package.json`
- Create: `client/tsconfig.json`
- Create: `client/vite.config.ts`
- Create: `client/index.html`
- Create: `client/.env.example`
- Create: `client/src/main.tsx`
- Create: `client/src/App.tsx`
- Create: `client/src/types/contact.ts`
- Create: `client/src/api/contacts.ts`
- Create: `client/src/api/contacts.test.ts`

**Interfaces:**
- Produces `Contact`, `ContactInput`, and typed API functions `listContacts`, `getContact`, `createContact`, `updateContact`, `deleteContact`.

- [ ] **Step 1:** Add Vite/React/TypeScript/Axios/Vitest/RTL configuration.
- [ ] **Step 2:** Write failing tests for query serialization and API response typing behavior.
- [ ] **Step 3:** Run tests and confirm RED.
- [ ] **Step 4:** Implement typed Axios client using `VITE_API_BASE_URL`.
- [ ] **Step 5:** Run tests and confirm GREEN.
- [ ] **Step 6:** Commit `feat: add typed React client foundation`.

### Task 6: Contact list, search, and filter UI

**Files:**
- Create: `client/src/pages/ContactsPage.tsx`
- Create: `client/src/components/ContactList.tsx`
- Create: `client/src/components/ContactCard.tsx`
- Create: `client/src/components/SearchBar.tsx`
- Create: `client/src/components/CategoryFilter.tsx`
- Create: `client/src/pages/ContactsPage.test.tsx`

**Interfaces:**
- Page loads contacts from the API and refreshes when search/category changes.

- [ ] **Step 1:** Write failing tests for loading, contact rendering, empty state, no-match state, search, filter, and API error UI.
- [ ] **Step 2:** Run tests and confirm RED.
- [ ] **Step 3:** Implement page state, request lifecycle, search/filter controls, and responsive cards.
- [ ] **Step 4:** Run tests and confirm GREEN.
- [ ] **Step 5:** Commit `feat: add contact list search and filters`.

### Task 7: Create and edit contact flows

**Files:**
- Create: `client/src/components/ContactForm.tsx`
- Modify: `client/src/pages/ContactsPage.tsx`
- Create: `client/src/components/ContactForm.test.tsx`

**Interfaces:**
- `ContactForm` accepts optional contact data, submit callback, cancel callback, and submitting state.

- [ ] **Step 1:** Write failing tests for required-field validation, create submit, edit prefill, edit submit, and disabled submit state.
- [ ] **Step 2:** Run tests and confirm RED.
- [ ] **Step 3:** Implement form validation and create/edit panel behavior.
- [ ] **Step 4:** Refresh the list after successful mutations and surface server errors.
- [ ] **Step 5:** Run tests and confirm GREEN.
- [ ] **Step 6:** Commit `feat: add create and edit contact flows`.

### Task 8: Delete confirmation and mutation feedback

**Files:**
- Create: `client/src/components/ConfirmDialog.tsx`
- Modify: `client/src/pages/ContactsPage.tsx`
- Create: `client/src/components/ConfirmDialog.test.tsx`

**Interfaces:**
- Delete requires explicit confirmation before API call.

- [ ] **Step 1:** Write failing tests for cancel, confirm, disabled state, and post-delete refresh.
- [ ] **Step 2:** Run tests and confirm RED.
- [ ] **Step 3:** Implement confirmation dialog and delete flow.
- [ ] **Step 4:** Run tests and confirm GREEN.
- [ ] **Step 5:** Commit `feat: add safe contact deletion`.

### Task 9: Responsive recruiter-facing styling

**Files:**
- Create: `client/src/styles/app.css`
- Modify: relevant client components only as needed for semantic classes.

**Interfaces:**
- No new data interfaces; presentation only.

- [ ] **Step 1:** Add responsive desktop/mobile layout, accessible focus states, category badges, form panel, empty/error states, and action controls.
- [ ] **Step 2:** Run client tests.
- [ ] **Step 3:** Run `npm run build` and `npm run typecheck` in `client`.
- [ ] **Step 4:** Commit `style: polish contact management dashboard`.

### Task 10: Documentation and final verification

**Files:**
- Replace: `README.md`
- Modify: `.gitignore` if needed

**Interfaces:**
- Documents setup, API, architecture, testing, and reconstruction disclosure.

- [ ] **Step 1:** Write README with overview, features, stack, folder structure, setup, environment variables, API table, tests, and coursework reconstruction disclosure.
- [ ] **Step 2:** Verify no secret-bearing files are tracked.
- [ ] **Step 3:** Run server typecheck/tests.
- [ ] **Step 4:** Run client typecheck/tests/build.
- [ ] **Step 5:** Review generated UI manually enough to confirm loading, empty, create, edit, delete, search, and filter flows.
- [ ] **Step 6:** Commit `docs: complete MERN contact manager portfolio project`.

## Self-Review

- Spec coverage: all CRUD, search, category filtering, validation, responsive UI, error states, testing, security/privacy constraints, and reconstruction disclosure are mapped to tasks.
- Placeholder scan: no TBD/TODO/future implementation placeholders remain.
- Type consistency: frontend and backend both use the same category literals and editable contact fields.
