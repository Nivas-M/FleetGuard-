const validateService = (body) => {

    const {
        service_date,
        service_type,
        odometer,
        next_service_due
    } = body;

    if (!service_date)
        throw new Error("Service date is required.");

    if (!service_type)
        throw new Error("Service type is required.");

    if (odometer === undefined)
        throw new Error("Odometer is required.");

    if (!next_service_due)
        throw new Error("Next service due date is required.");

};

module.exports = {
    validateService
};