const supabase = require("../../Config/db");

async function logCompletedService({

    vehicle_id,
    service_type,
    current_mileage,
    notes,
    mechanic_id

}) {

    // Get maintenance schedule
    const { data: schedule, error: scheduleError } =
        await supabase
            .from("maintenance_schedule")
            .select("*")
            .eq("vehicle_id", vehicle_id)
            .single();

    if (scheduleError)
        throw new Error(scheduleError.message);

    // Insert service log
    const { error: logError } =
        await supabase
            .from("service_logs")
            .insert({

                vehicle_id,

                performed_by: mechanic_id,

                service_date: new Date(),

                mileage: current_mileage,

                cost: 0,

                service_interval_km:
                    schedule.service_interval_km,

                next_service_mileage:
                    current_mileage +
                    schedule.service_interval_km,

                next_service_due:
                    new Date(
                        Date.now() +
                        180 * 24 * 60 * 60 * 1000
                    ),

                notes

            });

    if (logError)
        throw new Error(logError.message);

    // Update vehicle mileage
    const { error: vehicleError } =
        await supabase
            .from("vehicles")
            .update({

                current_mileage

            })
            .eq("vehicle_id", vehicle_id);

    if (vehicleError)
        throw new Error(vehicleError.message);

    // Update maintenance schedule
    const { error: maintenanceError } =
        await supabase
            .from("maintenance_schedule")
            .update({

                last_service_km:
                    current_mileage,

                next_service_km:
                    current_mileage +
                    schedule.service_interval_km

            })
            .eq("vehicle_id", vehicle_id);

    if (maintenanceError)
        throw new Error(maintenanceError.message);

    // Reset compliance clock
    const { data: docs } =
        await supabase
            .from("compliance_documents")
            .select("*")
            .eq("vehicle_id", vehicle_id);

    for (const doc of docs) {

        const today = new Date();

        const expiry =
            new Date(today);

        expiry.setDate(
            expiry.getDate() +
            doc.renewal_interval_days
        );

        await supabase
            .from("compliance_documents")
            .update({

                issue_date:
                    today,

                expiry_date:
                    expiry

            })
            .eq(
                "document_id",
                doc.document_id
            );

    }

    return {

        success: true

    };

}

module.exports = {

    logCompletedService

};