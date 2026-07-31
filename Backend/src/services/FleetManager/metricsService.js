const {
    getFleetSummary
} = require("./fleetSummaryService");

const {
    getRiskSummary
} = require("./riskService");

async function getFleetMetrics() {

    const fleet =
        await getFleetSummary();

    const risk =
        await getRiskSummary();

    const fleetHealth =
        Math.round(
            (
                fleet.compliancePercentage +
                risk.lowRiskPercentage
            ) / 2
        );

    const assignmentPercentage =
        fleet.totalVehicles === 0
            ? 0
            : Math.round(
                  (
                      fleet.assignedVehicles /
                      fleet.totalVehicles
                  ) * 100
              );

    return {

        fleetHealth,

        compliancePercentage:
            fleet.compliancePercentage,

        assignmentPercentage,

        riskPercentage:
            risk.highRiskPercentage,

        vehiclesNeedingAttention:
            fleet.overdueDocuments +
            risk.highRisk

    };
}

module.exports = {
    getFleetMetrics
};