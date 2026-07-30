const validateVehicle = (body) => {

    const {
        registration_number,
        make,
        model,
        year
    } = body;

    if (!registration_number)
        throw new Error("Registration number is required.");

    if (!make)
        throw new Error("Vehicle make is required.");

    if (!model)
        throw new Error("Vehicle model is required.");

    if (!year)
        throw new Error("Vehicle year is required.");

};

module.exports = {
    validateVehicle
};