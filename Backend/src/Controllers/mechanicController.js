const {

    getDashboard

} = require("../Services/Mechanic/dashboardService");

const {
    logCompletedService
} = require("../Services/Mechanic/logService");

async function dashboard(req, res) {

    try {

        const data =
            await getDashboard();

        return res.status(200).json({

            success: true,

            role:
                req.profile.role,

            data

        });

    }

    catch (err) {
    console.error(err);

    return res.status(500).json({
        success: false,
        message: err.message,
        stack: err.stack
    });
}

}

async function logService(req, res) {

    try {

        const {

            vehicle_id,
            current_mileage,
            notes

        } = req.body;

        const result =
            await logCompletedService({

                vehicle_id,

                current_mileage,

                notes,

                mechanic_id:
                    req.profile.id

            });

        return res.status(200).json({

            success: true,

            message:
                "Service logged successfully.",

            data: result

        });

    } catch (err) {

        console.error(err);

        return res.status(500).json({

            success: false,

            message: err.message

        });

    }

}

module.exports = {

    dashboard,
    logService

};