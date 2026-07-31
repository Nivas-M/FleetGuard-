const supabase = require("../Config/supabase");

const roleMiddleware = (...allowedRoles) => {
  
  return async (req, res, next) => {
    try {
      const userId = req.user.id;

      console.log("JWT User ID:", userId);

      const { data, error } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", userId)
        .single();

      if (error) {
        return res.status(404).json({
          success: false,
          message: error.message,
          error,
        });
      }
      console.log("JWT User ID:", userId);
      console.log("Profile:", data);
      console.log("Allowed Roles:", allowedRoles);
      console.log("Database Role:", JSON.stringify(data.role));
      console.log("Comparison:", allowedRoles.includes(data.role));
      if (!allowedRoles.includes(data.role)) {
        return res.status(403).json({
          success: false,
          message: "Access denied",
        });
      }

      req.role = data.role;

      next();
    } catch (err) {
      return res.status(500).json({
        success: false,
        message: err.message,
      });
    }
  };
};

module.exports = roleMiddleware;
