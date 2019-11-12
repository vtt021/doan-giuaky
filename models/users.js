var mongoose = require('mongoose')

var UserSchema = new mongoose.Schema({
    name: String,
    price: Number
});

module.exports = mongoose.model('Mặt hàng', UserSchema);