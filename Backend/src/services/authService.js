const supabase = require("../Config/supabase");

const register = async ({ name, email, password, role }) => {

    const { data, error } = await supabase.auth.admin.createUser({
        email,
        password,
        email_confirm: true,
    });

    if (error) {
        throw new Error(error.message);
    }

    const authUser = data.user;

    const { error: userError } = await supabase
        .from("profiles")
        .insert({
            id: authUser.id,
            name,
            role,
        });

    if (userError) {
        throw new Error(userError.message);
    }

    return {
        success: true,
        message: "User registered successfully",
    };
};

const login = async ({ email, password }) => {

    const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
    });

    if (error) {
        throw new Error(error.message);
    }

    const { data: profile, error: profileError } = await supabase
        .from("profiles")
        .select("id, name, role")
        .eq("id", data.user.id)
        .single();

    if (profileError) {
        throw new Error(profileError.message);
    }

    return {
        success: true,
        message: "Login successful",
        accessToken: data.session.access_token,
        refreshToken: data.session.refresh_token,

        user: {
            id: profile.id,
            name: profile.name,
            email: data.user.email,
            role: profile.role
        }
    };
};

module.exports = {
    register,
    login,
};