const supabase = require("../../Config/db");
const { validateVehicle } = require("./vehicle.validation");

const createVehicle = async (vehicleData) => {

    validateVehicle(vehicleData);

    const {
        registration_number,
        make,
        model,
        year,
        current_mileage,
        status
    } = vehicleData;

    const { data: existing } = await supabase
        .from("vehicles")
        .select("vehicle_id")
        .eq("registration_number", registration_number)
        .maybeSingle();

    if (existing) {
        throw new Error("Vehicle already exists.");
    }

    const { data, error } = await supabase
        .from("vehicles")
        .insert({
            registration_number,
            make,
            model,
            year,
            current_mileage: current_mileage || 0,
            status: status || "Active"
        })
        .select()
        .single();

    if (error)
        throw new Error(error.message);

    return data;
};

const getVehicles = async ({
    page = 1,
    limit = 10,
    search,
    status
}) => {

    const from = (page - 1) * limit;
    const to = from + limit - 1;

    let query = supabase
        .from("vehicles")
        .select("*", { count: "exact" });

    if (search) {
        query = query.or(
            `registration_number.ilike.%${search}%,make.ilike.%${search}%,model.ilike.%${search}%`
        );
    }

    if (status) {
        query = query.eq("status", status);
    }

    const {
        data,
        error,
        count
    } = await query.range(from, to);

    if (error)
        throw new Error(error.message);

    return {
        vehicles: data,
        total: count,
        page,
        limit
    };

};

const getVehicleById = async (vehicleId) => {

    const {
        data,
        error
    } = await supabase
        .from("vehicles")
        .select("*")
        .eq("vehicle_id", vehicleId)
        .single();

    if (error)
        throw new Error("Vehicle not found.");

    return data;

};


const updateVehicle = async (vehicleId, updateData) => {

    const {
        data: existingVehicle,
        error: fetchError
    } = await supabase
        .from("vehicles")
        .select("*")
        .eq("vehicle_id", vehicleId)
        .single();

    if (fetchError || !existingVehicle) {
        throw new Error("Vehicle not found.");
    }

    if (
        updateData.registration_number &&
        updateData.registration_number !== existingVehicle.registration_number
    ) {

        const { data: duplicateVehicle } = await supabase
            .from("vehicles")
            .select("vehicle_id")
            .eq("registration_number", updateData.registration_number)
            .maybeSingle();

        if (duplicateVehicle) {
            throw new Error("Registration number already exists.");
        }
    }

    const { data, error } = await supabase
        .from("vehicles")
        .update({
            ...updateData,
            updated_at: new Date(),
            last_updated: new Date()
        })
        .eq("vehicle_id", vehicleId)
        .select()
        .single();

    if (error) {
        throw new Error(error.message);
    }

    return data;
};

const updateVehicleStatus = async (
    vehicleId,
    status
) => {

    const { data, error } = await supabase
        .from("vehicles")
        .update({
            status,
            updated_at: new Date(),
            last_updated: new Date()
        })
        .eq("vehicle_id", vehicleId)
        .select()
        .single();

    if (error) {
        throw new Error(error.message);
    }

    return data;
};

const updateMileage = async (
    vehicleId,
    mileage
) => {

    const { data: vehicle } = await supabase
        .from("vehicles")
        .select("current_mileage")
        .eq("vehicle_id", vehicleId)
        .single();

    if (!vehicle) {
        throw new Error("Vehicle not found.");
    }

    if (mileage < vehicle.current_mileage) {
        throw new Error(
            "Mileage cannot be decreased."
        );
    }

    const { data, error } = await supabase
        .from("vehicles")
        .update({
            current_mileage: mileage,
            updated_at: new Date(),
            last_updated: new Date()
        })
        .eq("vehicle_id", vehicleId)
        .select()
        .single();

    if (error)
        throw new Error(error.message);

    return data;
};



const deleteVehicle = async (vehicleId) => {

    const { data: assignment } = await supabase
        .from("vehicle_assignments")
        .select("assignment_id")
        .eq("vehicle_id", vehicleId)
        .eq("status", "Assigned")
        .maybeSingle();

    if (assignment) {
        throw new Error(
            "Vehicle has an active assignment."
        );
    }

    const { error } = await supabase
        .from("vehicles")
        .delete()
        .eq("vehicle_id", vehicleId);

    if (error) {
        throw new Error(error.message);
    }

    return;
};




module.exports = {

    createVehicle,

    getVehicles,

    getVehicleById,

    updateVehicle,

    updateVehicleStatus,

    updateMileage,

    deleteVehicle

};