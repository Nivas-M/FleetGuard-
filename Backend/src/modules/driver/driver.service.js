const supabase = require("../../Config/db");

const getDrivers = async ({ search }) => {

    let query = supabase
        .from("profiles")
        .select("id,name,role")
        .eq("role", "Driver");

    if (search) {

        query = query.ilike("name", `%${search}%`);

    }

    const { data, error } = await query.order("name");

    if (error) {

        throw new Error(error.message);

    }

    return data;

};

const getDriverById = async (driverId) => {

    const { data, error } = await supabase
        .from("profiles")
        .select("id,name,role")
        .eq("id", driverId)
        .eq("role", "Driver")
        .single();

    if (error || !data) {

        throw new Error("Driver not found.");

    }

    const { data: assignment } = await supabase
        .from("vehicle_assignments")
        .select(`
            assignment_id,
            start_time,
            status,
            vehicles (
                vehicle_id,
                registration_number,
                make,
                model
            )
        `)
        .eq("driver_id", driverId)
        .eq("status", "Assigned")
        .maybeSingle();

    return {

        ...data,

        currentAssignment: assignment || null

    };

};

const getDriverAssignments = async (driverId) => {

    const { data, error } = await supabase
        .from("vehicle_assignments")
        .select(`
            assignment_id,
            start_time,
            end_time,
            returned_at,
            status,
            override_used,
            vehicles (
                vehicle_id,
                registration_number,
                make,
                model
            )
        `)
        .eq("driver_id", driverId)
        .order("start_time", {
            ascending: false
        });

    if (error) {

        throw new Error(error.message);

    }

    return data;

};

module.exports = {

    getDrivers,

    getDriverById,

    getDriverAssignments

};