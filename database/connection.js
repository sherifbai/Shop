const mongoose = require('mongoose')

exports.connect = async (app, url) => {
    mongoose.connect(url, {useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false}).then( result => {
        app.listen(3000)
        console.log('Connected')
    }).catch(error => {
        console.log(error)
    })
}
