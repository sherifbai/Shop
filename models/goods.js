const {Schema, model} = require('mongoose')

const goodSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    imgUrl: {
        type: String,
        required: true
    }
})

module.exports = model('Good', goodSchema)
