const Task = require("../models/taskModel");

const saveSession = function (username) {
  const token = crypto.createHash('md5').update(username).digest("hex")
  // insert token to the session table
  const session = new Session();
  session.token = token;
  session.user = username;
  session.expire = new Date();
  session.save(function (err) {
    if (err) {
      console.log('error while saving the session', err)
      return {
        error: 'There was an error saving the session'
      };
    }
    return session;
  });
};

module.exports = {
  saveSession,
}