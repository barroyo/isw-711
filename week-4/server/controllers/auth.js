const User = require('../models/user');
const bcrypt = require('bcrypt');

/**
 * Authenticate the token and continue to the next middleware
 * @param {Request} req - The request object
 * @param {Response} res - The response object
 * @param {Function} next - The next function
 * @returns {Promise<void>}
 */
const authenticateToken = async (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({ message: 'Authentication token required' });
  }

  try {
    const user = await User.findOne({ token });

    if (!user) {
      return res.status(401).json({ message: 'Invalid or expired token' });
    }

    req.user = user;
    next();
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Error authenticating token' });
  }
};


/**
 * Generate a token for the user
 * @param {Request} req - The request object
 * @param {Response} res - The response object
 * @returns {Promise<void>}
 */
const generateToken = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: 'Email and password are required' });
  }

  try {
    const user = await User.findOne({ email });

    if (!user || user.password !== password) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    // use any secure method to generate the token
    const token = await bcrypt.hash(email + password, 10);
    // add the token to the user model
    user.token = token;
    await user.save();

    return res.status(201).json({ token: user.token });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Error generating token' });
  }
};

module.exports = {
  authenticateToken,
  generateToken,
};

