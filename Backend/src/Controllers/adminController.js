const { getDashboardSummary } = require("../services/dashboardService");

const {
    approveOverrideRequest: approveOverrideService,
    rejectOverrideRequest: rejectOverrideService
} = require("../services/Admin/overrideService");

/**
 * Get Admin Dashboard
 */
async function getDashboard(req, res) {
    try {
        const summary = await getDashboardSummary();

        return res.status(200).json({
            success: true,
            data: summary
        });
    } catch (err) {
        console.error("[adminController.getDashboard]", err);

        return res.status(500).json({
            success: false,
            message: err.message || "Failed to load dashboard summary."
        });
    }
}

/**
 * Approve Override Request
 */
async function approveOverrideRequest(req, res) {
    try {
        const { requestId } = req.params;
        const { comment } = req.body;

        // Replace this with your authenticated admin ID if available
        const approvedBy = req.user?.id || null;

        const result = await approveOverrideService(
            requestId,
            approvedBy,
            comment
        );

        return res.status(200).json({
            success: true,
            message: "Override request approved successfully.",
            data: result
        });
    } catch (err) {
        console.error("[adminController.approveOverrideRequest]", err);

        return res.status(400).json({
            success: false,
            message: err.message
        });
    }
}

/**
 * Reject Override Request
 */
async function rejectOverrideRequest(req, res) {
    try {
        const { requestId } = req.params;
        const { comment } = req.body;

        // Replace this with your authenticated admin ID if available
        const approvedBy = req.user?.id || null;

        const result = await rejectOverrideService(
            requestId,
            approvedBy,
            comment
        );

        return res.status(200).json({
            success: true,
            message: "Override request rejected successfully.",
            data: result
        });
    } catch (err) {
        console.error("[adminController.rejectOverrideRequest]", err);

        return res.status(400).json({
            success: false,
            message: err.message
        });
    }
}

module.exports = {
    getDashboard,
    approveOverrideRequest,
    rejectOverrideRequest
};