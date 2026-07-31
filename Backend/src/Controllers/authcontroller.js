const authService = require("../services/authService");

const register = async (req, res) => {
    try {

        const result = await authService.register(req.body);

        return res.status(201).json(result);

    } catch (err) {

        return res.status(400).json({
            success: false,
            message: err.message,
        });

    }
};

const login = async (req, res) => {
    try {

        const result = await authService.login(req.body);

        return res.status(200).json(result);

    } catch (err) {

        return res.status(400).json({
            success: false,
            message: err.message,
        });

    }
};



module.exports = {
    register,
    login,
};