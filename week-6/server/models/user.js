const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        trim: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    password: {
        type: String,
        required: true
    },
    token: {
        type: String,
        required: false
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('User', userSchema);

