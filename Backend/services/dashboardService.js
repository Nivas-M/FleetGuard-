const supabaseAdmin = require('../Config/db');
const { todayISODate, addDaysISODate } = require('../utils/dataHelpers');

async function countRows(table, filterFn) {
  if (!supabaseAdmin) {
    throw new Error('Supabase client is not configured. Set SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY in your environment.');
  }

  let query = supabaseAdmin.from(table).select('*', { count: 'exact', head: true });
  if (filterFn) query = filterFn(query);

  const { count, error } = await query;
  if (error) {
    throw new Error(`Failed counting rows in "${table}": ${error.message}`);
  }
  return count || 0;
}

// NOTE: confirm these match your real `vehicle_status` enum values in Supabase.
const VEHICLE_STATUS = {
  ACTIVE: 'active',
  MAINTENANCE: 'maintenance',
  OUT_OF_SERVICE: 'out_of_service',
};

const FLEET_MANAGER_ROLE = 'fleet_manager';

async function getDashboardSummary() {
  const today = todayISODate();
  const in30Days = addDaysISODate(30);

  const [
    totalVehicles,
    activeVehicles,
    maintenanceVehicles,
    outOfServiceVehicles,
    fleetManagers,
    totalComplianceDocs,
    expiredDocuments,
    expiringSoonDocuments,
  ] = await Promise.all([
    countRows('vehicles'),
    countRows('vehicles', (q) => q.eq('status', VEHICLE_STATUS.ACTIVE)),
    countRows('vehicles', (q) => q.eq('status', VEHICLE_STATUS.MAINTENANCE)),
    countRows('vehicles', (q) => q.eq('status', VEHICLE_STATUS.OUT_OF_SERVICE)),
    countRows('profiles', (q) => q.eq('role', FLEET_MANAGER_ROLE)),
    countRows('compliance_documents'),
    countRows('compliance_documents', (q) => q.lt('expiry_date', today)),
    countRows('compliance_documents', (q) => q.gte('expiry_date', today).lte('expiry_date', in30Days)),
  ]);

  const compliancePercentage =
    totalComplianceDocs === 0
      ? 100
      : Math.round(((totalComplianceDocs - expiredDocuments) / totalComplianceDocs) * 100);

  return {
    totalVehicles,
    activeVehicles,
    vehiclesUnderMaintenance: maintenanceVehicles,
    outOfServiceVehicles,
    expiredDocuments,
    documentsExpiringSoon: expiringSoonDocuments,
    fleetManagers,
    compliancePercentage,
    mechanicalIssues: null, // no mechanical_issues table in current schema
  };
}

module.exports = { getDashboardSummary };