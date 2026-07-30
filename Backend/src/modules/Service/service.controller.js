const serviceService =
require("./service.service");

const {
    success,
    error
} = require("../../Utils/apiResponse");

const createService = async (
    req,
    res
) => {

    try {

        const service =
            await serviceService.createService(
                req.params.vehicleId,
                req.body
            );

        return success(
            res,
            "Service log created successfully.",
            service,
            201
        );

    } catch (err) {

        return error(
            res,
            err.message,
            400
        );

    }

};

const getVehicleServices = async (
    req,
    res
) => {

    try {

        const services =
            await serviceService.getVehicleServices(
                req.params.vehicleId
            );

        return success(
            res,
            "Vehicle service history fetched successfully.",
            services
        );

    } catch (err) {

        return error(
            res,
            err.message
        );

    }

};

const getServiceById = async (
    req,
    res
) => {

    try {

        const service =
            await serviceService.getServiceById(
                req.params.serviceId
            );

        return success(
            res,
            "Service details fetched successfully.",
            service
        );

    } catch (err) {

        return error(
            res,
            err.message,
            404
        );

    }

};

const updateService = async (
    req,
    res
) => {

    try {

        const service =
            await serviceService.updateService(
                req.params.serviceId,
                req.body
            );

        return success(
            res,
            "Service updated successfully.",
            service
        );

    } catch (err) {

        return error(
            res,
            err.message
        );

    }

};

const deleteService = async (
    req,
    res
) => {

    try {

        await serviceService.deleteService(
            req.params.serviceId
        );

        return success(
            res,
            "Service deleted successfully.",
            null
        );

    } catch (err) {

        return error(
            res,
            err.message
        );

    }

};

const getDueServices = async (
    req,
    res
) => {

    try {

        const services =
            await serviceService.getDueServices();

        return success(
            res,
            "Due services fetched successfully.",
            services
        );

    } catch (err) {

        return error(
            res,
            err.message
        );

    }

};
module.exports = {

    createService,

    getVehicleServices,

    getServiceById,

    updateService,

    deleteService,

    getDueServices

};