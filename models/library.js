const mongoose = require ('mongoose');


const gameSchema = mongoose.Schema({
    title: {type: String, require: true},
    img: String,
    isFavorite: Boolean,
    libraryId: { type: mongoose.Schema.Types.ObjectId, ref: 'Library'}
});

const librarySchema = mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User'},
    isPublic: {type: Boolean, require: true},
    library: {type: gameSchema}
});


module.exports = mongoose.model('Library',librarySchema);