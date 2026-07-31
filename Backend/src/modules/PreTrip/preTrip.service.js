const supabase = require("../../Config/db");

const getAllInspections = async () => {
  const { data, error } = await supabase
    .from("pre_trip_checks")
    .select(
      `
        *,
        vehicles(
            registration_number,
            make,
            model
        ),
        profiles(
            name
        )
    `,
    )
    .order("check_date", {
      ascending: false,
    });

  if (error) throw new Error(error.message);

  return data;
};

const getFailedInspections = async () => {
  const { data, error } = await supabase
    .from("pre_trip_checks")
    .select(
      `
        *,
        vehicles(
            registration_number,
            make,
            model
        ),
        profiles(
            name
        )
    `,
    )
    .eq("status", "Failed")
    .order("check_date", {
      ascending: false,
    });

  if (error) throw new Error(error.message);

  return data;
};

const getInspectionById = async (inspectionId) => {
  const { data, error } = await supabase
    .from("pre_trip_checks")
    .select(
      `
        *,
        vehicles(*),
        profiles(*)
    `,
    )
    .eq("check_id", inspectionId)
    .single();

  if (error) throw new Error("Inspection not found.");

  return data;
};

module.exports = {
  getAllInspections,

  getFailedInspections,

  getInspectionById,
};
