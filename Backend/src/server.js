const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '.env') });


console.log("SUPABASE_URL:", process.env.SUPABASE_URL);
console.log("SUPABASE_SECRET_KEY:", process.env.SUPABASE_SECRET_KEY);
const app = require('./app');

const PORT = Number(process.env.PORT || 3000);

app.listen(PORT, '0.0.0.0', () => {
  console.log(`FleetGuard backend running on port ${PORT}`);
});