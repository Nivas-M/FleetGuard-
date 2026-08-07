const supabase = require("../../Config/db");

async function getHeadsUpNotice(vehicleId) {

    const today = new Date();

    // Fetch maintenance schedule
    const { data: schedule, error: scheduleError } = await supabase
        .from("maintenance_schedule")
        .select(`
            service_name,
            next_service_km,
            vehicles(
                current_mileage,
                registration_number
            )
        `)
        .eq("vehicle_id", vehicleId)
        .single();

    if (scheduleError)
        throw new Error(scheduleError.message);

    // Fetch compliance documents
    const { data: docs, error: docError } = await supabase
        .from("compliance_documents")
        .select(`
            document_type,
            expiry_date
        `)
        .eq("vehicle_id", vehicleId);

    if (docError)
        throw new Error(docError.message);

    // 1. Expired documents
    for (const doc of docs) {

        if (new Date(doc.expiry_date) < today) {

            return {

                title: `${doc.document_type} Expired`,

                message:
                    `${doc.document_type} document has expired.`,

                type: "Danger"

            };

        }

    }

    // 2. Documents expiring within 30 days
    for (const doc of docs) {

        const days =
            Math.ceil(
                (new Date(doc.expiry_date) - today)
                / (1000 * 60 * 60 * 24)
            );

        if (days <= 30) {

            return {

                title:
                    `${doc.document_type} Expiring Soon`,

                message:
                    `${doc.document_type} expires in ${days} days.`,

                type: "Warning"

            };

        }

    }

    // 3. Maintenance due soon
    const remainingKm =
        schedule.next_service_km -
        schedule.vehicles.current_mileage;

    if (remainingKm <= 2000) {

        return {

            title:
                "Routine Maintenance Service Due Soon",

            message:
                `${schedule.service_name} due in ${remainingKm} km.`,

            type: "Info"

        };

    }

    // 4. Everything is fine
    return {

        title: "Road Legal",

        message:
            "All compliance documents are valid.",

        type: "Success"

    };

}

module.exports = {

    getHeadsUpNotice

};