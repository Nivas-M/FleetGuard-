const supabase = require("../../Config/db");

async function getComplianceStatus(vehicleId) {

    // Get compliance documents
    const { data: documents, error: docError } = await supabase
        .from("compliance_documents")
        .select(`
            document_type,
            expiry_date
        `)
        .eq("vehicle_id", vehicleId);

    if (docError)
        throw new Error(docError.message);

    // Get maintenance schedule
    const { data: schedule, error: scheduleError } = await supabase
        .from("maintenance_schedule")
        .select(`
            next_service_km,
            vehicles(current_mileage)
        `)
        .eq("vehicle_id", vehicleId)
        .single();

    if (scheduleError)
        throw new Error(scheduleError.message);

    const today = new Date();

    const compliance = {

        insurance: "Not Available",
        inspection: "Not Available",
        emission: "Not Available",
        serviceClock: "Up to Date"

    };

    documents.forEach(doc => {

        const status =
            new Date(doc.expiry_date) >= today
                ? "Valid"
                : "Expired";

        switch (doc.document_type) {

            case "Insurance":
                compliance.insurance = status;
                break;

            case "Inspection":
                compliance.inspection = status;
                break;

            case "Emission":
                compliance.emission = status;
                break;

        }

    });

    if (
        schedule.vehicles.current_mileage >=
        schedule.next_service_km
    ) {

        compliance.serviceClock = "Due";

    }
    else if (
        schedule.next_service_km -
        schedule.vehicles.current_mileage <= 2000
    ) {

        compliance.serviceClock = "Due Soon";

    }

    return compliance;

}

module.exports = {

    getComplianceStatus

};