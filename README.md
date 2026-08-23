# MERN Contact Management System

A recruiter-friendly full-stack contact manager built with **React + TypeScript**, **Node.js + Express**, **MongoDB/Mongoose**, and a REST API.

> **Coursework reconstruction:** This repository is a reconstructed and polished version of a university MERN contact-management assignment. The current implementation preserves the original CRUD/full-stack learning goals while improving structure, validation, testing, TypeScript coverage, documentation, and UI quality. It is not presented as an untouched copy of the original submission.

## Features

- Create, view, edit, and delete contacts
- Server-side search across name, email, phone, and company
- Category filtering: `personal`, `work`, `other`
- Zod request validation and consistent API errors
- Mongoose persistence with timestamps
- Responsive React dashboard
- Loading, empty, no-match, error, and mutation states
- Explicit delete confirmation
- Backend and frontend automated tests
- GitHub Actions CI for type-checking, tests, and builds

## Tech Stack

### Client
- React 18
- TypeScript
- Vite
- Axios
- Vitest
- React Testing Library

### Server
- Node.js 20+
- Express
- TypeScript
- MongoDB
- Mongoose
- Zod
- Supertest
- Vitest

## Architecture

```text
React UI
   |
   v
Typed Axios API client
   |
   v
Express REST API
   |
   v
Zod validation
   |
   v
Mongoose model
   |
   v
MongoDB
```

The client is intentionally presentation-focused. Search and category filtering are performed by the backend so the UI never relies on stale local-only filtering.

## Project Structure

```text
.
├── client/
│   ├── src/api/             # typed API functions
│   ├── src/components/      # form, cards, filters, dialogs
│   ├── src/pages/           # contact dashboard
│   ├── src/styles/          # responsive styling
│   └── src/types/           # client data contracts
├── server/
│   └── src/
│       ├── config/          # MongoDB connection
│       ├── controllers/     # CRUD/search/filter logic
│       ├── middleware/      # error handling
│       ├── models/          # Mongoose Contact model
│       ├── routes/          # REST endpoints
│       └── validation/      # Zod schemas
└── docs/superpowers/        # design and implementation notes
```

## Contact Model

| Field | Type | Rules |
|---|---|---|
| `firstName` | string | required, 1–50 chars |
| `lastName` | string | required, 1–50 chars |
| `email` | string | required, valid email, normalized lowercase |
| `phone` | string | required, 3–30 chars |
| `company` | string | optional, max 100 chars |
| `category` | enum | `personal`, `work`, `other` |
| `notes` | string | optional, max 500 chars |
| timestamps | date | automatic `createdAt`, `updatedAt` |

## API

Base URL: `/api`

| Method | Endpoint | Purpose |
|---|---|---|
| `GET` | `/health` | health check |
| `GET` | `/api/contacts` | list contacts |
| `GET` | `/api/contacts?search=rinkle` | search contacts |
| `GET` | `/api/contacts?category=work` | filter contacts |
| `GET` | `/api/contacts/:id` | get one contact |
| `POST` | `/api/contacts` | create contact |
| `PUT` | `/api/contacts/:id` | update contact |
| `DELETE` | `/api/contacts/:id` | delete contact |

### Error format

```json
{
  "error": {
    "message": "Human-readable message",
    "details": []
  }
}
```

## Local Setup

### 1. Clone

```bash
git clone https://github.com/megamind294/mern-contact-management-system.git
cd mern-contact-management-system
```

### 2. Start MongoDB

Use a local MongoDB instance or MongoDB Atlas.

### 3. Configure the server

```bash
cd server
cp .env.example .env
npm install
npm run dev
```

Default server environment:

```env
PORT=5000
MONGODB_URI=mongodb://127.0.0.1:27017/contact_manager
CLIENT_ORIGIN=http://localhost:5173
```

### 4. Configure the client

In another terminal:

```bash
cd client
cp .env.example .env
npm install
npm run dev
```

Default client environment:

```env
VITE_API_BASE_URL=http://localhost:5000/api
```

Open `http://localhost:5173`.

## Verification

### Server

```bash
cd server
npm run typecheck
npm test
npm run build
```

### Client

```bash
cd client
npm run typecheck
npm test
npm run build
```

GitHub Actions runs the same core verification on pull requests and changes to `main`.

## Security & Privacy Notes

- `.env` files are ignored and are never intended for source control.
- Database connection strings belong in environment variables.
- The API validates user input server-side.
- CORS is configured for the expected frontend origin rather than being globally open.
- Request JSON size is limited.
- No real personal contact dataset is committed to the repository.

## Scope

This project intentionally stays focused on the core university assignment. It does **not** add authentication, JWTs, multi-user ownership, real-time sockets, payments, image uploads, or external address-book integrations.

That narrower scope keeps the repository easy to review while clearly demonstrating full-stack CRUD architecture, validation, API integration, database persistence, TypeScript, and frontend state handling.
