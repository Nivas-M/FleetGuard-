const supabase = require("../../Config/db");

/**
 * Get all pending override requests
 */
async function getPendingOverrideRequests() {
    const { data, error } = await supabase
        .from("override_requests")
        .select(`
            request_id,
            reason,
            status,
            created_at,
            vehicles(
                registration_number,
                make,
                model
            ),
            driver:profiles!override_requests_driver_id_fkey(
                name
            ),
            requestedBy:profiles!override_requests_requested_by_fkey(
                name
            )
        `)
        .eq("status", "Pending")
        .order("created_at", { ascending: false });

    if (error) throw new Error(error.message);

    return data;
}

/**
 * Approve override request
 */
async function approveOverrideRequest(requestId, approvedBy, comment) {
    const { data, error } = await supabase
        .from("override_requests")
        .update({
            status: "Approved",
            approved_by: approvedBy,
            admin_comment: comment,
            approved_at: new Date().toISOString()
        })
        .eq("request_id", requestId)
        .select()
        .single();

    if (error) throw new Error(error.message);

    return data;
}

/**
 * Reject override request
 */
async function rejectOverrideRequest(requestId, approvedBy, comment) {
    const { data, error } = await supabase
        .from("override_requests")
        .update({
            status: "Rejected",
            approved_by: approvedBy,
            admin_comment: comment,
            approved_at: new Date().toISOString()
        })
        .eq("request_id", requestId)
        .select()
        .single();

    if (error) throw new Error(error.message);

    return data;
}

module.exports = {
    getPendingOverrideRequests,
    approveOverrideRequest,
    rejectOverrideRequest
};