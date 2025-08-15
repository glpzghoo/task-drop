# TaskDrop Web App (Next.js Client)

> **"Got 30 minutes? Help someone get something done."**

**TaskDrop** is a platform where everyday people in Mongolia offer their free time to help others with quick, small tasks. It connects busy individuals who need help with minor errands to people nearby (or online) who have a few moments to assist.

## Features

- **Quick Task Listings**: Post small tasks with ease.
- **Real-Time Availability**: “Available Now” toggle for instant matching.
- **Local & Remote Filters**: Find tasks nearby or remote.
- **Built-in Time Tracking & Payments**: Simple, secure payments.
- **Simple Trust System**: Ratings and short reviews.

## About This Repository

This repository contains the **front-end web application** for TaskDrop, built with Next.js. It communicates with the TaskDrop GraphQL API server.

> For the backend, see the **[TaskDrop Server](https://github.com/glpzghoo/server-taskdrop)**.

## Tech Stack

- Next.js (React & TypeScript)
- Apollo Client
- Tailwind CSS
- Radix UI
- Supabase Storage
- GraphQL Code Generator
- Zod Validation

## Getting Started

### Prerequisites

- Node.js 18+
- Running TaskDrop GraphQL API server
- (Optional) Supabase account for file storage

### Installation

```bash
git clone https://github.com/glpzghoo/task-drop.git
cd task-drop
npm install
```

### Environment Variables

Create `.env.local`:

```
NEXT_PUBLIC_GRAPHQL_URL=http://localhost:4000/graphql
SUPABASE_URL=your_supabase_url
SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key
```

### Run Development Server

```bash
npm run dev
```

Visit `http://localhost:3000` in your browser.

## Contributing

Pull requests are welcome. For major changes, please open an issue first to discuss your ideas.

## License

ISC License
