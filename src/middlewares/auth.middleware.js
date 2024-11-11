const jwt = require('jsonwebtoken');
const authMiddleware = require('../middleware/auth.middleware');

app.use('/api/pacientes', authMiddleware, pacienteRoutes);
app.use('/api/expedientes', authMiddleware, expedienteRoutes);
app.use('/api/signos-vitales', authMiddleware, signosVitalesRoutes);


module.exports = (req, res, next) => {
  const token = req.headers['authorization'];
  if (!token) {
    return res.status(403).json({ message: 'Token requerido' });
  }

  try {
    const decoded = jwt.verify(token.split(" ")[1], 'olasoyunaclave');
    req.userId = decoded.userId;
    next();
  } catch (error) {
    res.status(401).json({ message: 'Token inválido' });
  }
};
