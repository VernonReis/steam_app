const mongoose = require ('mongoose');


const gameSchema = mongoose.Schema({
    title: {type: String, require: true},
    img: String,
    isFavorite: Boolean,
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User'}
});



module.exports = mongoose.model('Library',gameSchema);