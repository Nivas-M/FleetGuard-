const path = require("path");
require("dotenv").config({ path: path.resolve(__dirname, "../.env") });

const { createClient } = require("@supabase/supabase-js");
const WebSocket = require("ws");

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY,
  {
    auth: {
      persistSession: false,
      autoRefreshToken: false,
    },
    realtime: {
      transport: WebSocket,
    },
  }
);

module.exports = supabase;
