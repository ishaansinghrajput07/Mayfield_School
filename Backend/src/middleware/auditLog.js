const AuditLog = require("../models/AuditLog");

const sensitiveField = /password|token|secret|otp|verification|authorization/i;

const auditLog = (req, res, next) => {
  const methodActions = {
    POST: "CREATE",
    PUT: "UPDATE",
    PATCH: "UPDATE",
    DELETE: "DELETE",
  };
  const action = methodActions[req.method];
  const path = req.path;

  if (!action || !path.startsWith("/api/") || path.startsWith("/api/auth") || path.startsWith("/api/otp") || path.startsWith("/api/audit-logs")) {
    return next();
  }

  res.once("finish", () => {
    if (res.statusCode >= 400) return;

    const routeParts = path.split("/").filter(Boolean).slice(1);
    const entity = routeParts[0] || "api";
    const candidateId = routeParts.find((part) => /^[a-f\d]{24}$/i.test(part));
    const changedFields = req.body && typeof req.body === "object"
      ? Object.keys(req.body).filter((field) => !sensitiveField.test(field)).slice(0, 50)
      : [];

    AuditLog.create({
      userId: req.user?._id,
      action,
      entity,
      entityId: candidateId,
      method: req.method,
      path,
      statusCode: res.statusCode,
      changedFields,
    }).catch((error) => {
      console.error("Audit log write failed:", error.message);
    });
  });

  next();
};

module.exports = auditLog;
