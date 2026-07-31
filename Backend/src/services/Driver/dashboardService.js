const { getAssignedVehicle } = require("./assignedVehicleService");
const { getComplianceStatus } = require("./complianceService");
const { getHeadsUpNotice } = require("./noticeService");
const { getRecentChecklists } = require("./checklistService");

async function getDashboard(driverId) {

    // 1. Assigned Vehicle
    const assignedVehicle = await getAssignedVehicle(driverId);

    if (!assignedVehicle) {

        return {

            assignedVehicle: null,

            compliance: null,

            headsUp: null,

            recentChecklist: []

        };

    }

    const vehicleId = assignedVehicle.vehicleId;

    // 2. Compliance
    const compliance =
        await getComplianceStatus(vehicleId);

    // 3. Heads Up Notice
    const headsUp =
        await getHeadsUpNotice(vehicleId);

    // 4. Recent Checklist
    const recentChecklist =
        await getRecentChecklists(driverId);

    return {

        assignedVehicle,

        compliance,

        headsUp,

        recentChecklist

    };

}

module.exports = {

    getDashboard

};