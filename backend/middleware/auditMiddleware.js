const auditLog = (req, res, next) => {
  if (['POST', 'PUT', 'PATCH', 'DELETE'].includes(req.method)) {
    console.log(`[AUDIT] Action: ${req.method} | Path: ${req.originalUrl} | User: ${req.user ? req.user.email : 'Guest'} | Time: ${new Date().toISOString()}`);
  }
  next();
};

module.exports = auditLog;
