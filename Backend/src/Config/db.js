const path = require("path");
const fs = require("fs");
const dotenv = require("dotenv");

const envPath = path.resolve(__dirname, "../../.env");

console.log("ENV PATH:", envPath);
console.log("FILE EXISTS:", fs.existsSync(envPath));

const result = dotenv.config({ path: envPath });

console.log("DOTENV RESULT:", result);

console.log("SUPABASE_URL:", process.env.SUPABASE_URL);
console.log("SUPABASE_SECRET_KEY:", process.env.SUPABASE_SECRET_KEY);
const { createClient } = require("@supabase/supabase-js");
const WebSocket = require("ws");

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SECRET_KEY || process.env.SUPABASE_PUBLISHABLE_KEY || process.env.SUPABASE_ANON_KEY;

let supabase = null;

if (supabaseUrl && supabaseKey) {
  supabase = createClient(supabaseUrl, supabaseKey, {
    auth: {
      persistSession: false,
      autoRefreshToken: false,
    },
    realtime: {
      transport: WebSocket,
    },
  });
}

module.exports = supabase;