const supabase = require("../../Config/db");

async function getRiskDistribution() {
    const today = new Date();
    const todayISO = today.toISOString().split("T")[0];

    const next30Days = new Date();
    next30Days.setDate(next30Days.getDate() + 30);

    const next30ISO = next30Days.toISOString().split("T")[0];

    // High Risk
    const { count: highRisk, error: highError } = await supabase
        .from("compliance_documents")
        .select("*", { count: "exact", head: true })
        .lt("expiry_date", todayISO);

    if (highError) {
        throw new Error(highError.message);
    }

    // Medium Risk
    const { count: mediumRisk, error: mediumError } = await supabase
        .from("compliance_documents")
        .select("*", { count: "exact", head: true })
        .gte("expiry_date", todayISO)
        .lte("expiry_date", next30ISO);

    if (mediumError) {
        throw new Error(mediumError.message);
    }

    // Low Risk
    const { count: lowRisk, error: lowError } = await supabase
        .from("compliance_documents")
        .select("*", { count: "exact", head: true })
        .gt("expiry_date", next30ISO);

    if (lowError) {
        throw new Error(lowError.message);
    }

    return {
        highRisk,
        mediumRisk,
        lowRisk,
        total: highRisk + mediumRisk + lowRisk,
    };
}

module.exports = {
    getRiskDistribution,
};