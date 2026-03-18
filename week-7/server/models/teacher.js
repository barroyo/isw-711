const mongoose = require('mongoose');

const teacherSchema = new mongoose.Schema({
    first_name: {
        required: true,
        type: String
    },
    last_name: {
        required: true,
        type: String
    },
    age: {
        required: true,
        type: Number
    },
    email: {
        required: true,
        type: String
    }
})

module.exports = mongoose.model('Teacher', teacherSchema)