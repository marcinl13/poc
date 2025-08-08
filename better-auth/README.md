# Project Setup Guide

This guide outlines the steps to set up and run the project locally.

---

## 🧱 Requirements

Make sure you have the following installed:

- **Node.js**: `22.x`
- **pnpm**: `10.13.1`
- **Docker**: Latest version with Docker Compose

You can check your versions using:

```bash
node -v   # should output v22.x.x
pnpm -v   # should output 10.13.1
```

## 🚀 Project Setup

### 1. Run Redis Instance

Start the Postgress service using Docker Compose:

```bash
docker compose up -d
```

### 2. Install Dependencies

Install all project dependencies using pnpm:

```bash
pnpm install
```

### 3. Sync with database

Compile the shared package:

```bash
npx prisma db pull
---or---
npx prisma migrate
---or---
npx prisma db push
```

### 4. Run Next.js App

Start the Next.js frontend in development mode:

```bash
pnpm run app:dev
```
