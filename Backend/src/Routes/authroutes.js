const express = require("express");
const router = express.Router();

const authController = require("../Controllers/authController");

const authMiddleware = require("../Middleware/authMiddleware");
const roleMiddleware = require("../Middleware/roleMiddleware");

router.post("/register", authController.register);
router.post("/login", authController.login);

router.get("/test", authMiddleware, (req, res) => {
    res.json({
        success: true,
        message: "Token is valid",
        user: req.user,
    });
});

router.get(
    "/admin",
    authMiddleware,
    roleMiddleware("Admin"),
    (req, res) => {
        res.json({
            success: true,
            message: "Welcome Admin",
            user: req.user,
            role: req.role,
        });
    }
);

module.exports = router;
console.log("Auth routes loaded");