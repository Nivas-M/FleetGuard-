const supabase = require("../../Config/db");

async function getServiceQueue() {

    // Get maintenance schedule + vehicles
    const { data: schedules, error: scheduleError } = await supabase
        .from("maintenance_schedule")
        .select(`
            schedule_id,
            vehicle_id,
            service_name,
            service_interval_km,
            last_service_km,
            next_service_km,
            vehicles(
                vehicle_id,
                registration_number,
                make,
                model,
                current_mileage,
                status
            )
        `);

    if (scheduleError) {
        throw new Error(scheduleError.message);
    }

    // Get compliance documents separately
    const { data: documents, error: documentError } = await supabase
        .from("compliance_documents")
        .select(`
            vehicle_id,
            expiry_date,
            document_type
        `);

    if (documentError) {
        throw new Error(documentError.message);
    }

    const today = new Date();

    return schedules.map(item => {

        let score = 0;
        let overdue = false;

        // Mileage Risk
        if (
            item.vehicles.current_mileage >=
            item.next_service_km
        ) {
            score += 30;
        }

        // Compliance documents of this vehicle
        const vehicleDocs = documents.filter(
            doc => doc.vehicle_id === item.vehicle_id
        );

        vehicleDocs.forEach(doc => {

            if (new Date(doc.expiry_date) < today) {

                overdue = true;
                score += 60;

            }

        });

        // Vehicle status
        if (
            item.vehicles.status === "Under Service"
        ) {
            score += 10;
        }

        let priority = "Low";

        if (score >= 90)
            priority = "High";
        else if (score >= 40)
            priority = "Medium";

        return {

            scheduleId: item.schedule_id,

            vehicleId: item.vehicle_id,

            registrationNumber:
                item.vehicles.registration_number,

            vehicle:
                `${item.vehicles.make} ${item.vehicles.model}`,

            serviceName:
                item.service_name,

            mileage:
                item.vehicles.current_mileage,

            dueMileage:
                item.next_service_km,

            priority,

            overdue,

            status:
                item.vehicles.status

        };

    });

}

module.exports = {
    getServiceQueue
};