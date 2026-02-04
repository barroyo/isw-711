const mongoose = require('mongoose');

const courseSchema = new mongoose.Schema({
    name: {
        required: true,
        type: String
    },
    credits: {
        required: true,
        type: Number
    }
})

module.exports = mongoose.model('Course', courseSchema)