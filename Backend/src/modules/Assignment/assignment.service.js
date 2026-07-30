const supabase = require("../../Config/db");

const createAssignment = async (body, managerId) => {
  const {
    vehicleId,

    driverId,

    startTime,
  } = body;

  // Vehicle

  const { data: vehicle } = await supabase
    .from("vehicles")
    .select("*")
    .eq("vehicle_id", vehicleId)
    .single();

  if (!vehicle) throw new Error("Vehicle not found.");

  if (vehicle.status !== "Active") throw new Error("Vehicle is not active.");

  // Driver

  const { data: driver } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", driverId)
    .eq("role", "Driver")
    .single();

  if (!driver) throw new Error("Driver not found.");

  // Active Vehicle Assignment

  const { data: activeVehicle } = await supabase
    .from("vehicle_assignments")
    .select("assignment_id")
    .eq("vehicle_id", vehicleId)
    .eq("status", "Assigned")
    .maybeSingle();

  if (activeVehicle) throw new Error("Vehicle already assigned.");

  // Active Driver Assignment

  const { data: activeDriver } = await supabase
    .from("vehicle_assignments")
    .select("assignment_id")
    .eq("driver_id", driverId)
    .eq("status", "Assigned")
    .maybeSingle();

  if (activeDriver) throw new Error("Driver already has an assigned vehicle.");

  // Compliance Check

  const today = new Date().toISOString().split("T")[0];

  const { data: expiredDocs } = await supabase
    .from("compliance_documents")
    .select("*")
    .eq("vehicle_id", vehicleId)
    .lt("expiry_date", today);

  if (expiredDocs.length > 0)
    throw new Error("Vehicle has expired compliance documents.");

  // Create Assignment

  const { data, error } = await supabase
    .from("vehicle_assignments")
    .insert({
      vehicle_id: vehicleId,

      driver_id: driverId,

      assigned_by: managerId,

      start_time: startTime,

      status: "Assigned",
    })
    .select(
      `
            *,
            vehicles(
                registration_number,
                make,
                model
            ),
            profiles!vehicle_assignments_driver_id_fkey(
                name
            )
        `,
    )
    .single();

  if (error) throw new Error(error.message);

  return data;
};


const getAssignments = async (filters) => {

    let query = supabase
        .from("vehicle_assignments")
        .select(`
            *,
            vehicles(
                registration_number,
                make,
                model
            ),
            profiles!vehicle_assignments_driver_id_fkey(
                name
            )
        `);

    if (filters.status)
        query = query.eq("status", filters.status);

    if (filters.driverId)
        query = query.eq("driver_id", filters.driverId);

    if (filters.vehicleId)
        query = query.eq("vehicle_id", filters.vehicleId);

    const { data, error } =
        await query.order(
            "start_time",
            {
                ascending: false
            }
        );

    if (error)
        throw new Error(error.message);

    return data;

};


const getAssignmentById = async (id) => {

    const { data, error } = await supabase
        .from("vehicle_assignments")
        .select(`
            *,
            vehicles(*),
            profiles!vehicle_assignments_driver_id_fkey(
                name
            ),
            profiles!vehicle_assignments_assigned_by_fkey(
                name
            )
        `)
        .eq("assignment_id", id)
        .single();

    if (error)
        throw new Error("Assignment not found.");

    return data;

};


const getActiveAssignments = async () => {

    const { data, error } = await supabase
        .from("vehicle_assignments")
        .select(`
            *,
            vehicles(
                registration_number,
                make,
                model
            ),
            profiles!vehicle_assignments_driver_id_fkey(
                name
            )
        `)
        .eq("status", "Assigned");

    if (error)
        throw new Error(error.message);

    return data;

};


const completeAssignment = async (assignmentId) => {

    const { data: assignment } = await supabase
        .from("vehicle_assignments")
        .select("*")
        .eq("assignment_id", assignmentId)
        .single();

    if (!assignment)
        throw new Error("Assignment not found.");

    if (assignment.status !== "Assigned")
        throw new Error("Assignment is already closed.");

    const now = new Date().toISOString();

    const { data, error } = await supabase
        .from("vehicle_assignments")
        .update({

            status: "Completed",

            end_time: now,

            returned_at: now

        })
        .eq("assignment_id", assignmentId)
        .select()
        .single();

    if (error)
        throw new Error(error.message);

    return data;

};

const cancelAssignment = async (assignmentId) => {

    const { data: assignment } = await supabase
        .from("vehicle_assignments")
        .select("*")
        .eq("assignment_id", assignmentId)
        .single();

    if (!assignment)
        throw new Error("Assignment not found.");

    if (assignment.status !== "Assigned")
        throw new Error("Assignment is already closed.");

    const { data, error } = await supabase
        .from("vehicle_assignments")
        .update({

            status: "Cancelled",

            end_time: new Date().toISOString()

        })
        .eq("assignment_id", assignmentId)
        .select()
        .single();

    if (error)
        throw new Error(error.message);

    return data;

};


module.exports = {

    createAssignment,

    getAssignments,

    getAssignmentById,

    getActiveAssignments,

    completeAssignment,

    cancelAssignment
};