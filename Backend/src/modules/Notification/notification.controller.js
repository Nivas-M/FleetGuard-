const service =
require("./notification.service");

const {
    success,
    error
} = require("../../Utils/apiResponse");


const getNotifications = async (
    req,
    res
) => {

    try {

        const notifications =
            await service.getNotifications(
                req.user.id
            );

        return success(
            res,
            "Notifications fetched successfully.",
            notifications
        );

    } catch (err) {

        return error(
            res,
            err.message
        );

    }

};

const markAsRead = async (
    req,
    res
) => {

    try {

        const notification =
            await service.markAsRead(
                req.params.notificationId,
                req.user.id
            );

        return success(
            res,
            "Notification marked as read.",
            notification
        );

    } catch (err) {

        return error(
            res,
            err.message
        );

    }

};

const markAllAsRead = async (
    req,
    res
) => {

    try {

        await service.markAllAsRead(
            req.user.id
        );

        return success(
            res,
            "All notifications marked as read.",
            null
        );

    } catch (err) {

        return error(
            res,
            err.message
        );

    }

};

module.exports = {

    getNotifications,

    markAsRead,

    markAllAsRead

};