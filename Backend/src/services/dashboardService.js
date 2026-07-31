const supabaseAdmin = require("../Config/db");
const { todayISODate, addDaysISODate } = require("../utils/dataHelpers");
const {
    getPendingOverrideRequests
} = require("./Admin/overrideService");

// New Admin Services
const { getOverview } = require("./Admin/overviewService");
const { getUpcomingDocuments } = require("./Admin/upcomingService");
const { getRiskDistribution } = require("./Admin/riskService");
const { getComplianceSummary } = require("./Admin/complianceService");

async function countRows(table, filterFn) {
  if (!supabaseAdmin) {
    throw new Error(
      "Supabase client is not configured. Set SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY in your environment."
    );
  }

  let query = supabaseAdmin
    .from(table)
    .select("*", { count: "exact", head: true });

  if (filterFn) query = filterFn(query);

  const { count, error } = await query;

  if (error) {
    throw new Error(`Failed counting rows in "${table}": ${error.message}`);
  }

  return count || 0;
}

const VEHICLE_STATUS = {
  ACTIVE: "Active",
  UNDER_SERVICE: "Under Service",
  RESERVED: "Reserved",
  INACTIVE: "Inactive",
  RETIRED: "Retired",
};

const FLEET_MANAGER_ROLE = "Fleet Manager";

async function getDashboardSummary() {
  const today = todayISODate();
  const in30Days = addDaysISODate(30);
  const overrideRequests =
    await getPendingOverrideRequests();

  const [
    totalVehicles,
    activeVehicles,
    underServiceVehicles,
    inactiveVehicles,
    fleetManagers,
    totalComplianceDocs,
    expiredDocuments,
    expiringSoonDocuments,

    // New Admin Dashboard Services
    overview,
    upcomingDocuments,
    riskDistribution,
    complianceSummary,
  ] = await Promise.all([
    countRows("vehicles"),
    countRows("vehicles", (q) =>
      q.eq("status", VEHICLE_STATUS.ACTIVE)
    ),
    countRows("vehicles", (q) =>
      q.eq("status", VEHICLE_STATUS.UNDER_SERVICE)
    ),
    countRows("vehicles", (q) =>
      q.eq("status", VEHICLE_STATUS.INACTIVE)
    ),
    countRows("profiles", (q) =>
      q.eq("role", FLEET_MANAGER_ROLE)
    ),
    countRows("compliance_documents"),
    countRows("compliance_documents", (q) =>
      q.lt("expiry_date", today)
    ),
    countRows("compliance_documents", (q) =>
      q.gte("expiry_date", today).lte("expiry_date", in30Days)
    ),

    // New Services
    getOverview(),
    getUpcomingDocuments(),
    getRiskDistribution(),
    getComplianceSummary(),
  ]);

  const compliancePercentage =
    totalComplianceDocs === 0
      ? 100
      : Math.round(
          ((totalComplianceDocs - expiredDocuments) /
            totalComplianceDocs) *
            100
        );

  return {
    // Existing Dashboard Summary
    totalVehicles,
    activeVehicles,
    vehiclesUnderService: underServiceVehicles,
    inactiveVehicles,
    fleetManagers,
    expiredDocuments,
    documentsExpiringSoon: expiringSoonDocuments,
    compliancePercentage,
    mechanicalIssues: null,

    // New Admin Dashboard Data
    overview,
    upcomingDocuments,
    riskDistribution,
    complianceSummary,
    overrideRequests
  };
}

module.exports = {
  getDashboardSummary,
};