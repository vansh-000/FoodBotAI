module.exports = (err, req, res, next) => {
  console.error("❌ Error Handler:", err);
  res.status(err.status || 500).json({
    error: err.message || "Internal Server Error",
    stack: process.env.NODE_ENV !== "production" ? err.stack : undefined,
    details: err.details || err,
  });
};
