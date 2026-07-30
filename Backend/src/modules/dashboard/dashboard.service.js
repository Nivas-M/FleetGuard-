const supabase = require("../../Config/db");

const getDashboard = async () => {

    const today = new Date();

    const thirtyDaysLater = new Date();
    thirtyDaysLater.setDate(today.getDate() + 30);

    // --------------------------------------------------
    // Vehicle Statistics
    // --------------------------------------------------

    const { count: totalVehicles } = await supabase
        .from("vehicles")
        .select("*", { count: "exact", head: true });

    const { count: activeVehicles } = await supabase
        .from("vehicles")
        .select("*", { count: "exact", head: true })
        .eq("status", "Active");

    const { count: underService } = await supabase
        .from("vehicles")
        .select("*", { count: "exact", head: true })
        .eq("status", "Under Service");

    // --------------------------------------------------
    // Active Assignments
    // --------------------------------------------------

    const { count: assignedVehicles } = await supabase
        .from("vehicle_assignments")
        .select("*", { count: "exact", head: true })
        .eq("status", "Assigned");

    // --------------------------------------------------
    // Compliance Documents
    // --------------------------------------------------

    const { count: documentsExpiring } = await supabase
        .from("compliance_documents")
        .select("*", { count: "exact", head: true })
        .gte("expiry_date", today.toISOString().split("T")[0])
        .lte("expiry_date", thirtyDaysLater.toISOString().split("T")[0]);

    // --------------------------------------------------
    // Services Due
    // --------------------------------------------------

    const { count: servicesDue } = await supabase
        .from("service_logs")
        .select("*", { count: "exact", head: true })
        .lte("next_service_due", thirtyDaysLater.toISOString().split("T")[0]);

    // --------------------------------------------------
    // Failed Pre Trip Checks
    // --------------------------------------------------

    const { count: failedPreTrips } = await supabase
        .from("pre_trip_checks")
        .select("*", { count: "exact", head: true })
        .eq("status", "Failed");

    return {

        totalVehicles,

        activeVehicles,

        underService,

        assignedVehicles,

        documentsExpiring,

        servicesDue,

        failedPreTrips

    };

};

module.exports = {
    getDashboard
};