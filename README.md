# Dojo Blog

Single-page React application for browsing, creating, and reading blog posts. The project demonstrates client-side routing, reusable data-fetching hooks, and integration with a lightweight JSON API.

## Table of Contents
- [Overview](#overview)
- [Key Features](#key-features)
- [Architecture](#architecture)
- [Project Structure](#project-structure)
- [Prerequisites](#prerequisites)
- [Getting Started](#getting-started)
- [API & Data](#api--data)
- [Available Scripts](#available-scripts)
- [Configuration](#configuration)
- [Testing & Quality](#testing--quality)
- [Next Ideas](#next-ideas)

## Overview
The app renders a blog feed, lets readers drill into individual articles, and provides a form for authors to publish new content. Data access is abstracted behind a custom `useFetch` hook so network status, loading indicators, and errors are handled uniformly across views.

## Key Features
- **Dynamic blog listing** – Home page pulls posts from a configurable API and displays them with author attribution.
- **Detail pages** – Client-side routing (`react-router-dom@5`) drives pretty URLs like `/blogs/:id`.
- **Authoring workflow** – A controlled form submits new posts to the API and redirects back to the feed when complete.
- **Reusable data hook** – `useFetch` wraps `fetch` with cancellation, loading state, and error capture.
- **Environment-driven endpoints** – API base URL is sourced from `REACT_APP_API_URL`, making it straightforward to point the UI at staging or production services.
- **Sample dataset** – `data/db.json` provides seed content for local development with `json-server`.

## Architecture
- **Routing shell (`App.js`)** – Wraps the app in a router, renders `Navbar`, and routes to `Home`, `Create`, and `BlogDetails`.
- **Navigation (`Navbar.js`)** – Sticky header with links for the landing page and authoring view.
- **Home (`Home.js`)** – Invokes `useFetch(urlJobs)` to load the blog collection and renders it with `BlogList`.
- **Blog cards (`BlogList.js`)** – Stateless list component that links each entry to its detail route.
- **Blog detail (`BlogDetails.js`)** – Fetches a single post (by ID) and reveals full content with author attribution.
- **Create form (`Create.js`)** – Controlled inputs, optimistic UI state, and redirect via `useHistory` when a post is persisted.
- **Endpoints (`endpoints.js`)** – Provides a single source for list API URLs derived from environment variables.
- **Custom hook (`useFetch.js`)** – Encapsulates data fetching, abort handling, and shared state shape (`{ data, isPending, error }`).

## Project Structure
```
react-blog/
├── data/db.json                # Seed data for json-server
├── public/                     # CRA static assets
└── src/
    ├── App.js                  # Router + layout
    ├── BlogDetails.js          # Single post view
    ├── BlogList.js             # List rendering
    ├── Create.js               # Authoring form
    ├── Home.js                 # Landing page
    ├── Navbar.js               # Top navigation
    ├── endpoints.js            # API URL definitions
    ├── useFetch.js             # Custom data hook
    └── index.(js|css)          # CRA bootstrap & global styles
```

## Prerequisites
- Node.js 16+ (React 18 compatible) and npm 8+.
- Optional: `json-server` (installed globally or run via `npx`) for a local mock API.

## Getting Started
1. Install dependencies:
   ```bash
   npm install
   ```
2. Create a `.env` file in the project root (see [Configuration](#configuration)).
3. (Optional) Start the mock API with `json-server` (see [API & Data](#api--data)).
4. Launch the React app:
   ```bash
   npm start
   ```
   The app opens at `http://localhost:3000`.

## API & Data
- **Local mock server**: to use the bundled dataset, run:
  ```bash
  npx json-server --watch data/db.json --port 8000
  ```
  This exposes REST endpoints such as `GET http://localhost:8000/blogs` and `POST http://localhost:8000/blogs`.
- **Production/staging API**: set `REACT_APP_API_URL` to your service root. The home page currently calls `${REACT_APP_API_URL}/api/joblistings`. Align your backend (or adjust `src/endpoints.js`) so it returns an array of blog objects shaped like:
  ```json
  { "id": 1, "title": "My First Blog", "author": "mario", "body": "..." }
  ```
- **Mixing endpoints**: `BlogDetails` and `Create` target `http://localhost:8000/blogs`. When pointing the app to a remote API, update those `fetch` calls (or proxy them) to keep endpoints consistent.

## Available Scripts
- `npm start` – run the CRA development server.
- `npm test` – execute Jest + React Testing Library in watch mode (currently includes the default CRA smoke test).
- `npm run build` – generate a production build in `build/`.
- `npm run eject` – copy CRA configuration out of the toolchain (irreversible).

## Configuration
Create `.env` with:
```
REACT_APP_API_URL=http://localhost:8000
```
When using the provided mock server, either:
- add a rewrite so `/api/joblistings` resolves to `/blogs`, or
- update `src/endpoints.js` to point to `/blogs`.

CRA will reload when `.env` values change; restart the dev server to apply updates.

## Testing & Quality
- Unit tests live alongside components (`src/App.test.js`) and run with `npm test`.
- Add further coverage by colocating additional `*.test.js` files next to your components.
- Linting uses the default CRA ESLint configuration.

## Next Ideas
- Replace direct `fetch` usage with `axios` (already a dependency) for consistent request configuration.
- Introduce optimistic UI or toast notifications after creating posts.
- Extend the mock API schema (for example, tags or categories) and surface them in the UI.
- Deploy the `json-server` dataset behind a serverless function and point `REACT_APP_API_URL` at it for hosted demos.
