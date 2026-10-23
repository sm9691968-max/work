const mongoose = require('mongoose');

const pingSchema = new mongoose.Schema(
  {
    source: {
      type: String,
      default: 'api',
    },
    pingedAt: {
      type: Date,
      default: Date.now,
    },
  },
  { versionKey: false }
);

module.exports = mongoose.model('Ping', pingSchema);
