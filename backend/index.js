const express = require('express');
const app = express();
const os = require('os');
const db = require("./utils/db"); // Make sure db.js exports the pool

const PORT = 3000;

const getLocalIP = () => {
  const interfaces = os.networkInterfaces();
  for (const name of Object.keys(interfaces)) {
    for (const iface of interfaces[name]) {
      if (iface.family === 'IPv4' && !iface.internal) {
        return iface.address;
      }
    }
  }
};

// Server start logs in purple
console.log("\x1b[35m%s\x1b[0m", "==== Server connected successfully ===");
console.log("\x1b[35m%s\x1b[0m", `==== Running at http://localhost:${PORT} ====`);
console.log("\x1b[35m%s\x1b[0m", `==== Running at http://${getLocalIP()}:${PORT} (local network) ====`);

// Express routes
app.get('/', (req, res) => {
    res.send("Welcome to the Backend Server");
});

app.get('/test-db', async (req, res) => {
  try {
    const [rows] = await db.query('SELECT NOW() AS current_time'); // test query
    console.log("\x1b[35m%s\x1b[0m", 'Database connection successful');
    res.send(`Database connected! Current time: ${rows[0].current_time}`);
  } catch (err) {
    console.error("\x1b[35m%s\x1b[0m", 'Database connection failed:', err);
    res.status(500).send('Database connection failed');
  }
});

app.listen(PORT);
