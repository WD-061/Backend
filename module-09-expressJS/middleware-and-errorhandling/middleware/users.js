export const routeMiddleware = (req, res, next) => {
  console.log('In route level middleware');
  next();
};

export const verifyAdmin = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  console.log(authHeader);

  if (authHeader !== 'admin') {
    return res.status(401).json({ message: 'Not authorized' });
  }

  next();
};
