const mongoose = require ('mongoose');

const userSchema = mongoose.Schema({
    username: {type: String, require: true, index: {unique: true}},
    password: {type: String, require: true},
    steamId: String
});


module.exports = mongoose.model('User',userSchema);