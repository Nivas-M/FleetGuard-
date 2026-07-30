const express = require("express");
const cors = require("cors");

const adminRoutes = require("./Routes/adminRoutes");
const vehicleRoutes = require("./modules/vehicles/vehicle.routes");
const dashboardRoutes = require("./Modules/Dashboard/dashboard.routes");
const driverRoutes = require("./Modules/Driver/driver.routes");
const assignmentRoutes = require("./Modules/Assignment/assignment.routes");
const authRoutes = require("./Routes/authRoutes");

const app = express();

app.use(cors());
app.use(express.json());

app.get("/health", (req, res) => res.status(200).json({ status: "ok" }));

app.use("/admin", adminRoutes);
app.use("/api/admin", adminRoutes);
app.use("/vehicles", vehicleRoutes);
app.use("/fleet-manager/dashboard", dashboardRoutes);
app.use("/drivers", driverRoutes);
app.use("/assignments", assignmentRoutes);
app.use("/api/auth", authRoutes);


app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: "Route not found.",
  });
});

module.exports = app;
