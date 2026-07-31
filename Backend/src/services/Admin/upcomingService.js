const supabase = require("../../Config/db");

async function getUpcomingDocuments() {
    const today = new Date();
    const todayISO = today.toISOString().split("T")[0];

    const next30Days = new Date();
    next30Days.setDate(next30Days.getDate() + 30);

    const next30ISO = next30Days.toISOString().split("T")[0];

    const { data, error } = await supabase
        .from("compliance_documents")
        .select(`
            document_id,
            document_type,
            issue_date,
            expiry_date,
            vehicles (
                vehicle_id,
                registration_number
            )
        `)
        .lte("expiry_date", next30ISO)
        .order("expiry_date", { ascending: true });

    if (error) {
        throw new Error(error.message);
    }

    return data.map((doc) => ({
        documentId: doc.document_id,
        vehicleId: doc.vehicles.vehicle_id,
        registrationNumber: doc.vehicles.registration_number,
        documentType: doc.document_type,
        issueDate: doc.issue_date,
        expiryDate: doc.expiry_date,
        status: doc.expiry_date < todayISO ? "Overdue" : "Upcoming",
    }));
}

module.exports = {
    getUpcomingDocuments,
};