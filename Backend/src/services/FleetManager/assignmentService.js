const supabase = require("../../Config/db");

/**
 * Get recently assigned vehicles
 */
async function getRecentAssignments() {
    const { data, error } = await supabase
        .from("vehicle_assignments")
        .select(`
    assignment_id,
    start_time,
    status,
    vehicles(
        registration_number,
        make,
        model
    ),
    driver:profiles!vehicle_assignments_driver_id_fkey(
        name
    )
`)
        .order("start_time", { ascending: false });

    if (error) throw new Error(error.message);

    return data.map(item => ({
        assignmentId: item.assignment_id,
        vehicle:
            `${item.vehicles.make} ${item.vehicles.model}`,
        registrationNumber:
            item.vehicles.registration_number,
        driver:
            item.driver?.name ?? "Unknown",
        assignedOn: item.start_time,
        status: item.status
    }));
}

/**
 * Drivers without active assignments
 */
async function getAvailableDrivers() {

    const { data: drivers, error } = await supabase
        .from("profiles")
        .select("id,name")
        .eq("role", "Driver");

    if (error) throw new Error(error.message);

    const { data: assigned } = await supabase
        .from("vehicle_assignments")
        .select("driver_id")
        .eq("status", "Assigned");

    const assignedIds = assigned.map(a => a.driver_id);

    return drivers.filter(driver =>
        !assignedIds.includes(driver.id)
    );
}

/**
 * Vehicles without active assignments
 */
async function getAvailableVehicles() {

    const { data: vehicles, error } = await supabase
        .from("vehicles")
        .select("*");

    if (error) throw new Error(error.message);

    const { data: assigned } = await supabase
        .from("vehicle_assignments")
        .select("vehicle_id")
        .eq("status", "Assigned");

    const assignedIds = assigned.map(a => a.vehicle_id);

    return vehicles.filter(vehicle =>
        !assignedIds.includes(vehicle.vehicle_id)
    );
}

/**
 * Assign Vehicle
 */
async function assignVehicle({
    vehicle_id,
    driver_id,
    assigned_by
}) {

    const { data: vehicle } = await supabase
        .from("vehicles")
        .select("vehicle_id")
        .eq("vehicle_id", vehicle_id)
        .maybeSingle();

    if (!vehicle)
        throw new Error("Vehicle not found.");

    const { data: driver } = await supabase
        .from("profiles")
        .select("id")
        .eq("id", driver_id)
        .maybeSingle();

    if (!driver)
        throw new Error("Driver not found.");

    const { data: activeVehicle } = await supabase
        .from("vehicle_assignments")
        .select("assignment_id")
        .eq("vehicle_id", vehicle_id)
        .eq("status", "Assigned")
        .maybeSingle();

    if (activeVehicle)
        throw new Error(
            "This vehicle is already assigned."
        );

    const { data: activeDriver } = await supabase
        .from("vehicle_assignments")
        .select("assignment_id")
        .eq("driver_id", driver_id)
        .eq("status", "Assigned")
        .maybeSingle();

    if (activeDriver)
        throw new Error(
            "This driver is already assigned."
        );

    const { data, error } = await supabase
        .from("vehicle_assignments")
        .insert({
            vehicle_id,
            driver_id,
            assigned_by,
            status: "Assigned"
        })
        .select()
        .single();

    if (error) throw new Error(error.message);

    return data;
}

module.exports = {
    getRecentAssignments,
    getAvailableDrivers,
    getAvailableVehicles,
    assignVehicle
};