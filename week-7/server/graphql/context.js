const jwt = require('jsonwebtoken');
const User = require('../models/user');

require('dotenv').config();

const JWT_SECRET = process.env.JWT_SECRET || 'utn-api-secret-key';

async function buildContext({ request }) {
  const authHeader = request.headers.get('authorization') || '';
  const token = authHeader.startsWith('Bearer ') ? authHeader.slice('Bearer '.length) : null;

  let user = null;
  if (token) {
    try {
      const payload = jwt.verify(token, JWT_SECRET);
      user = await User.findById(payload.userId);
    } catch {
      user = null;
    }
  }

  return { user, jwtSecret: JWT_SECRET };
}

module.exports = { buildContext };

