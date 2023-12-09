const mongoose = require('mongoose');
const Phongban = require('./phongbans')

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        min: 6,
        max: 255
    },
    email: {
        type: String,
        required: true,
        min: 6,
        max: 225
    },
    password: {
        type: String,
        required: true,
        min: 6,
        max: 255
    },
    role: {
        type: String,
        enum: ["user", "admin"],
        required: [true, "Please specify user role"],
        min: 6,
        max: 255
    },
    phongban: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Phongban'
    },
});

module.exports = mongoose.model('User', userSchema);