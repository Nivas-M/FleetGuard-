const supabase = require("../../Config/db");

async function submitPreTripChecklist(
    driverId,
    {
        brakes,
        headlights,
        tyres,
        fluids,
        safety_kit,
        remarks
    }
) {

    // Find driver's active assignment
    const { data: assignment, error: assignmentError } = await supabase
        .from("vehicle_assignments")
        .select(`
            assignment_id,
            vehicle_id
        `)
        .eq("driver_id", driverId)
        .eq("status", "Assigned")
        .maybeSingle();

    if (assignmentError) {
        throw new Error(assignmentError.message);
    }

    if (!assignment) {
        throw new Error("No vehicle is currently assigned to this driver.");
    }

    // Insert checklist
    const { data, error } = await supabase
        .from("pre_trip_checklists")
        .insert({
            driver_id: driverId,
            vehicle_id: assignment.vehicle_id,

            brakes,
            headlights,
            tyres,
            fluids,
            safety_kit,

            remarks
        })
        .select()
        .single();

    if (error) {
        throw new Error(error.message);
    }

    // Optional: update vehicle status if checklist fails
    const allPassed =
        brakes &&
        headlights &&
        tyres &&
        fluids &&
        safety_kit;

    if (!allPassed) {

        const { error: vehicleError } = await supabase
            .from("vehicles")
            .update({
                status: "Needs Inspection"
            })
            .eq("vehicle_id", assignment.vehicle_id);

        // Ignore if your enum doesn't contain "Needs Inspection"
        if (vehicleError) {
            console.log(vehicleError.message);
        }
    }

    return {
        success: true,
        checklist: data
    };

}

module.exports = {
    submitPreTripChecklist
};