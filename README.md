# README.md

# ValetPe — Order Dashboard App (Internship Task)

**Project goal:** A public Shopify app that shows merchants their orders from the last 60 days in a dashboard.  
Backend is Node.js + Express (JavaScript) and PostgreSQL. The app uses Shopify Admin APIs (GraphQL) to fetch order data and stores relevant order info in a local database.

---

## 🔍 Features (Implemented / Planned)
- Public Shopify app with installation + OAuth authentication.
- `/auth` endpoint to initiate Shopify OAuth flow.
- `/auth/callback` endpoint to complete OAuth and store session tokens.
- Sync merchant orders (last 60 days) via Shopify Admin GraphQL API.
- Persist orders in PostgreSQL.
- Merchant Dashboard:
  - List all orders (paginated or basic list).
- REST endpoint for frontend consumption:
  - `GET /orders` — list orders from DB.
- Admin / background job to sync and keep orders up-to-date (cron or webhook-based).

---

## 📁 Repository structure
├── backend/ # Express app (main)
│ ├── controllers/
│ ├── routes/
│ ├── services/ # Shopify API service, sync jobs
│ └── index.js
├── frontend/ # Basic React frontend (optional)
├── migrations/ # DB migrations / schema SQL
├── .env.example
├── .gitignore
└── README.md


---

## 🧰 Tech stack
- Node.js (Express)
- PostgreSQL
- Shopify Admin GraphQL API (for orders)
- Frontend: React (basic) — connects to backend endpoints

---

## 🛠 Database schema (Postgres)

Run the SQL in `migrations/` or use your favourite migration tool.

```sql
-- orders table
CREATE TABLE IF NOT EXISTS orders (
  id SERIAL PRIMARY KEY,
  shop VARCHAR(255) NOT NULL,
  orderId VARCHAR(100) NOT NULL,
  status VARCHAR(50),
  total_amount NUMERIC,
  createdAt TIMESTAMP NOT NULL,
  raw_payload JSONB,          -- optional: store GraphQL/REST payload
  UNIQUE (shop, orderId)
);




