const fleetSummaryService = require("./fleetSummaryService");
const riskService = require("./riskService");
const notificationService = require("./notificationService");
const complianceService = require("./complianceService");
const assignmentService = require("./assignmentService");
const overrideService = require("./overrideService");
const metricsService = require("./metricsService");

/**
 * Dashboard
 */
async function getFleetManagerDashboard() {

    const [
        fleetSummary,
        riskSummary,
        notifications,
        complianceTable,
        recentAssignments,
        overrideQueue,
        metrics,
        availableDrivers,
        availableVehicles
    ] = await Promise.all([

        fleetSummaryService.getFleetSummary(),

        riskService.getRiskSummary(),

        notificationService.getNotifications(),

        complianceService.getComplianceOverview(),

        assignmentService.getRecentAssignments(),

        overrideService.getOverrideQueue(),

        metricsService.getFleetMetrics(),

        assignmentService.getAvailableDrivers(),

        assignmentService.getAvailableVehicles()

    ]);

    return {

        fleetSummary,

        riskSummary,

        metrics,

        notifications,

        complianceTable,

        recentAssignments,

        overrideQueue,

        availableDrivers,

        availableVehicles

    };
}

/**
 * Assign Vehicle
 */
async function assignVehicle(data) {

    return assignmentService.assignVehicle(data);

}

module.exports = {

    getFleetManagerDashboard,

    assignVehicle

};