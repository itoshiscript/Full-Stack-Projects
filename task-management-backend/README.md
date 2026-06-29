# Task Management Backend

A robust backend for a Task Management application built with Node.js, Express, TypeScript, and Prisma.

## 🚀 Features

- **Authentication:** Secure JWT-based authentication (via Cookies and Headers).
- **Task Management:** Full CRUD operations for tasks.
- **Ownership Protection:** Users can only access and modify their own tasks.
- **Category System:** Organise tasks by categories.
- **Validation:** Type-safe request validation using Zod.
- **Database:** Prisma ORM with PostgreSQL.

## 🛠️ Tech Stack

- **Framework:** Express.js
- **Language:** TypeScript
- **Database:** PostgreSQL
- **ORM:** Prisma
- **Validation:** Zod
- **Auth:** JSON Web Tokens (JWT) & BcryptJS

---

## 🏃 Getting Started

Follow these steps to get your development environment set up.

### 1. Prerequisites

- **Node.js** (v18 or higher recommended)
- **Docker** (Optional, for running PostgreSQL easily)

### 2. Installation

Clone the repository and install dependencies:

```bash
npm install
```

### 3. Environment Setup

Create a `.env` file in the root directory and add the following variables:

```env
PORT=3000
DATABASE_URL="postgresql://postgres:secret@localhost:5432/tmb?schema=public"
JWT_SECRET="your_very_secret_key"
NODE_ENV="development"
```

*Note: If you use the provided Docker setup, the `DATABASE_URL` above matches the default configuration.*

### 4. Database Setup

#### Start PostgreSQL (using Docker)
If you have Docker installed, you can start the database using:

```bash
docker-compose up -d
```

#### Run Migrations
Generate the Prisma client and push the schema to the database:

```bash
npx prisma migrate dev --name init
```

### 5. Running the Application

#### Development Mode (with hot-reload)
```bash
npm run dev
```

#### Production Mode
```bash
npm start
```

The server will be running at `http://localhost:3000`.

---

## 🛰️ API Endpoints

### Auth
- `POST /auth/register` - Register a new user
- `POST /auth/login` - Login user

### Tasks
- `GET /tasks` - Get all tasks for the authenticated user
- `POST /tasks` - Create a new task
- `GET /tasks/:id` - Get a specific task
- `PUT /tasks/update/:id` - Update a task
- `DELETE /tasks/:id` - Delete a task

### Users
- `GET /users` - Get authenticated user profile

---

## 📂 Project Structure

- `src/controllers`: Request handlers
- `src/models`: Database logic using Prisma
- `src/routes`: API route definitions
- `src/middlewares`: Auth and Validation middlewares
- `src/validators`: Zod schemas for request validation
- `prisma/`: Database schema definitions
