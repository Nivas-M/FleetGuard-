const express = require("express");

const router = express.Router();

const authenticate = require("../../Middleware/authMiddleware");
const authorize = require("../../Middleware/roleMiddleware");

const complianceController = require("./compliance.controller");

router.use(authenticate);
router.use(authorize("Fleet Manager"));

router.post(
    "/vehicles/:vehicleId/documents",
    complianceController.createDocument
);

router.get(
    "/vehicles/:vehicleId/documents",
    complianceController.getVehicleDocuments
);
router.get(
    "/documents/expiring",
    complianceController.getExpiringDocuments
);

router.get(
    "/documents/expired",
    complianceController.getExpiredDocuments
);

router.get(
    "/documents/:documentId",
    complianceController.getDocumentById
);
router.patch(
    "/documents/:documentId",
    complianceController.updateDocument
);

router.delete(
    "/documents/:documentId",
    complianceController.deleteDocument
);


module.exports = router;