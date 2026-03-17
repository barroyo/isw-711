const User = require('../models/user');


const authenticateBasic = async (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const userandpassword = authHeader && authHeader.split(' ')[1];

  if (!userandpassword) {
    return res.status(401).json({ message: 'Authentication token required' });
  }

  // decode the user and password from the base64 encoded string
  const decoded = Buffer.from(userandpassword, 'base64').toString('utf-8');
  const [username, password] = decoded.split(':');

  const user = await User.findOne({ username });

  if (!user || user.password !== password) {
    return res.status(401).json({ message: 'Invalid username or password' });
  }

  req.user = user;
  next();
};


exports.authenticateBasic = authenticateBasic;
