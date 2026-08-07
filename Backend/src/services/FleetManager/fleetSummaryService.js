const supabase = require("../../Config/db");

async function getFleetSummary() {

    // Total Vehicles
    const { count: totalVehicles } = await supabase
        .from("vehicles")
        .select("*", { count: "exact", head: true });

    // Active Vehicles
    const { count: activeVehicles } = await supabase
        .from("vehicles")
        .select("*", { count: "exact", head: true })
        .eq("status", "Active");

    // Under Service
    const { count: underService } = await supabase
        .from("vehicles")
        .select("*", { count: "exact", head: true })
        .eq("status", "Under Service");

    // Reserved
    const { count: reservedVehicles } = await supabase
        .from("vehicles")
        .select("*", { count: "exact", head: true })
        .eq("status", "Reserved");

    // Inactive
    const { count: inactiveVehicles } = await supabase
        .from("vehicles")
        .select("*", { count: "exact", head: true })
        .eq("status", "Inactive");

    // Retired
    const { count: retiredVehicles } = await supabase
        .from("vehicles")
        .select("*", { count: "exact", head: true })
        .eq("status", "Retired");

    // Assigned Vehicles
    const { count: assignedVehicles } = await supabase
        .from("vehicle_assignments")
        .select("*", { count: "exact", head: true })
        .eq("status", "Assigned");

    // Available Vehicles
    const availableVehicles =
        totalVehicles - assignedVehicles;

    // Compliance Documents
    const today = new Date().toISOString().split("T")[0];

    const { count: overdueDocuments } = await supabase
        .from("compliance_documents")
        .select("*", { count: "exact", head: true })
        .lt("expiry_date", today);

    const next30 = new Date();
    next30.setDate(next30.getDate() + 30);

    const { count: expiringSoon } = await supabase
        .from("compliance_documents")
        .select("*", { count: "exact", head: true })
        .gte("expiry_date", today)
        .lte(
            "expiry_date",
            next30.toISOString().split("T")[0]
        );

    // Compliance %
    const compliancePercentage =
        totalVehicles === 0
            ? 0
            : Math.round(
                  ((totalVehicles - overdueDocuments) /
                      totalVehicles) *
                      100
              );

    return {

        totalVehicles,

        activeVehicles,

        underService,

        reservedVehicles,

        inactiveVehicles,

        retiredVehicles,

        assignedVehicles,

        availableVehicles,

        overdueDocuments,

        expiringSoon,

        compliancePercentage

    };
}

module.exports = {

    getFleetSummary

};