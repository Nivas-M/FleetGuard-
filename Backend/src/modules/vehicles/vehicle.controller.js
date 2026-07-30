const vehicleService = require("./vehicle.service");
const { success, error } = require("../../Utils/apiResponse");

const createVehicle = async (req, res) => {

    try {

        const vehicle =
            await vehicleService.createVehicle(req.body);

        return success(
            res,
            "Vehicle created successfully.",
            vehicle,
            201
        );

    } catch (err) {

        return error(res, err.message, 400);

    }

};

const getVehicles = async (req, res) => {

    try {

        const result =
            await vehicleService.getVehicles(req.query);

        return success(
            res,
            "Vehicles fetched successfully.",
            result
        );

    } catch (err) {

        return error(res, err.message);

    }

};

const getVehicleById = async (req, res) => {

    try {

        const vehicle =
            await vehicleService.getVehicleById(
                req.params.vehicleId
            );

        return success(
            res,
            "Vehicle fetched successfully.",
            vehicle
        );

    } catch (err) {

        return error(res, err.message, 404);

    }

};

const updateVehicle = async (req, res) => {

    try {

        const vehicle =
            await vehicleService.updateVehicle(
                req.params.vehicleId,
                req.body
            );

        return success(
            res,
            "Vehicle updated successfully.",
            vehicle
        );

    } catch (err) {

        return error(res, err.message, 400);

    }

};

const updateVehicleStatus = async (
    req,
    res
) => {

    try {

        const vehicle =
            await vehicleService.updateVehicleStatus(
                req.params.vehicleId,
                req.body.status
            );

        return success(
            res,
            "Vehicle status updated.",
            vehicle
        );

    } catch (err) {

        return error(res, err.message);

    }

};


const updateMileage = async (
    req,
    res
) => {

    try {

        const vehicle =
            await vehicleService.updateMileage(
                req.params.vehicleId,
                req.body.currentMileage
            );

        return success(
            res,
            "Mileage updated.",
            vehicle
        );

    } catch (err) {

        return error(res, err.message);

    }

};


const deleteVehicle = async (
    req,
    res
) => {

    try {

        await vehicleService.deleteVehicle(
            req.params.vehicleId
        );

        return success(
            res,
            "Vehicle deleted successfully."
        );

    } catch (err) {

        return error(res, err.message);

    }

};


module.exports = {

    createVehicle,

    getVehicles,

    getVehicleById,

    updateVehicle,

    updateVehicleStatus,

    updateMileage,

    deleteVehicle

};