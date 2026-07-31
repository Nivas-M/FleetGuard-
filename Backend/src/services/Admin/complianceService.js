const supabase = require("../../Config/db");

async function getComplianceSummary() {
    const today = new Date().toISOString().split("T")[0];

    const { data, error } = await supabase
        .from("compliance_documents")
        .select(`
            document_id,
            document_type,
            issue_date,
            expiry_date,
            vehicles (
                vehicle_id,
                registration_number,
                make,
                model,
                status
            )
        `)
        .order("expiry_date", { ascending: true });

    if (error) {
        throw new Error(error.message);
    }

    return data.map((doc) => ({
        documentId: doc.document_id,

        vehicleId: doc.vehicles?.vehicle_id,

        registrationNumber: doc.vehicles?.registration_number,

        vehicle:
            `${doc.vehicles?.make} ${doc.vehicles?.model}`,

        documentType: doc.document_type,

        issueDate: doc.issue_date,

        expiryDate: doc.expiry_date,

        vehicleStatus: doc.vehicles?.status,

        complianceStatus:
            doc.expiry_date < today
                ? "Overdue"
                : "Valid"
    }));
}

module.exports = {
    getComplianceSummary
};