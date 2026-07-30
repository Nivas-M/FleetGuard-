const supabase = require("../../Config/db");
const { validateDocument } = require("./compliance.validation");


const createDocument = async (vehicleId, body) => {

    validateDocument(body);

    const {
        document_type,
        issue_date,
        expiry_date,
        renewal_interval_days,
        document_file
    } = body;

    // Check Vehicle

    const { data: vehicle } = await supabase
        .from("vehicles")
        .select("vehicle_id")
        .eq("vehicle_id", vehicleId)
        .single();

    if (!vehicle)
        throw new Error("Vehicle not found.");

    // Prevent duplicate document type

    const { data: existing } = await supabase
        .from("compliance_documents")
        .select("document_id")
        .eq("vehicle_id", vehicleId)
        .eq("document_type", document_type)
        .maybeSingle();

    if (existing)
        throw new Error(
            `${document_type} document already exists for this vehicle.`
        );

    const { data, error } = await supabase
        .from("compliance_documents")
        .insert({

            vehicle_id: vehicleId,

            document_type,

            issue_date,

            expiry_date,

            renewal_interval_days,

            document_file

        })
        .select()
        .single();

    if (error)
        throw new Error(error.message);

    return data;

};


const getVehicleDocuments = async (vehicleId) => {

    const { data, error } = await supabase
        .from("compliance_documents")
        .select("*")
        .eq("vehicle_id", vehicleId)
        .order("expiry_date");

    if (error)
        throw new Error(error.message);

    return data;

};

const getDocumentById = async (documentId) => {

    const { data, error } = await supabase
        .from("compliance_documents")
        .select(`
            *,
            vehicles(
                registration_number,
                make,
                model
            )
        `)
        .eq("document_id", documentId)
        .single();

    if (error || !data)
        throw new Error("Document not found.");

    return data;

};
const updateDocument = async (documentId, body) => {

    const {
        issue_date,
        expiry_date,
        renewal_interval_days,
        document_file
    } = body;

    const { data: existing } = await supabase
        .from("compliance_documents")
        .select("*")
        .eq("document_id", documentId)
        .single();

    if (!existing)
        throw new Error("Document not found.");

    const { data, error } = await supabase
        .from("compliance_documents")
        .update({

            issue_date,

            expiry_date,

            renewal_interval_days,

            document_file,

            updated_at: new Date().toISOString()

        })
        .eq("document_id", documentId)
        .select()
        .single();

    if (error)
        throw new Error(error.message);

    return data;

};

const deleteDocument = async (documentId) => {

    const { data: existing } = await supabase
        .from("compliance_documents")
        .select("document_id")
        .eq("document_id", documentId)
        .single();

    if (!existing)
        throw new Error("Document not found.");

    const { error } = await supabase
        .from("compliance_documents")
        .delete()
        .eq("document_id", documentId);

    if (error)
        throw new Error(error.message);

    return {
        deleted: true
    };

};

const getExpiringDocuments = async () => {

    const today = new Date();

    const future = new Date();

    future.setDate(today.getDate() + 30);

    const { data, error } = await supabase
        .from("compliance_documents")
        .select(`
            *,
            vehicles(
                registration_number,
                make,
                model
            )
        `)
        .gte("expiry_date", today.toISOString().split("T")[0])
        .lte("expiry_date", future.toISOString().split("T")[0])
        .order("expiry_date");

    if (error)
        throw new Error(error.message);

    return data;

};


const getExpiredDocuments = async () => {

    const today = new Date().toISOString().split("T")[0];

    const { data, error } = await supabase
        .from("compliance_documents")
        .select(`
            *,
            vehicles(
                registration_number,
                make,
                model
            )
        `)
        .lt("expiry_date", today)
        .order("expiry_date");

    if (error)
        throw new Error(error.message);

    return data;

};module.exports = {

    createDocument,

    getVehicleDocuments,

    getDocumentById,

    updateDocument,

    deleteDocument,

    getExpiringDocuments,

    getExpiredDocuments

};