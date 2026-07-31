const supabase = require("../../Config/db");

async function getNotifications() {

    const { data: notifications, error } = await supabase
        .from("notifications")
        .select(`
            *,
            vehicles(
                registration_number,
                make,
                model
            )
        `)
        .order("sent_at", { ascending: false });

    if (error) {
        throw new Error(error.message);
    }

    const unreadCount = notifications.filter(
        notification => notification.status === "Unread"
    ).length;

    const reminderCount = notifications.filter(
        notification => notification.type === "Reminder"
    ).length;

    return {

        unreadCount,

        reminderCount,

        notifications

    };

}

module.exports = {

    getNotifications

};