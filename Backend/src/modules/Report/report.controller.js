const reportService = require("./report.service");

const { success, error } = require("../../Utils/apiResponse");

const getFleetSummary = async (req, res) => {
  try {
    const data = await reportService.getFleetSummary();

    return success(res, "Fleet summary generated.", data);
  } catch (err) {
    return error(res, err.message);
  }
};

const getComplianceReport = async (req, res) => {
  try {
    const data = await reportService.getComplianceReport();

    return success(res, "compliance report  generated.", data);
  } catch (err) {
    return error(res, err.message);
  }
};

const getServiceReport = async (req, res) => {
  try {
    const data = await reportService.getServiceReport();

    return success(res, "Service Report  generated.", data);
  } catch (err) {
    return error(res, err.message);
  }
};

const getAssignmentReport = async (req, res) => {
  try {
    const data = await reportService.getAssignmentReport();

    return success(res, "assignment report generated.", data);
  } catch (err) {
    return error(res, err.message);
  }
};

module.exports = {
  getFleetSummary,
  getComplianceReport,
  getServiceReport,
  getAssignmentReport,
};
