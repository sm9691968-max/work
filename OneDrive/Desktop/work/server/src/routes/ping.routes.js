const express = require('express');
const { ping } = require('#controllers/ping.controller');

const router = express.Router();

router.get('/', ping);

module.exports = router;
