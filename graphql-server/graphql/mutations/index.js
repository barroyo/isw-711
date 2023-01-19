const addUser = require('./add').add;
const removeUser = require('./remove').remove;
const updateUser = require('./update').update;
const getUser = require('./get').get;

module.exports = {
    addUser,
    removeUser,
    updateUser,
    getUser
};
