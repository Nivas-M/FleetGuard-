const fleetManagerService = require("../Services/FleetManager/fleetManagerService");

async function getDashboard(req, res) {

    try {

        const dashboard =
            await fleetManagerService.getFleetManagerDashboard();

        res.status(200).json(dashboard);

    }

    catch (error) {

        res.status(500).json({

            success: false,

            message: error.message

        });

    }

}

async function assignVehicle(req, res) {

    try {

        const assignment =
            await fleetManagerService.assignVehicle({

                ...req.body,

                assigned_by: req.user.id

            });

        res.status(201).json({

            success: true,

            message: "Vehicle assigned successfully.",

            assignment

        });

    }

    catch (error) {

        res.status(400).json({

            success: false,

            message: error.message

        });

    }

}

module.exports = {

    getDashboard,

    assignVehicle

};