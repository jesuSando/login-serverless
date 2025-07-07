// functions/hello.js
const jwt = require('jsonwebtoken');
const SECRET_KEY = 'supersecreto';

exports.handler = async (event) => {
  const authHeader = event.headers.authorization;

  if (!authHeader) {
    return {
      statusCode: 401,
      body: 'No autorizado',
    };
  }

  try {
    const token = authHeader.split(' ')[1];
    const user = jwt.verify(token, SECRET_KEY);
    return {
      statusCode: 200,
      body: JSON.stringify({ message: `Hola ${user.username}, accediste correctamente.` }),
    };
  } catch (err) {
    return {
      statusCode: 403,
      body: 'Token inválido',
    };
  }
};
