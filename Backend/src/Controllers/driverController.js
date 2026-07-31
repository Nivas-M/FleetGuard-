const { getDashboard } = require("../Services/Driver/dashboardService");
const { submitPreTripChecklist } = require("../Services/Driver/preTripChecklistService");

/**
 * Driver Dashboard
 */
async function dashboard(req, res) {

    try {

        const data = await getDashboard(req.profile.id);

        return res.status(200).json({

            success: true,

            role: "Driver",

            data

        });

    } catch (err) {

        console.error(err);

        return res.status(500).json({

            success: false,

            message: err.message

        });

    }

}

/**
 * Submit Pre-Trip Checklist
 */
async function submitChecklist(req, res) {

    try {

        const result = await submitPreTripChecklist(

            req.profile.id,

            req.body

        );

        return res.status(200).json({

            success: true,

            message: "Checklist submitted successfully.",

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

    submitChecklist

};