const dashboardService = require("./dashboard.service");
const { success, error } = require("../../Utils/apiResponse");

const getDashboard = async (req, res) => {

    try {

        const dashboard =
            await dashboardService.getDashboard();

        return success(
            res,
            "Dashboard fetched successfully.",
            dashboard
        );

    } catch (err) {

        return error(
            res,
            err.message
        );

    }

};

module.exports = {
    getDashboard
};