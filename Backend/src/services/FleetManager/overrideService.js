const supabase = require("../../Config/db");

async function getOverrideQueue() {

    const { data, error } = await supabase
        .from("override_logs")
        .select(`
            *,
            profiles(name)
        `)
        .order("created_at", {
            ascending: false
        });

    if (error)
        throw new Error(error.message);

    return data.map(item => ({
        overrideId: item.override_id,
        assignmentId: item.assignment_id,
        approvedBy:
            item.profiles?.name ?? "Unknown",
        reason: item.reason,
        createdAt: item.created_at
    }));
}

module.exports = {
    getOverrideQueue
};