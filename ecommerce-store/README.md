# Shoply — Full Stack E-Commerce Store

A full-stack e-commerce web app built with **Vue 3 + Pinia + Tailwind CSS** on the frontend
and **Node.js + Express** on the backend, with JWT authentication and a lightweight JSON
file database (no external database server needed — perfect for running locally or for a
portfolio project).

# Demo Link — E- Commerce Store

🔗 **Live site:** [frontend-blue-iota-95.vercel.app](https://frontend-blue-iota-95.vercel.app)
A full-stack e-commerce web app built with **Vue 3 + Pinia + Tailwind CSS** on the frontend

## Features

- 🛍️ Product catalog with search, category filters, and price sorting
- 🛒 Persistent shopping cart (saved in localStorage)
- 🔐 User authentication (register/login) with JWT tokens, passwords hashed with bcrypt
- 💳 Checkout flow that creates real orders and reduces product stock
- 📦 Order history for logged-in customers
- 🛠️ Admin dashboard: full CRUD on products, order list with revenue stats and status updates
- 📱 Fully responsive UI (Tailwind CSS)
- 🔒 Protected routes (checkout/orders require login, admin panel requires admin role)

> The first account you register with automatically becomes the **admin** account — useful
> for testing the admin dashboard right away.

## Tech Stack

| Layer    | Technology                                      |
|----------|--------------------------------------------------|
| Frontend | Vue 3 (Composition API), Vite, Pinia, Vue Router, Tailwind CSS, Axios |
| Backend  | Node.js, Express, JWT, bcryptjs, lowdb (JSON file storage) |

## Project Structure

```
ecommerce-store/
├── backend/
│   ├── routes/         # auth, products, orders routes
│   ├── middleware/      # JWT auth middleware
│   ├── db.js            # lowdb setup + seed data
│   ├── server.js         # Express app entry point
│   └── data.json         # auto-created on first run (your local database)
└── frontend/
    ├── src/
    │   ├── views/         # page components
    │   ├── components/    # Navbar, ProductCard
    │   ├── stores/         # Pinia stores (auth, cart)
    │   ├── router/          # Vue Router config
    │   └── api/axios.js      # pre-configured axios instance
    └── index.html
```

---

## Running It Locally

You need **Node.js 18+** installed. Check with `node -v`. Get it from https://nodejs.org if you don't have it.

### 1. Backend setup

```bash
cd ecommerce-store/backend
npm install
cp .env.example .env
npm start
```

The API will run at **http://localhost:5000**. You'll see `Server running on http://localhost:5000`.
The first time it runs, it seeds 12 demo products into `data.json` automatically.

### 2. Frontend setup

Open a **second terminal**:

```bash
cd ecommerce-store/frontend
npm install
npm run dev
```

The app will run at **http://localhost:5173**. The Vite dev server is already configured to
proxy `/api` requests to your backend on port 5000, so nothing else to set up.

### 3. Try it out

1. Open http://localhost:5173
2. Click **Sign up** and create an account — this first account becomes admin
3. Browse products, add to cart, and check out
4. Visit **/admin** to add/edit/delete products and manage orders

### Building for production

```bash
cd frontend
npm run build
```

This outputs static files to `frontend/dist`, which you can deploy to any static host
(Vercel, Netlify, GitHub Pages). The backend can be deployed separately to Render, Railway,
or any Node host — just set the `JWT_SECRET` and `PORT` environment variables there, and
update the frontend's API base URL (in `src/api/axios.js`) to point at your deployed backend.

---

## Adding This Project to GitHub

1. **Create a new repository** on GitHub (e.g. `shoply-ecommerce`) — don't initialize it with a README, since you already have one.

2. Open a terminal in the `ecommerce-store` folder and run:

```bash
cd ecommerce-store
git init
git add .
git commit -m "Initial commit: full-stack e-commerce app"
git branch -M main
git remote add origin https://github.com/YOUR-USERNAME/shoply-ecommerce.git
git push -u origin main
```

3. Add a `.gitignore` (already included in this project) so `node_modules` and your local
   `data.json` database don't get committed.

4. On your GitHub repo page, add a good description and topics like `vue3`, `express`,
   `fullstack`, `ecommerce`, `pinia`, `tailwindcss` — recruiters and hiring managers often
   browse by topic tags.

5. **Pin this repo** on your GitHub profile, and link it in your CV/portfolio under the
   Projects section, replacing or alongside your existing "E-Commerce Store" entry.

### Suggested CV project description

> **Shoply — Full Stack E-Commerce Platform** | Vue 3, Pinia, Tailwind CSS, Node.js, Express, JWT
> Built a complete e-commerce application with product catalog, cart, secure checkout, and
> order management. Implemented JWT-based authentication, a role-based admin dashboard with
> full CRUD operations, and a REST API consumed by a responsive Vue 3 frontend.

---

## Ideas for Extending This Project

- Add product reviews & ratings
- Add pagination or infinite scroll for the product grid
- Integrate a real payment gateway (Stripe test mode) at checkout
- Add product image upload instead of URL input
- Swap lowdb for MongoDB or PostgreSQL for a "real" database on your resume
- Add email notifications on order placement (e.g. with Nodemailer)
- Write unit tests for the API routes (Jest/Supertest) and components (Vitest)

Good luck with the job hunt! 🚀
