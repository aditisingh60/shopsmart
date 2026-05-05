require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose'); // ✅ ADD THIS

const app = express();
const PORT = process.env.PORT || 5001;

// Middleware
app.use(cors());
app.use(express.json());

// ✅ ADD THIS BLOCK (DB connection)
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('✅ MongoDB connected'))
  .catch(err => console.log('❌ DB error:', err));

// Health Check Route
app.get('/api/health', (req, res) => {
  res.json({
    status: 'ok',
    message: 'ShopSmart Backend is running',
    timestamp: new Date().toISOString()
  });
});
app.get('/health', (req, res) => {
  res.status(200).send('OK');
});

// Root Route
app.get('/', (req, res) => {
  res.send('ShopSmart Backend Service');
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
