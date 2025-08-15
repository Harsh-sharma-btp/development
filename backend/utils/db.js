const mysql = require('mysql2');

// Create a connection pool (better than a single connection)
const pool = mysql.createPool({
  host: 'localhost',     
  user: 'root',          
  password: 'root',  
  database: 'Ecart',   
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

// Export a promise-based pool
const promisePool = pool.promise();

