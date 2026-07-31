const supabase = require("../../Config/db");

async function getRecentServices() {

    const { data, error } = await supabase
        .from("service_logs")
        .select(`
            service_id,
            mileage,
            cost,
            service_interval_km,
            next_service_mileage,
            next_service_due,
            notes,
            service_date,

            vehicles(
                registration_number,
                make,
                model
            ),

            profiles!service_logs_performed_by_fkey(
                name
            )
        `)
        .order("service_date", { ascending: false })
        .limit(5);

    if (error) {
        throw new Error(error.message);
    }

    return data.map(service => ({

        serviceId: service.service_id,

        vehicle:
            `${service.vehicles.make} ${service.vehicles.model}`,

        registrationNumber:
            service.vehicles.registration_number,

        mileage:
            service.mileage,

        cost:
            service.cost,

        serviceInterval:
            service.service_interval_km,

        nextServiceMileage:
            service.next_service_mileage,

        nextServiceDue:
            service.next_service_due,

        notes:
            service.notes,

        completedAt:
            service.service_date,

        mechanic:
            service.profiles?.name || "Unknown"

    }));

}

module.exports = {
    getRecentServices
};