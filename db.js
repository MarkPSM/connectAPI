const { Pool } = require('pg');

const pool = new Pool({
    connectionString: "postgresql://neondb_owner:npg_8je9gzURNLyO@ep-autumn-rice-acu7b4ss-pooler.sa-east-1.aws.neon.tech/neondb?sslmode=require&channel_binding=require"
});

module.exports = pool;