const mongoose = require('mongoose')

const restaurantsSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true
    },
    longitude:{
        type: String,
        required: true
    },
    latitude: {
        type: String,
        required: true
    },
    date: {
        type : Date,
        default : Date.now
    }

})

module.exports = mongoose.model('restaurants',restaurantsSchema);