const express = require("express");
const cors = require("cors");

// Auth
const authRoutes = require("./Routes/authRoutes");

// Role Routes
const adminRoutes = require("./Routes/adminRoutes");
const fleetManagerRoutes = require("./Routes/fleetManagerRoutes");
//const driverAuthRoutes = require("./Routes/driverRoutes");

// Feature Modules
const vehicleRoutes = require("./Modules/vehicles/vehicle.routes");
const dashboardRoutes = require("./Modules/Dashboard/dashboard.routes");
const driverModuleRoutes = require("./Modules/Driver/driver.routes");
const assignmentRoutes = require("./Modules/Assignment/assignment.routes");
const mechanicRoutes =require("./Routes/mechanicRoutes");

const app = express();

app.use(cors());
app.use(express.json());

app.get("/health", (req, res) =>
  res.status(200).json({ status: "ok" })
);

// Authentication
app.use("/api/auth", authRoutes);

// Role Dashboards
app.use("/api/admin", adminRoutes);
app.use("/api/fleet-manager", fleetManagerRoutes);
//app.use("/api/driver", driverAuthRoutes);

// Feature APIs
app.use("/vehicles", vehicleRoutes);
app.use("/fleet-manager/dashboard", dashboardRoutes);
app.use("/drivers", driverModuleRoutes);
app.use("/assignments", assignmentRoutes);

app.use(
    "/api/mechanic",
    mechanicRoutes
);


app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: "Route not found.",
  });
});
module.exports = app;