# FleetGuard - Fleet Management System

FleetGuard is a comprehensive enterprise fleet management platform designed to streamline vehicle tracking, driver assignments, service and maintenance management, and role-based analytics for operations teams.

---

## Key Features

- **Role-Based Authentication & Authorization**
  - **Admin**: System-wide user & configuration management.
  - **Fleet Manager**: Real-time vehicle monitoring, driver assignment, and fleet performance analytics.
  - **Driver**: Assignment viewing, status reporting, and logs.
  - **Service Center / Mechanic**: Vehicle repair requests, maintenance scheduling, and service logs.

- **Vehicle & Asset Management**
  - Track vehicle details, status, registration, and health parameters.
  - Manage assignment status (Available, Assigned, Under Maintenance).

- **Driver & Vehicle Assignments**
  - Seamlessly assign and unassign drivers to fleet vehicles.
  - Track active shifts and assignment history.

- **Maintenance & Repair Logging**
  - Service requests created by drivers or fleet managers.
  - Real-time status tracking for mechanic workshops.

- **Dashboard & Analytics**
  - Visual summary of fleet stats, active vehicles, drivers, and service tickets.

---

## Technology Stack

### **Frontend**
- **Framework:** [Next.js 16](https://nextjs.org/) (App Router)
- **Library:** React 19, TypeScript
- **Styling:** Tailwind CSS 4
- **HTTP Client:** Axios

### **Backend**
- **Runtime:** Node.js
- **Framework:** Express.js 5
- **Database:** PostgreSQL / Supabase
- **Authentication:** JWT (JSON Web Tokens) & Supabase Auth
- **Real-time:** WebSockets (`ws`)

---

## Repository Structure

```text
FleetGuard/
├── Backend/                    # Express.js REST API Server
│   ├── src/
│   │   ├── Config/             # DB & Service Configurations
│   │   ├── Controllers/        # Request Handlers
│   │   ├── Middleware/         # Auth & Validation Middlewares
│   │   ├── Modules/            # Feature-specific Business Logic (Vehicles, Dashboard, Assignments)
│   │   ├── Routes/             # API Endpoint Routing
│   │   ├── services/           # External & Core Services
│   │   ├── app.js              # Express App setup
│   │   └── server.js           # Server startup entry point
│   ├── .env                    # Environment variables
│   └── package.json
│
└── Frontend/
    └── frontend/               # Next.js Frontend Web Application
        ├── app/                # Next.js App Router Pages & Components
        │   ├── admin/          # Admin Portal
        │   ├── fleetmanager/   # Fleet Manager Dashboard
        │   ├── driver/         # Driver Portal
        │   ├── servicecenter/  # Service Center / Mechanic Dashboard
        │   ├── login/          # User Login
        │   └── signup/         # Account Registration
        ├── lib/                # Shared utilities & API client setup
        └── package.json
```

---

## Getting Started

### Prerequisites

Ensure you have the following installed on your local machine:
- **Node.js** (v18.x or higher)
- **npm** (v9.x or higher)
- **PostgreSQL** database instance or a **Supabase** project

---

### Setup Instructions

#### 1. Clone the Repository
```bash
git clone https://github.com/Nivas-M/FleetGuard-.git
cd FleetGuard-
```

#### 2. Backend Setup
Navigate to the `Backend` directory and install dependencies:
```bash
cd Backend
npm install
```

Create a `.env` file in the `Backend` root folder (or update existing):
```env
PORT=5000
SUPABASE_URL=https://<your-supabase-project>.supabase.co
SUPABASE_SERVICE_ROLE_KEY=<your-service-role-key>
SUPABASE_PUBLISHABLE_KEY=<your-publishable-key>
SUPABASE_SECRET_KEY=<your-secret-key>

DB_HOST=<your-db-host>
DB_PORT=5432
DB_NAME=postgres
DB_USER=postgres
DB_PASSWORD=<your-db-password>

DATABASE_URL=postgresql://postgres:<your-db-password>@<your-db-host>:5432/postgres
```

Start the backend server in development mode:
```bash
npm run dev
```
The API server runs by default on `http://localhost:5000` (or configured port).

---

#### 3. Frontend Setup
Open a new terminal, navigate to `Frontend/frontend`, and install dependencies:
```bash
cd Frontend/frontend
npm install
```

Start the Next.js development server:
```bash
npm run dev
```
The frontend application will run on `http://localhost:5000` (or specified port).

---

## API Route Overview

| Module | Endpoint Base | Description |
| :--- | :--- | :--- |
| **Health Check** | `GET /health` | Backend status verification |
| **Auth** | `/api/auth` | User registration & authentication |
| **Admin** | `/api/admin` | System user administration |
| **Fleet Manager** | `/api/fleet-manager` | Fleet oversight & operations |
| **Dashboard** | `/fleet-manager/dashboard` | Fleet analytics & reporting |
| **Driver** | `/api/driver` | Driver profile & task routes |
| **Mechanic** | `/api/mechanic` | Workshop & maintenance management |
| **Vehicles** | `/vehicles` | Vehicle CRUD operations |
| **Assignments** | `/assignments` | Driver-Vehicle assignment management |

---

## Available Scripts

### **Backend Scripts**
- `npm run dev`: Runs the backend using `nodemon` with auto-reload.
- `npm start`: Runs the production server using `node src/server.js`.

### **Frontend Scripts**
- `npm run dev`: Starts Next.js development server.
- `npm run build`: Builds the production application.
- `npm run start`: Starts Next.js production server.
- `npm run lint`: Runs ESLint for code formatting checks.

---

## Security & Best Practices

- Never commit sensitive `.env` files or database credentials to public source control.
- Ensure JWT keys and database passwords are kept secure in production deployments.
