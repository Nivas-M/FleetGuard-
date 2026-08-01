const supabase = require("../../Config/db");

async function getRecentChecklists(driverId) {

    const { data, error } = await supabase
        .from("pre_trip_checklists")
        .select(`
            checklist_id,
            brakes,
            headlights,
            tyres,
            fluids,
            safety_kit,
            remarks,
            submitted_at,

            vehicles(
                registration_number,
                make,
                model
            )
        `)
        .eq("driver_id", driverId)
        .order("submitted_at", { ascending: false })
        .limit(5);

    if (error) {
        throw new Error(error.message);
    }

    return data.map(item => {

        let passed = 0;

        if (item.brakes) passed++;
        if (item.headlights) passed++;
        if (item.tyres) passed++;
        if (item.fluids) passed++;
        if (item.safety_kit) passed++;

        return {

            checklistId: item.checklist_id,

            vehicle:
                `${item.vehicles.make} ${item.vehicles.model}`,

            registrationNumber:
                item.vehicles.registration_number,

            submittedAt:
                item.submitted_at,

            passed:
                `${passed}/5`,

            remarks:
                item.remarks

        };

    });

}

module.exports = {
    getRecentChecklists
};