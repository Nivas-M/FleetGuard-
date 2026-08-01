const supabase = require("../../Config/db");

async function getComplianceOverview() {

    const { data: vehicles, error } = await supabase
        .from("vehicles")
        .select(`
            vehicle_id,
            registration_number,
            make,
            model,

            compliance_documents(
                document_type,
                expiry_date
            ),

            vehicle_assignments(
                    status,
                    driver:profiles!vehicle_assignments_driver_id_fkey(
                    name
                )
            )
        `);

    if (error) {
        throw new Error(error.message);
    }

    const complianceTable = vehicles.map(vehicle => {

        const assignment =
            vehicle.vehicle_assignments?.find(
                assignment => assignment.status === "Assigned"
            );

        const insurance =
            vehicle.compliance_documents?.find(
                document =>
                    document.document_type === "Insurance"
            );

        const inspection =
            vehicle.compliance_documents?.find(
                document =>
                    document.document_type === "Inspection"
            );

        const emission =
            vehicle.compliance_documents?.find(
                document =>
                    document.document_type === "Emission"
            );

        return {

            vehicleId: vehicle.vehicle_id,

            registrationNumber:
                vehicle.registration_number,

            vehicle:
                `${vehicle.make} ${vehicle.model}`,

            driver:
                assignment?.driver?.name ??
                "Not Assigned",

            assignmentStatus:
                assignment?.status ??
                "Available",

            insuranceExpiry:
                insurance?.expiry_date ?? "-",

            inspectionExpiry:
                inspection?.expiry_date ?? "-",

            emissionExpiry:
                emission?.expiry_date ?? "-"

        };

    });

    return complianceTable;

}

module.exports = {

    getComplianceOverview

};