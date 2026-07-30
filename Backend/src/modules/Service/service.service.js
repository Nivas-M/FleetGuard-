const supabase = require("../../Config/db");

const { validateService } =
require("./service.validation");

const createService = async (
    vehicleId,
    body
) => {

    validateService(body);

    const {
        service_date,
        service_type,
        cost,
        odometer,
        next_service_due,
        notes,
        service_center
    } = body;

    // Vehicle

    const { data: vehicle } = await supabase
        .from("vehicles")
        .select("*")
        .eq("vehicle_id", vehicleId)
        .single();

    if (!vehicle)
        throw new Error("Vehicle not found.");

    // Future service date

    const today = new Date();

    if (new Date(service_date) > today)
        throw new Error(
            "Service date cannot be in the future."
        );

    // Odometer validation

    if (odometer < vehicle.current_mileage)
        throw new Error(
            "Service odometer cannot be less than current vehicle mileage."
        );

    // Insert service

    const { data, error } = await supabase
        .from("service_logs")
        .insert({

            vehicle_id: vehicleId,

            service_date,

            service_type,

            cost,

            odometer,

            next_service_due,

            notes,

            service_center

        })
        .select()
        .single();

    if (error)
        throw new Error(error.message);

    // Update vehicle mileage

    if (odometer > vehicle.current_mileage) {

        await supabase
            .from("vehicles")
            .update({

                current_mileage: odometer

            })
            .eq(
                "vehicle_id",
                vehicleId
            );

    }

    return data;

};

const getVehicleServices = async (
    vehicleId
) => {

    const { data, error } = await supabase
        .from("service_logs")
        .select("*")
        .eq(
            "vehicle_id",
            vehicleId
        )
        .order(
            "service_date",
            {
                ascending: false
            }
        );

    if (error)
        throw new Error(error.message);

    return data;

};

const getServiceById = async (
    serviceId
) => {

    const { data, error } = await supabase
        .from("service_logs")
        .select(`
            *,
            vehicles(
                registration_number,
                make,
                model
            )
        `)
        .eq(
            "service_id",
            serviceId
        )
        .single();

    if (error)
        throw new Error("Service not found.");

    return data;

};
const updateService = async (
    serviceId,
    body
) => {

    const {
        service_date,
        service_type,
        cost,
        odometer,
        next_service_due,
        notes,
        service_center
    } = body;

    const { data: existing } = await supabase
        .from("service_logs")
        .select("*")
        .eq("service_id", serviceId)
        .single();

    if (!existing)
        throw new Error("Service record not found.");

    if (service_date) {

        if (new Date(service_date) > new Date()) {

            throw new Error(
                "Service date cannot be in the future."
            );

        }

    }

    const updateData = {};

    if (service_date !== undefined)
        updateData.service_date = service_date;

    if (service_type !== undefined)
        updateData.service_type = service_type;

    if (cost !== undefined)
        updateData.cost = cost;

    if (odometer !== undefined)
        updateData.odometer = odometer;

    if (next_service_due !== undefined)
        updateData.next_service_due = next_service_due;

    if (notes !== undefined)
        updateData.notes = notes;

    if (service_center !== undefined)
        updateData.service_center = service_center;

    updateData.updated_at = new Date().toISOString();

    const { data, error } = await supabase
        .from("service_logs")
        .update(updateData)
        .eq("service_id", serviceId)
        .select()
        .single();

    if (error)
        throw new Error(error.message);

    if (
        odometer !== undefined &&
        odometer > existing.odometer
    ) {

        await supabase
            .from("vehicles")
            .update({
                current_mileage: odometer
            })
            .eq(
                "vehicle_id",
                existing.vehicle_id
            );

    }

    return data;

};

const deleteService = async (
    serviceId
) => {

    const { data: existing } = await supabase
        .from("service_logs")
        .select("service_id")
        .eq("service_id", serviceId)
        .single();

    if (!existing)
        throw new Error("Service record not found.");

    const { error } = await supabase
        .from("service_logs")
        .delete()
        .eq("service_id", serviceId);

    if (error)
        throw new Error(error.message);

    return {

        deleted: true

    };

};

const getDueServices = async () => {

    const today =
        new Date()
            .toISOString()
            .split("T")[0];

    const { data, error } = await supabase
        .from("service_logs")
        .select(`
            *,
            vehicles(
                vehicle_id,
                registration_number,
                make,
                model,
                current_mileage
            )
        `)
        .lte(
            "next_service_due",
            today
        )
        .order(
            "next_service_due"
        );

    if (error)
        throw new Error(error.message);

    return data;

};
module.exports = {

    createService,

    getVehicleServices,

    getServiceById,

    updateService,

    deleteService,

    getDueServices

};  