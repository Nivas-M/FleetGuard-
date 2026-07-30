const complianceService = require("./compliance.service");
const { success, error } = require("../../Utils/apiResponse");

const createDocument = async (req, res) => {

    try {

        const document =
            await complianceService.createDocument(
                req.params.vehicleId,
                req.body
            );

        return success(
            res,
            "Document uploaded successfully.",
            document,
            201
        );

    } catch (err) {

        return error(res, err.message, 400);

    }

};

const getVehicleDocuments = async (req, res) => {

    try {

        const documents =
            await complianceService.getVehicleDocuments(
                req.params.vehicleId
            );

        return success(
            res,
            "Documents fetched successfully.",
            documents
        );

    } catch (err) {

        return error(res, err.message);

    }

};

const getDocumentById = async (req, res) => {

    try {

        const document =
            await complianceService.getDocumentById(
                req.params.documentId
            );

        return success(
            res,
            "Document fetched successfully.",
            document
        );

    } catch (err) {

        return error(res, err.message, 404);

    }

};

const updateDocument = async (req, res) => {

    try {

        const document =
            await complianceService.updateDocument(
                req.params.documentId,
                req.body
            );

        return success(
            res,
            "Document updated successfully.",
            document
        );

    } catch (err) {

        return error(res, err.message);

    }

};

const deleteDocument = async (req, res) => {

    try {

        await complianceService.deleteDocument(
            req.params.documentId
        );

        return success(
            res,
            "Document deleted successfully.",
            null
        );

    } catch (err) {

        return error(res, err.message);

    }

};

const getExpiringDocuments = async (req, res) => {

    try {

        const documents =
            await complianceService.getExpiringDocuments();

        return success(
            res,
            "Expiring documents fetched successfully.",
            documents
        );

    } catch (err) {

        return error(res, err.message);

    }

};

const getExpiredDocuments = async (req, res) => {

    try {

        const documents =
            await complianceService.getExpiredDocuments();

        return success(
            res,
            "Expired documents fetched successfully.",
            documents
        );

    } catch (err) {

        return error(res, err.message);

    }

};
module.exports = {

    createDocument,

    getVehicleDocuments,

    getDocumentById,

    updateDocument,

    deleteDocument,

    getExpiringDocuments,

    getExpiredDocuments

};