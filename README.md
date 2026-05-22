# 🛒 Next Basket Shop

> Your one-stop destination for quality products, great deals, and a seamless shopping experience.

![Next.js](https://img.shields.io/badge/Next.js-16-black?style=flat-square&logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?style=flat-square&logo=typescript)
![MongoDB](https://img.shields.io/badge/MongoDB-6-green?style=flat-square&logo=mongodb)
![Redis](https://img.shields.io/badge/Redis-7-red?style=flat-square&logo=redis)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-4-38bdf8?style=flat-square&logo=tailwindcss)
![License](https://img.shields.io/badge/License-MIT-yellow?style=flat-square)

---

## ⚡ Tech Stack

| Technology | Role | Description |
|---|---|---|
| **Next.js 16** | Framework | App Router, RSC, SSR, API routes |
| **TypeScript 5** | Language | Type-safe JavaScript across the entire codebase |
| **React 19** | UI | Component rendering with concurrent mode |
| **MongoDB + Mongoose** | Database | Flexible document storage for products & users |
| **Redis (ioredis)** | Cache | In-memory caching for fast data retrieval |
| **Better-Auth** | Auth | Email/password + Google OAuth, role-based access |
| **Tailwind CSS 4** | Styling | Utility-first CSS framework |
| **shadcn/ui + Radix UI** | Components | Accessible, customisable UI primitives |
| **Cloudinary** | Media | Image upload, optimisation, and CDN delivery |
| **Inngest** | Background Jobs | Serverless workflow & event orchestration |
| **Nodemailer** | Email | SMTP transactional email via Gmail |
| **Zod** | Validation | Schema validation at API boundaries |
| **SWR + Axios** | Data Fetching | Stale-while-revalidate caching + HTTP client |
| **Vercel Analytics** | Monitoring | Real user analytics & Core Web Vitals |

---

## ✨ Features

- 🔍 Product browsing with category filtering & search
- 🔐 Auth — email/password & Google OAuth
- 🛒 Persistent shopping cart
- 👤 Protected account dashboard & order history
- 🛡️ Admin panel for product & user management
- 🖼️ Optimised images via Cloudinary CDN
- 📧 Automated email workflows (Inngest + Nodemailer)
- ⚡ Redis-backed caching
- 📱 Fully responsive — mobile, tablet & desktop
- 🔗 OpenGraph & Twitter card metadata

---

## 📁 Project Structure

```
src/
├── app/
│   ├── (main)/        # Storefront routes
│   ├── (auth)/        # Login & register pages
│   ├── (protected)/   # Account & dashboard
│   └── api/           # API route handlers
├── components/        # Shared UI components
├── lib/               # DB clients, auth config, utilities
├── models/            # Mongoose schemas
└── types/             # Global TypeScript types
```

---

## 🚀 Getting Started

### Prerequisites
- Node.js 20+
- MongoDB instance
- Redis instance
- Cloudinary account
- Google OAuth credentials

### Install & Run

```bash
git clone https://github.com/your-username/next-basket.git
cd next-basket
npm install
npm run dev
```

### Environment Variables

```env
NEXT_PUBLIC_BASE_URL=http://localhost:5000

MONGODB_URI=
REDIS_URL=

BETTER_AUTH_SECRET=
GOOGLE_CLIENT_ID=
GOOGLE_CLIENT_SECRET=

NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=
CLOUDINARY_API_KEY=
CLOUDINARY_API_SECRET=

EMAIL_USER=
EMAIL_PASS=

INNGEST_EVENT_KEY=
INNGEST_SIGNING_KEY=
```

---

## 🌐 Deployment

Optimised for **Vercel**. Connect your repo, add environment variables, and deploy.

Recommended services:
- **Database** → [MongoDB Atlas](https://www.mongodb.com/atlas)
- **Cache** → [Upstash Redis](https://upstash.com)
- **Media** → [Cloudinary](https://cloudinary.com)

---

## 📄 License

MIT
