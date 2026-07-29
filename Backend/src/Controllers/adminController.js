const { getDashboardSummary } = require('../services/dashboardService');

async function getDashboard(req, res) {
  try {
    const summary = await getDashboardSummary();
    return res.status(200).json({ success: true, data: summary });
  } catch (err) {
    console.error('[adminDashboardController.getDashboard]', err);
    return res.status(500).json({
      success: false,
      message: err.message || 'Failed to load dashboard summary.',
    });
  }
}

module.exports = { getDashboard };