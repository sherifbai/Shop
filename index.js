const express = require('express')
const mongoose = require('mongoose')


const bodyParser = require('body-parser')
const multer = require('multer')


const authRouter = require('./routes/auth')
const goodsRouter = require('./routes/goods')


const connection = require('./database/connection')


const app = express()


const fileStorage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'images')
    },
    filename: (req, file, cb) => {
        cb(null, new Date().toISOString().replace(/:/g, '-') + '-' + file.originalname)
    }
})


const fileFilter = (req, file, cb) => {
    if (file.mimetype === 'image/png' || file.mimetype === 'image/jpg' || file.mimetype === 'image/jpeg') {
        cb(null, true)
    } else {
        cb(null, false)
    }
}


const url = "mongodb+srv://Sherif:rAzCmDang1ZCsYnc@cluster0.qwr9u.mongodb.net/shop_restapi?retryWrites=true&w=majority"


app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(multer({storage: fileStorage, fileFilter: fileFilter}).single('image'))
app.use('/images', express.static('images'))


app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'OPTIONS, GET, POST, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    next();
});


app.use('/api/auth', authRouter)
app.use('/api/goods', goodsRouter)


app.use(function (error, req, res, next) {
    const status = error.statusCode || 500;
    const message = error.message;
    const data = error.data;
    res.status(status).json({ message: message, data: data, status: status });
});

connection.connect(app, url)
