# MERN Contact Management System Design

## Goal
Reconstruct and polish the university MERN Contact Management assignment as a professional, recruiter-friendly full-stack CRUD project while preserving the scope of the original coursework.

## Product Scope

The application manages a single shared collection of contacts. It intentionally does not include authentication, roles, multi-tenancy, payments, messaging, or unrelated features.

Users can:

- View all contacts.
- Create a contact.
- Edit an existing contact.
- Delete a contact after confirmation.
- Search contacts by name, email, phone, or company.
- Filter contacts by category.
- See clear loading, validation, empty, success, and error states.

## Technology Choices

### Frontend

- React 18+
- TypeScript
- Vite
- React Router
- Axios
- React Testing Library + Vitest
- Plain CSS or CSS modules; no heavy component framework is required

### Backend

- Node.js 20+
- Express
- TypeScript
- MongoDB
- Mongoose
- Zod for request validation
- Vitest or Jest + Supertest for API tests

### Development

- npm workspaces are not required; the repository will use separate `client` and `server` folders with their own package manifests.
- `.env` files are ignored.
- `.env.example` files document configuration without secrets.

## Repository Structure

```text
mern-contact-management-system/
├── README.md
├── .gitignore
├── client/
│   ├── package.json
│   ├── tsconfig.json
│   ├── vite.config.ts
│   ├── index.html
│   └── src/
│       ├── main.tsx
│       ├── App.tsx
│       ├── api/
│       │   └── contacts.ts
│       ├── components/
│       │   ├── ContactForm.tsx
│       │   ├── ContactList.tsx
│       │   ├── ContactCard.tsx
│       │   ├── SearchBar.tsx
│       │   ├── CategoryFilter.tsx
│       │   └── ConfirmDialog.tsx
│       ├── pages/
│       │   └── ContactsPage.tsx
│       ├── types/
│       │   └── contact.ts
│       └── styles/
│           └── app.css
├── server/
│   ├── package.json
│   ├── tsconfig.json
│   ├── .env.example
│   └── src/
│       ├── app.ts
│       ├── server.ts
│       ├── config/
│       │   └── db.ts
│       ├── models/
│       │   └── Contact.ts
│       ├── routes/
│       │   └── contacts.ts
│       ├── controllers/
│       │   └── contacts.ts
│       ├── validation/
│       │   └── contact.ts
│       └── middleware/
│           └── errorHandler.ts
└── docs/
    └── superpowers/
        ├── specs/
        └── plans/
```

## Contact Data Model

A contact contains:

```ts
interface Contact {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  company?: string;
  category: "personal" | "work" | "other";
  notes?: string;
  createdAt: string;
  updatedAt: string;
}
```

Validation rules:

- `firstName`: required, trimmed, 1-50 characters.
- `lastName`: required, trimmed, 1-50 characters.
- `email`: required, valid email format, stored lowercase.
- `phone`: required, trimmed, 3-30 characters.
- `company`: optional, trimmed, maximum 100 characters.
- `category`: one of `personal`, `work`, or `other`; defaults to `personal`.
- `notes`: optional, trimmed, maximum 500 characters.

The project will not enforce globally unique emails because different contacts may legitimately share an organizational or household address.

## REST API

Base path: `/api/contacts`

### `GET /api/contacts`

Returns contacts sorted by most recently updated first.

Optional query parameters:

- `search`: case-insensitive search across first name, last name, email, phone, and company.
- `category`: `personal`, `work`, or `other`.

Response:

```json
{
  "data": [],
  "count": 0
}
```

### `GET /api/contacts/:id`

Returns one contact or HTTP 404.

### `POST /api/contacts`

Validates the request body, creates a contact, and returns HTTP 201.

### `PUT /api/contacts/:id`

Validates the complete editable contact payload and returns the updated contact. Unknown IDs return HTTP 404.

### `DELETE /api/contacts/:id`

Deletes the contact and returns HTTP 204. Unknown IDs return HTTP 404.

## API Error Contract

