const express = require('express');
const cors = require('cors');

const pingRoutes = require('#routes/ping.routes');
const { notFound, errorHandler } = require('#middleware/error');

const app = express();

app.use(cors());
app.use(express.json());

app.use((req, res, next) => {
  console.log(`${req.method} ${req.originalUrl}`);
  next();
});

app.use('/api/ping', pingRoutes);

app.use(notFound);
app.use(errorHandler);

module.exports = app;
