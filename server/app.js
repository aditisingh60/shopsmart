const express = require("express");
const cors = require("cors");

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Health Check Routes
app.get("/api/health", (req, res) => {
  res.json({
    status: "ok",
    message: "ShopSmart Backend is running",
    timestamp: new Date().toISOString(),
  });
});

app.get("/health", (req, res) => {
  res.status(200).send("OK");
});

// Root Route
app.get("/", (req, res) => {
  res.send("ShopSmart Backend Service");
});

module.exports = { app };