Errors use a consistent JSON shape:

```json
{
  "error": {
    "message": "Human-readable message",
    "details": []
  }
}
```

Expected status codes:

- 400: invalid payload, invalid query, or malformed MongoDB ID.
- 404: contact not found.
- 500: unexpected server/database failure.

Stack traces and database credentials are never returned to clients.

## Frontend Design

The main page uses a compact contact-management dashboard layout:

- Header with project title and `Add Contact` button.
- Search field and category filter above the contact list.
- Responsive contact cards showing name, email, phone, company, and category.
- Edit and delete actions on each contact.
- Create/edit form displayed as a focused panel or modal.
- Explicit delete confirmation.

The UI must remain usable on desktop and mobile widths.

### Interaction Rules

- Search and category filters update the backend query rather than filtering stale local data only.
- Form validation shows field-level errors before or after server submission as appropriate.
- Submitting a mutation disables the relevant submit/action control to prevent duplicate requests.
- Successful create/update/delete operations refresh the displayed contact collection.
- An empty database displays a clear `No contacts yet` state.
- A search/filter with no matches displays a distinct `No matching contacts` state.
- Network/API failures display a visible retry-friendly message; failures are not silently swallowed.

## Data Flow

```text
React UI
  |
  v
Typed Axios client
  |
  v
Express REST routes
  |
  v
Zod validation
  |
  v
Controller/service logic
  |
  v
Mongoose model
  |
  v
MongoDB
```

The frontend consumes only the documented REST contract. Database-specific behavior remains inside the backend.

## Testing Strategy

### Backend

Automated tests cover:

- Contact validation.
- Creating a valid contact.
- Rejecting invalid contact data.
- Listing contacts.
- Searching contacts.
- Category filtering.
- Updating a contact.
- Deleting a contact.
- 404 handling.
- Malformed ID handling.

Tests should avoid dependence on a developer's real database. Use an isolated test database or an in-memory MongoDB-compatible approach if dependencies can be installed reliably.

### Frontend

Automated tests cover core user behavior rather than visual implementation details:

- Rendering contact data.
- Search/filter interactions.
- Form validation.
- Create/edit form submission behavior.
- Delete confirmation.
- Loading, empty, and error states.

### Build Verification

Before completion:

- Server type-check succeeds.
- Client type-check succeeds.
- Server tests pass.
- Client tests pass.
- Production client build succeeds.
- No secrets are committed.

## Documentation

The final `README.md` will include:

- Project overview.
- Screenshot section if genuine screenshots can be produced from the rebuilt app.
- Features.
- Architecture and folder structure.
- Technology stack.
- Local installation steps.
- MongoDB configuration.
- API endpoint table.
- Testing commands.
- Reconstruction disclosure.

The disclosure will state that the repository is a reconstructed and polished version of university coursework. It will not claim that every current source line is the untouched original submission.

## Non-Goals

The following are explicitly excluded from this version:

- User authentication or registration.
- Per-user contact ownership.
- JWT sessions.
- Social login.
- File/image uploads.
- Contact import/export.
- Pagination.
- Real-time updates/WebSockets.
- Deployment infrastructure.
- Third-party address-book integrations.

These can be future enhancements but are not required for the coursework reconstruction.

## Security and Privacy

- No real personal contact dataset will be committed.
- Any sample contacts will use fictional data.
- MongoDB connection strings stay in environment variables.
- CORS is restricted to the configured frontend origin in development/production configuration rather than using unrestricted origins by default.
- Express JSON request size uses a reasonable limit.
- User-provided data is validated server-side before persistence.

## Success Criteria

The project is complete when:

- The full contact CRUD flow works through React, Express, Mongoose, and MongoDB.
- Search and category filtering work through the API.
- Validation and API errors are handled consistently.
- The application is responsive and recruiter-presentable.
- Core frontend/backend tests pass.
- The production frontend build succeeds.
- Setup instructions are reproducible.
- The README accurately describes the reconstructed university project without overstating its original scope or provenance.
