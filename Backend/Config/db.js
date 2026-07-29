const { createClient } = require('@supabase/supabase-js');

const SUPABASE_URL = process.env.SUPABASE_URL;
const SUPABASE_SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;

function createMockSupabaseClient() {
  const mockData = {
    vehicles: [
      { id: 1, status: 'active' },
      { id: 2, status: 'maintenance' },
      { id: 3, status: 'out_of_service' },
    ],
    profiles: [
      { id: 1, role: 'fleet_manager' },
      { id: 2, role: 'fleet_manager' },
      { id: 3, role: 'admin' },
    ],
    compliance_documents: [
      { id: 1, expiry_date: '2026-07-29' },
      { id: 2, expiry_date: '2026-08-10' },
      { id: 3, expiry_date: '2026-09-01' },
    ],
  };

  function createQuery(tableName) {
    const rows = [...(mockData[tableName] || [])];

    const query = {
      count: rows.length,
      error: null,
      select() {
        query.count = rows.length;
        return query;
      },
      eq(field, value) {
        const filteredRows = rows.filter((item) => item[field] === value);
        query.count = filteredRows.length;
        return query;
      },
      lt(field, value) {
        const filteredRows = rows.filter((item) => item[field] < value);
        query.count = filteredRows.length;
        return query;
      },
      lte(field, value) {
        const filteredRows = rows.filter((item) => item[field] <= value);
        query.count = filteredRows.length;
        return query;
      },
      gte(field, value) {
        const filteredRows = rows.filter((item) => item[field] >= value);
        query.count = filteredRows.length;
        return query;
      },
    };

    return query;
  }

  return {
    from(tableName) {
      return createQuery(tableName);
    },
  };
}

let supabaseAdmin = null;

if (SUPABASE_URL && SUPABASE_SERVICE_ROLE_KEY) {
  supabaseAdmin = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY, {
    auth: {
      autoRefreshToken: false,
      persistSession: false,
    },
  });
} else {
  supabaseAdmin = createMockSupabaseClient();
}

module.exports = supabaseAdmin;