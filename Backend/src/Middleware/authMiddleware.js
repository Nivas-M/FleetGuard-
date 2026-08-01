    const supabase = require("../Config/supabase");

    const authMiddleware = async (req, res, next) => {
        try {

            const authHeader = req.headers.authorization;

            if (!authHeader || !authHeader.startsWith("Bearer ")) {
                return res.status(401).json({
                    success: false,
                    message: "Access token is required",
                });
            }

            const token = authHeader.split(" ")[1];

            const { data, error } = await supabase.auth.getUser(token);

            if (error || !data.user) {
                return res.status(401).json({
                    success: false,
                    message: "Invalid or expired token",
                });
            }

            const { data: profile, error: profileError } = await supabase
                .from("profiles")
                .select("*")
                .eq("id", data.user.id)
                .maybeSingle();

            if (profileError) {
                return res.status(500).json({
                    success: false,
                    message: profileError.message,
                });
            }

            req.user = data.user;
            req.profile = profile;

            next();

        } catch (err) {

            return res.status(500).json({
                success: false,
                message: err.message,
            });

        }
    };

    module.exports = authMiddleware;