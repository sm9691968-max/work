require('dotenv').config();
const express = require('express');
const { connectDB } = require('./config/db');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());

app.get('/api/health', (req, res) => {
  res.status(200).json({ status: 'ok' });
});

const startServer = async () => {
  try {
    await connectDB();
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  } catch (error) {
    console.error(`Server startup aborted: ${error.message}`);
    process.exit(1);
  }
};

startServer();
