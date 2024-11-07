const mongoose = require('mongoose');

const contactSchema = new mongoose.Schema({
    firstname: String,
    lastname: String,
    email: {type: String, required: true, unique: true},
    phone: String,
}, {timestamps: true})

module.exports = mongoose.model('Contact', contactSchema);