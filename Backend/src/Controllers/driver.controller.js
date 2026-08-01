const driverService = require("./driver.service");
const { success, error } = require("../../Utils/apiResponse");

const getDrivers = async (req, res) => {

    try {

        const drivers = await driverService.getDrivers(req.query);

        return success(
            res,
            "Drivers fetched successfully.",
            drivers
        );

    } catch (err) {

        return error(res, err.message);

    }

};

const getDriverById = async (req, res) => {

    try {

        const driver = await driverService.getDriverById(req.params.id);

        return success(
            res,
            "Driver fetched successfully.",
            driver
        );

    } catch (err) {

        return error(res, err.message, 404);

    }

};

const getDriverAssignments = async (req, res) => {

    try {

        const assignments = await driverService.getDriverAssignments(req.params.id);

        return success(
            res,
            "Assignment history fetched successfully.",
            assignments
        );

    } catch (err) {

        return error(res, err.message);

    }

};

module.exports = {

    getDrivers,

    getDriverById,

    getDriverAssignments

};