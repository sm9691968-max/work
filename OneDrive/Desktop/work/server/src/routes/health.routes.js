const express = require('express');
const { getConnectionState } = require('../config/db');

const router = express.Router();

router.get('/', (req, res) => {
  res.status(200).json({
    status: 'ok',
    uptime: process.uptime(),
    dbState: getConnectionState(),
  });
});

module.exports = router;
