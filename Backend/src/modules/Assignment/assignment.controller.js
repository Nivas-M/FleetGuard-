const assignmentService = require("./assignment.service");
const { success, error } = require("../../Utils/apiResponse");

const createAssignment = async (body, managerId) => {
  const {
    vehicleId,
    driverId,
    startTime,
    override = false,
    reason = "",
  } = body;

  // ---------------- Vehicle ----------------

  const { data: vehicle } = await supabase
    .from("vehicles")
    .select("*")
    .eq("vehicle_id", vehicleId)
    .single();

  if (!vehicle) throw new Error("Vehicle not found.");

  if (vehicle.status !== "Active") throw new Error("Vehicle is not active.");

  // ---------------- Driver ----------------

  const { data: driver } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", driverId)
    .eq("role", "Driver")
    .single();

  if (!driver) throw new Error("Driver not found.");

  // ---------------- Duplicate Vehicle ----------------

  const { data: activeVehicle } = await supabase
    .from("vehicle_assignments")
    .select("assignment_id")
    .eq("vehicle_id", vehicleId)
    .eq("status", "Assigned")
    .maybeSingle();

  if (activeVehicle) throw new Error("Vehicle is already assigned.");

  // ---------------- Duplicate Driver ----------------

  const { data: activeDriver } = await supabase
    .from("vehicle_assignments")
    .select("assignment_id")
    .eq("driver_id", driverId)
    .eq("status", "Assigned")
    .maybeSingle();

  if (activeDriver) throw new Error("Driver already has an active assignment.");

  // ---------------- Compliance ----------------

  const today = new Date().toISOString().split("T")[0];

  const { data: expiredDocs } = await supabase
    .from("compliance_documents")
    .select("document_type,expiry_date")
    .eq("vehicle_id", vehicleId)
    .lt("expiry_date", today);

  const hasExpiredDocuments = expiredDocs && expiredDocs.length > 0;

  if (hasExpiredDocuments && !override) {
    throw new Error(
      "Vehicle has expired compliance documents. Manager override required.",
    );
  }

  if (hasExpiredDocuments && override && !reason) {
    throw new Error("Override reason is required.");
  }

  // ---------------- Create Assignment ----------------

  const { data: assignment, error } = await supabase
    .from("vehicle_assignments")
    .insert({
      vehicle_id: vehicleId,

      driver_id: driverId,

      assigned_by: managerId,

      start_time: startTime,

      status: "Assigned",

      override_used: hasExpiredDocuments,
    })
    .select()
    .single();

  if (error) throw new Error(error.message);

  // ---------------- Override Log ----------------

  if (hasExpiredDocuments) {
    const { error: logError } = await supabase.from("override_logs").insert({
      assignment_id: assignment.assignment_id,

      approved_by: managerId,

      reason,
    });

    if (logError) throw new Error(logError.message);
  }

  return assignment;
};

const getAssignments = async (req, res) => {
  try {
    const assignments = await assignmentService.getAssignments(req.query);

    return success(res, "Assignments fetched successfully.", assignments);
  } catch (err) {
    return error(res, err.message);
  }
};

const getAssignmentById = async (req, res) => {
  try {
    const assignment = await assignmentService.getAssignmentById(req.params.id);

    return success(res, "Assignment fetched successfully.", assignment);
  } catch (err) {
    return error(res, err.message, 404);
  }
};

const getActiveAssignments = async (req, res) => {
  try {
    const assignments = await assignmentService.getActiveAssignments();

    return success(res, "Active assignments fetched.", assignments);
  } catch (err) {
    return error(res, err.message);
  }
};
const completeAssignment = async (req, res) => {
  try {
    const assignment = await assignmentService.completeAssignment(
      req.params.id,
    );

    return success(res, "Assignment completed successfully.", assignment);
  } catch (err) {
    return error(res, err.message);
  }
};

const cancelAssignment = async (req, res) => {
  try {
    const assignment = await assignmentService.cancelAssignment(req.params.id);

    return success(res, "Assignment cancelled successfully.", assignment);
  } catch (err) {
    return error(res, err.message);
  }
};


module.exports = {
  createAssignment,

  getAssignments,

  getAssignmentById,

  getActiveAssignments,

  completeAssignment,

  cancelAssignment,

 
};
