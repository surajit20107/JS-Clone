# Next Basket Shop

A full-featured, production-ready e-commerce platform built with a modern web stack. Next Basket delivers a seamless shopping experience — from browsing curated products to secure checkout — with speed, scalability, and developer ergonomics at its core.

---

## Tech Stack

### Next.js 16 (App Router)
Next.js is a React framework built for production. It provides file-based routing, server-side rendering, static site generation, API routes, and edge-ready middleware — all in one package. This project uses the **App Router**, which enables nested layouts, React Server Components, and co-located data fetching for fast, efficient page loads.

### TypeScript 5
TypeScript is a strongly typed superset of JavaScript that catches errors at compile time rather than runtime. It improves developer confidence, enables better IDE support, and makes large codebases easier to maintain. Every component, API handler, and utility in this project is fully typed.

### React 19
React is the UI rendering library powering this application. Version 19 introduces new hooks and concurrent rendering improvements, allowing for more responsive and performant interfaces out of the box.

### MongoDB + Mongoose
MongoDB is a document-oriented NoSQL database that stores data in flexible, JSON-like documents. It's ideal for e-commerce data with varying product attributes. **Mongoose** sits on top of MongoDB and provides schema definitions, validation, middleware, and a clean query API for Node.js.

### Redis (ioredis)
Redis is an in-memory data store used here for caching and session management. It dramatically reduces database load by serving frequently accessed data from memory — keeping page loads fast even under heavy traffic. The `ioredis` client provides a robust, Promise-based interface to Redis.

### Better-Auth
Better-Auth is a modern, full-stack authentication library. It handles email/password login, social OAuth (Google), session management with cookie caching, and role-based access control — including custom `isAdmin` and `isBanned` user flags — with minimal boilerplate.

### Tailwind CSS 4
Tailwind is a utility-first CSS framework that lets you build custom designs directly in your markup. With v4's new engine, it's faster to compile and more flexible than ever. All UI styles in this project are written with Tailwind utility classes.

### shadcn/ui + Radix UI
shadcn/ui is a collection of beautifully designed, accessible components built on top of **Radix UI** primitives. Rather than being a traditional component library, components are copied into the project and fully owned — making them easy to customise without fighting opinionated styles.

### Cloudinary
Cloudinary is a cloud-based media management platform. It handles image uploads, optimisation, transformation, and delivery via CDN — ensuring product images are always served at the right size and format for any device.

### Inngest
Inngest is a serverless background job and workflow orchestration platform. It's used here to reliably trigger asynchronous tasks (such as sending welcome emails after signup) without managing queues or workers manually.

### Nodemailer
Nodemailer is the standard Node.js library for sending emails. It's configured with Gmail SMTP to deliver transactional emails — including welcome messages and order confirmations.

### Zod
Zod is a TypeScript-first schema validation library. It validates incoming data at API boundaries — such as product form inputs and authentication payloads — providing clear, type-safe error messages when data doesn't match the expected shape.

### SWR + Axios
**SWR** (Stale-While-Revalidate) is a data-fetching library from Vercel that handles caching, revalidation, and background updates with minimal setup. **Axios** is used as the HTTP client for API requests, offering interceptors, timeout handling, and cleaner error management than the native `fetch`.

### Vercel Analytics + Speed Insights
Vercel Analytics tracks real user behaviour (page views, navigation) and Speed Insights measures Core Web Vitals — giving a clear picture of how real users experience the site in production.

---

## Project Structure

```
src/
├── app/                  # Next.js App Router — pages, layouts, API routes
│   ├── (main)/           # Public-facing storefront routes
│   ├── (auth)/           # Authentication pages (login, register)
│   ├── (protected)/      # Authenticated user routes (account, orders)
│   └── api/              # API route handlers
├── components/           # Shared UI components
├── lib/                  # Database clients, auth config, utilities
├── models/               # Mongoose schema definitions
└── types/                # Global TypeScript type declarations
```

---

## Getting Started

### Prerequisites

- Node.js 20+
- MongoDB instance (local or Atlas)
- Redis instance (local or cloud)
- Cloudinary account
- Google OAuth credentials (for social login)

### Installation

```bash
# Clone the repository
git clone https://github.com/your-username/next-basket.git
cd next-basket

# Install dependencies
npm install
```

### Environment Variables

Create a `.env` file in the project root and fill in the required values:

```env
# App
NEXT_PUBLIC_BASE_URL=http://localhost:5000

# MongoDB
MONGODB_URI=your_mongodb_connection_string

# Redis
REDIS_URL=your_redis_connection_string

# Better-Auth
BETTER_AUTH_SECRET=your_auth_secret
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret

# Cloudinary
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret

# Email (Nodemailer / Gmail)
EMAIL_USER=your_gmail_address
EMAIL_PASS=your_gmail_app_password

# Inngest
INNGEST_EVENT_KEY=your_inngest_event_key
INNGEST_SIGNING_KEY=your_inngest_signing_key
```

### Running Locally

```bash
npm run dev
```

Open [http://localhost:5000](http://localhost:5000) in your browser.

---

## Key Features

- Product browsing with category filtering and search
- User authentication — email/password and Google OAuth
- Shopping cart with persistent state
- Protected account dashboard and order history
- Admin panel for product and user management
- Optimised image delivery via Cloudinary CDN
- Background email workflows powered by Inngest
- Redis-backed caching for fast data retrieval
- Fully responsive design across mobile, tablet, and desktop
- OpenGraph and Twitter card metadata for rich social sharing

---

## Deployment

This project is optimised for deployment on **Vercel**. Connect your repository, set the environment variables in the Vercel dashboard, and deploy with a single click.

For the database and cache layer, services like **MongoDB Atlas** and **Redis Cloud (Upstash)** are recommended for a fully managed, serverless-compatible setup.

---

## License

MIT
