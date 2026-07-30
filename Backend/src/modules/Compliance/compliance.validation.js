const validateDocument = (body) => {

    const {
        document_type,
        issue_date,
        expiry_date,
        renewal_interval_days
    } = body;

    if (!document_type)
        throw new Error("Document type is required.");

    if (!issue_date)
        throw new Error("Issue date is required.");

    if (!expiry_date)
        throw new Error("Expiry date is required.");

    if (!renewal_interval_days)
        throw new Error("Renewal interval is required.");

};

module.exports = {
    validateDocument
};