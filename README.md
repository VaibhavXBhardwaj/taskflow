# Taskflow

A minimal full stack task management application. Built with Next.js 14, PostgreSQL, and deployed on Vercel.

## Stack

- **Framework** — [Next.js 14](https://nextjs.org) (App Router, TypeScript)
- **Database** — PostgreSQL via [Neon](https://neon.tech)
- **ORM** — [Prisma](https://prisma.io)
- **Auth** — Custom JWT with httpOnly session cookies
- **Styling** — [Tailwind CSS](https://tailwindcss.com)
- **Deployment** — [Vercel](https://vercel.com)
- **CI** — GitHub Actions

## Getting Started

### Prerequisites

- Node.js 20+
- Docker & Docker Compose

### Setup

```bash
# 1. Clone the repository
git clone https://github.com/YOUR_USERNAME/taskflow.git
cd taskflow

# 2. Install dependencies
npm install

# 3. Set up environment
cp .env.example .env.local
# Edit .env.local with your values

# 4. Start local database
docker compose up -d

# 5. Run migrations
npx prisma migrate dev

# 6. Start dev server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Project Structure