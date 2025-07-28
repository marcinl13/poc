# Project Setup Guide

This guide outlines the steps to set up and run the project locally.

---

## 🧱 Requirements

Make sure you have the following installed:

- **Node.js**: `22.x`
- **Yarn**: `1.22.0`
- **Docker**: Latest version with Docker Compose

You can check your versions using:

```bash
node -v   # should output v22.x.x
yarn -v   # should output 1.22.0
```

## 🚀 Project Setup

### 1. Run Redis Instance

Start the Redis service using Docker Compose:

```bash
docker compose up -d
```

### 2. Install Dependencies

Install all project dependencies using Yarn:

```bash
yarn install
```

### 3. Build Shared Package

Compile the shared package:

```bash
yarn run app:shared:build
```

### 4. Run WebSocket Server

Start the WebSocket server in development mode:

```bash
yarn run app:server-ws:dev
```

### 5. Run Next.js App

Start the Next.js frontend in development mode:

```bash
yarn run app:dev
```
