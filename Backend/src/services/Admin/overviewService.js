const supabase = require("../../Config/db");

async function getOverview() {

    const today = new Date().toISOString().split("T")[0];

    // Total Vehicles
    const { count: totalVehicles, error: vehicleError } = await supabase
        .from("vehicles")
        .select("*", { count: "exact", head: true });

    if (vehicleError) {
        throw new Error(vehicleError.message);
    }

    // Total Compliance Documents
    const { count: totalDocuments, error: documentError } = await supabase
        .from("compliance_documents")
        .select("*", { count: "exact", head: true });

    if (documentError) {
        throw new Error(documentError.message);
    }

    // Overdue Documents
    const { count: overdueDocuments, error: overdueError } = await supabase
        .from("compliance_documents")
        .select("*", { count: "exact", head: true })
        .lt("expiry_date", today);

    if (overdueError) {
        throw new Error(overdueError.message);
    }

    // Documents Still Valid
    const compliantDocuments = totalDocuments - overdueDocuments;

    // Vehicles needing action
    const actionRequired = overdueDocuments;

    // Compliance Percentage
    const compliancePercentage =
        totalDocuments === 0
            ? 0
            : Math.round(
                  (compliantDocuments / totalDocuments) * 100
              );

    return {

        totalVehicles,

        compliantDocuments,

        overdueDocuments,

        actionRequired,

        compliancePercentage

    };

}

module.exports = {

    getOverview

};