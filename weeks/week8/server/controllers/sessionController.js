const Session = require("../models/sessionsModel");

const crypto = require("crypto");

/**
 * Creates a new session for the user
 *
 * @param {*} username
 */
const saveSession = function (username) {
  const token = crypto.createHash('md5').update(username).digest("hex")
  // insert token to the session table
  let session = new Session();
  session.token = token;
  session.user = username;
  session.expire = new Date();
  session = session.save();
  console.log('session', session);
  return token;
};

/**
 * Delete session
 *
 * @param {*} token
 */
const destroySession = function (token) {
  console.log('token:', token);
  Session.deleteOne({ token: token }, function (err) {
    if (err) {
      console.log('error', err);
    }
    return true;
  });
};

module.exports = {
  saveSession,
  destroySession
}