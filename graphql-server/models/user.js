const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: false
    }
});
const Model = mongoose.model('User', userSchema);
module.exports = Model;
