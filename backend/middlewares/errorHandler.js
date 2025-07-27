module.exports = (err, req, res, next) => {
  console.error("❌ Error Handler:", err);

  const statusCode = typeof err.status === 'number' ? err.status : 500;

  res.status(statusCode).json({
    error: err.message || "Internal Server Error",
    details: err.details || undefined,
  });
};
