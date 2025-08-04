# Project Setup Guide

This guide outlines the steps to set up and run the project locally.

---

## 🧱 Requirements

Make sure you have the following installed:

- **Node.js**: `22.x`
- **Pnpm**: `10.13.1`
- **Docker**: Latest version with Docker Compose

You can check your versions using:

```bash
node -v   # should output v22.x.x
pnpm -v   # should output 10.13.1
```

## 🚀 Project Setup

### 1. Run Redis Instance

Start the Redis service using Docker Compose:

```bash
docker compose up -d
```

### 2. Install Dependencies

Install all project dependencies using Pnpm:

```bash
pnpm install
```

### 3. Build Shared Package

Compile the shared package:

```bash
pnpm run app:shared:build
```

### 4. Run WebSocket Server

Start the WebSocket server in development mode:

```bash
pnpm run app:server-ws:dev
```

### 5. Run Next.js App

Start the Next.js frontend in development mode:

```bash
pnpm run app:dev
```
