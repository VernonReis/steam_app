const mongoose = require ('mongoose');


const gameSchema = mongoose.Schema({
    title: {type: String, require: true},
    img: String,
    rating: {type: Number, require: true},
    description: {type: String},
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User'}
});



module.exports = mongoose.model('Library',gameSchema);