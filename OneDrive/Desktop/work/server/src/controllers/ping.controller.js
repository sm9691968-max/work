const asyncHandler = require('#utils/asyncHandler');
const { getPing } = require('#services/ping.service');

const ping = asyncHandler(async (req, res) => {
  const data = await getPing();
  res.status(200).json({
    success: true,
    message: 'Ping successful',
    data,
  });
});

module.exports = { ping };
