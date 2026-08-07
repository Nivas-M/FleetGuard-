const supabase = require("../../Config/db");

async function getAssignedVehicle(driverId) {

    const { data, error } = await supabase
        .from("vehicle_assignments")
        .select(`
            assignment_id,
            start_time,
            end_time,
            status,

            vehicles(
                vehicle_id,
                registration_number,
                make,
                model,
                current_mileage,
                status
            )
        `)
        .eq("driver_id", driverId)
        .eq("status", "Assigned")
        .maybeSingle();

    if (error)
        throw new Error(error.message);

    if (!data)
        return null;

    return {

        assignmentId: data.assignment_id,

        vehicleId: data.vehicles.vehicle_id,

        registrationNumber:
            data.vehicles.registration_number,

        vehicle:
            `${data.vehicles.make} ${data.vehicles.model}`,

        mileage:
            data.vehicles.current_mileage,

        vehicleStatus:
            data.vehicles.status,

        assignedOn:
            data.start_time,

        assignmentStatus:
            data.status

    };

}

module.exports = {

    getAssignedVehicle

};