const supabase = require('../Config/db');

async function getVehicles(req, res) {
  try {
    const { data, error } = await supabase
      .from('vehicles')
      .select('*')
      .order('vehicle_id', { ascending: true });

    if (error) {
      return res.status(500).json({
        success: false,
        message: error.message,
      });
    }

    return res.status(200).json({
      success: true,
      count: Array.isArray(data) ? data.length : 0,
      data: Array.isArray(data) ? data : [],
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: err.message,
    });
  }
}

async function getVehicleById(req, res) {
  try {
    const { vehicleId } = req.params;

    const { data, error } = await supabase
      .from('vehicles')
      .select('*')
      .eq('vehicle_id', vehicleId)
      .single();

    if (error) {
      return res.status(404).json({
        success: false,
        message: error.message,
      });
    }

    return res.status(200).json({
      success: true,
      data,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: err.message,
    });
  }
}

module.exports = {
  getVehicleById,
  getVehicles,
};