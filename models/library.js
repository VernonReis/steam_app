const mongoose = require ('mongoose');


const gameSchema = mongoose.Schema({

});

const librarySchema = mongoose.Schema({
    username: {type: String, require: true},
    password: {type: String, require: true},
    library: {type: gameSchema}
});


module.exports = mongoose.model('User',userSchema);