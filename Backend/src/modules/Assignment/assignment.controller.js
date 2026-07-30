const assignmentService = require("./assignment.service");
const { success, error } = require("../../Utils/apiResponse");

const createAssignment = async (req, res) => {

    try {

        const assignment =
            await assignmentService.createAssignment(
                req.body,
                req.user.id
            );

        return success(
            res,
            "Vehicle assigned successfully.",
            assignment,
            201
        );

    } catch (err) {

        return error(res, err.message, 400);

    }

};

const getAssignments = async (req, res) => {

    try {

        const assignments =
            await assignmentService.getAssignments(req.query);

        return success(
            res,
            "Assignments fetched successfully.",
            assignments
        );

    } catch (err) {

        return error(res, err.message);

    }

};

const getAssignmentById = async (req, res) => {

    try {

        const assignment =
            await assignmentService.getAssignmentById(
                req.params.id
            );

        return success(
            res,
            "Assignment fetched successfully.",
            assignment
        );

    } catch (err) {

        return error(res, err.message, 404);

    }

};

const getActiveAssignments = async (req, res) => {

    try {

        const assignments =
            await assignmentService.getActiveAssignments();

        return success(
            res,
            "Active assignments fetched.",
            assignments
        );

    } catch (err) {

        return error(res, err.message);

    }

};
const completeAssignment = async (req, res) => {

    try {

        const assignment =
            await assignmentService.completeAssignment(
                req.params.id
            );

        return success(
            res,
            "Assignment completed successfully.",
            assignment
        );

    } catch (err) {

        return error(res, err.message);

    }

};

const cancelAssignment = async (req, res) => {

    try {

        const assignment =
            await assignmentService.cancelAssignment(
                req.params.id
            );

        return success(
            res,
            "Assignment cancelled successfully.",
            assignment
        );

    } catch (err) {

        return error(res, err.message);

    }

};

const overrideAssignment = async (req, res) => {

    try {

        const assignment =
            await assignmentService.overrideAssignment(
                req.params.id,
                req.body.reason,
                req.user.id
            );

        return success(
            res,
            "Override approved successfully.",
            assignment
        );

    } catch (err) {

        return error(res, err.message);

    }

};

module.exports = {

    createAssignment,

    getAssignments,

    getAssignmentById,

    getActiveAssignments,

    completeAssignment,

    cancelAssignment,

    overrideAssignment

};