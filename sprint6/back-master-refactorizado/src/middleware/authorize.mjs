export const authorize = (requiredRole) => {
    return (req, res, next) => {
      if (!req.user) return res.status(401).end();
      if (req.user.role !== requiredRole)
        return res.status(403).json({ error: "Forbidden" });
      next();
    };
  };
  