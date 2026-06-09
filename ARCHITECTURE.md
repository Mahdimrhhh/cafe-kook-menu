# Cafe Kook — Frontend Architecture

This document describes the frontend architecture prepared for future backend, database, and admin panel integration.

## Overview

The application follows a **layered architecture** that separates data, business logic, and UI rendering:

```
┌─────────────────────────────────────────┐
│              index.html                │
│         (Static shell + layout)         │
└─────────────────┬───────────────────────┘
                  │
┌─────────────────▼───────────────────────┐
│              js/app.js                  │
│     (Orchestrator — event wiring)       │
└───┬─────────┬─────────┬─────────┬───────┘
    │         │         │         │
    ▼         ▼         ▼         ▼
┌───────┐ ┌───────┐ ┌───────┐ ┌──────────┐
│  UI   │ │ State │ │Services│ │Notifications│
│ Layer │ │       │ │       │ │           │
└───┬───┘ └───┬───┘ └───┬───┘ └───────────┘
    │         │         │
    │         │         ▼
    │         │   ┌───────────┐
    │         │   │ apiClient │ ──► REST API (future)
    │         │   └─────┬─────┘
    │         │         │
    │         │         ▼ (mock mode)
    │         │   ┌───────────┐
    │         └──►│ Mock Data │
    │             └───────────┘
    ▼
 HTML strings injected into DOM
```

## Directory Structure

```
js/
├── app.js                    # Main entry — bootstraps services & UI
├── models.js                 # JSDoc type definitions (API contract)
├── state/
│   └── appState.js           # Centralized UI + data state
├── data/
│   ├── mockProducts.js       # Products + categories seed data
│   ├── mockKnowledge.js      # Coffee knowledge articles
│   └── mockMessages.js       # Motivational toast messages (60+)
├── services/
│   ├── apiClient.js          # REST fetch wrapper (USE_MOCK flag)
│   ├── productService.js     # Product CRUD + search
│   ├── categoryService.js    # Category CRUD
│   ├── reviewService.js      # Review CRUD + approve/reject
│   └── knowledgeService.js   # Knowledge article CRUD
├── ui/
│   ├── productRenderer.js    # Menu cards, grid, featured strip
│   ├── categoryRenderer.js   # Category slider chips
│   ├── knowledgeRenderer.js  # Coffee knowledge + slider
│   ├── reviewRenderer.js     # Review form & list
│   └── footerRenderer.js     # Premium footer
└── notifications/
    └── toastService.js       # Glassmorphism top toasts
```

## Data Models

### Product
| Field | Type | Description |
|-------|------|-------------|
| id | number | Unique identifier |
| name | string | Product name (Persian) |
| category | string | Category name |
| categoryId | number | Category FK |
| image | string | Image URL |
| description | string | Short description |
| ingredients | string | Ingredients list |
| price | number | Price in Toman |
| available | boolean | Availability flag |
| featured | boolean | Featured product flag |
| servingStyle | string | Serving details |
| notes | string | Extra notes |

### Category
| Field | Type | Description |
|-------|------|-------------|
| id | number | Unique identifier |
| name | string | Category name (Persian) |
| icon | string | Display emoji |

### Review
| Field | Type | Description |
|-------|------|-------------|
| id | number | Unique identifier |
| name | string | Display name |
| rating | number\|null | 1–5 stars |
| text | string | Review content |
| createdAt | number | Unix timestamp |
| approved | boolean | Admin approval status |

### KnowledgeArticle
| Field | Type | Description |
|-------|------|-------------|
| id | number | Unique identifier |
| title | string | Article title |
| shortDescription | string | Card summary |
| fullDescription | string | Full modal content |
| image | string | Image URL |
| category | string | Topic category |
| icon | string | Display emoji |
| fact | string | Quick fact (UI extra) |

## Service Layer

Each service exposes async methods with identical signatures for mock and REST modes.

### productService
- `getAll()` — All products
- `getById(id)` — Single product
- `getByCategory(name)` — Filter by category
- `getFeatured()` — Featured products only
- `search(query, categoryName?)` — Text search
- `create(data)` — Admin: add product
- `update(id, updates)` — Admin: edit product
- `delete(id)` — Admin: remove product
- `setFeatured(id, bool)` — Admin: toggle featured
- `setAvailable(id, bool)` — Admin: toggle availability

### categoryService
- `getAll()`, `getById(id)`, `create()`, `update()`, `delete()`

### reviewService
- `getAll(includeUnapproved?)` — Public sees approved only
- `create({ text, rating })` — Submit review
- `approve(id)` — Admin: approve
- `reject(id)` — Admin: reject
- `delete(id)` — Admin: delete

### knowledgeService
- `getAll()`, `getById(id)`, `getByCategory(cat)`, `create()`, `update()`, `delete()`

## Migrating to REST API

1. Open `js/services/apiClient.js`
2. Set `USE_MOCK: false`
3. Set `BASE_URL` to your API endpoint (e.g. `https://api.cafe-kook.ir/v1`)
4. Implement matching endpoints on the backend:

| Method | Endpoint | Service |
|--------|----------|---------|
| GET | /products | productService.getAll |
| POST | /products | productService.create |
| PATCH | /products/:id | productService.update |
| DELETE | /products/:id | productService.delete |
| GET | /categories | categoryService.getAll |
| GET | /reviews | reviewService.getAll |
| POST | /reviews | reviewService.create |
| PATCH | /reviews/:id/approve | reviewService.approve |
| PATCH | /reviews/:id/reject | reviewService.reject |
| GET | /knowledge | knowledgeService.getAll |

No UI changes required — services handle the switch internally.

## Admin Panel Integration

The architecture is admin-ready:

1. **Services** already expose full CRUD — admin UI calls the same methods
2. **appState** centralizes state — admin changes sync via `setProducts()`, etc.
3. **Renderers** are pure functions — pass new data, get HTML
4. **Exports** from `app.js` expose services for admin modules:

```javascript
import { productService, reviewService, appState } from './app.js';

// Admin: edit product
await productService.update(5, { price: 99000, featured: true });

// Admin: reject review
await reviewService.reject(reviewId);
```

## UI Patterns

- **Renderers** return HTML strings — no DOM coupling in data layer
- **app.js** handles event binding after render
- **Slider fix**: Coffee knowledge auto-slide uses `scrollBy` on the container only — never `scrollIntoView` — preventing page scroll jumps

## Legacy Files

| File | Status |
|------|--------|
| `menuData.js` | Deprecated — data moved to `js/data/mockProducts.js` |
| `app.js` (root) | Deprecated — replaced by `js/app.js` |

## Running Locally

ES modules require a local server (not `file://`):

```bash
npx serve .
# or
python -m http.server 8080
```

Then open `http://localhost:3000/fairst.html`
