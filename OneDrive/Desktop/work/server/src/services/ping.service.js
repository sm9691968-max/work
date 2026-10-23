const mongoose = require('mongoose');
const Ping = require('#models/Ping');

const getPing = async () => {
  const payload = {
    message: 'pong',
    service: 'shopsphere-api',
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
  };

  if (mongoose.connection.readyState === 1) {
    await Ping.create({ source: 'api' });
    payload.persisted = true;
  } else {
    payload.persisted = false;
  }

  return payload;
};

module.exports = { getPing };
