const jwt = require('jsonwebtoken');

const { NODE_ENV, JWT_SECRET } = process.env;

module.exports = (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization || !authorization.startsWith('Bearer ')) {
    console.log('No se proporcionó token o formato incorrecto');
    return res.status(403).send({ message: 'Se requiere autorización' });
  }

  const token = authorization.replace('Bearer ', '');

  let payload;

  try {
    payload = jwt.verify(token, NODE_ENV === 'production' ? JWT_SECRET : 'clave-secreta');
  } catch (err) {
    return res.status(403).send({ message: 'Token no válido' });
  }

  req.user = payload;

  next();
};
