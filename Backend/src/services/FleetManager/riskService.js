const supabase = require("../../Config/db");

async function getRiskSummary() {

    const { data: vehicles, error } = await supabase
        .from("vehicles")
        .select("*");

    if (error) {
        throw new Error(error.message);
    }

    let highRisk = 0;
    let mediumRisk = 0;
    let lowRisk = 0;

    vehicles.forEach(vehicle => {

        if (vehicle.current_mileage >= 80000) {

            highRisk++;

        }

        else if (vehicle.current_mileage >= 50000) {

            mediumRisk++;

        }

        else {

            lowRisk++;

        }

    });

    const total = vehicles.length;

    const highRiskPercentage =
        total === 0
            ? 0
            : Math.round((highRisk / total) * 100);

    const mediumRiskPercentage =
        total === 0
            ? 0
            : Math.round((mediumRisk / total) * 100);

    const lowRiskPercentage =
        total === 0
            ? 0
            : Math.round((lowRisk / total) * 100);

    return {

        highRisk,

        mediumRisk,

        lowRisk,

        highRiskPercentage,

        mediumRiskPercentage,

        lowRiskPercentage

    };

}

module.exports = {

    getRiskSummary

};