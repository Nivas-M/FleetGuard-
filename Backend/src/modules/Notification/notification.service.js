const supabase = require("../../Config/db");

const getNotifications = async (userId) => {

    const { data, error } = await supabase
        .from("notifications")
        .select("*")
        .eq("recipient_id", userId)
        .order("created_at", {
            ascending: false
        });

    if (error)
        throw new Error(error.message);

    const unreadCount = data.filter(
        notification => notification.status === "Unread"
    ).length;

    return {
        notifications: data,
        unreadCount
    };

};

const markAsRead = async (
    notificationId,
    userId
) => {

    const { data: notification } = await supabase
        .from("notifications")
        .select("*")
        .eq("notification_id", notificationId)
        .eq("recipient_id", userId)
        .single();

    if (!notification)
        throw new Error("Notification not found.");

    const { data, error } = await supabase
        .from("notifications")
        .update({

            status: "Read",

            read_at: new Date().toISOString()

        })
        .eq("notification_id", notificationId)
        .select()
        .single();

    if (error)
        throw new Error(error.message);

    return data;

};

const markAllAsRead = async (
    userId
) => {

    const { error } = await supabase
        .from("notifications")
        .update({

            status: "Read",

            read_at: new Date().toISOString()

        })
        .eq("recipient_id", userId)
        .eq("status", "Unread");

    if (error)
        throw new Error(error.message);

    return {

        updated: true

    };

};

module.exports = {

    getNotifications,

    markAsRead,

    markAllAsRead

};