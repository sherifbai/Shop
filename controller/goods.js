const Good = require('../models/goods')


exports.getAllGoods = async (req, res, next) => {
    try {
        const goods = await Good.find()

        res.status(200).json({
            success: true,
            data: goods
        })
    } catch (error) {
        if (!error.statusCode) {
            error.statusCode = 500
        }
        next(error)
    }
}


exports.addGood = async (req, res, next) => {
    if (!req.file) {
        const error = new Error('File failed')
        error.statusCode = 422
        throw error
    }

    const title = req.body.title
    const price = req.body.price
    const imgUrl = req.file.path.replace(/\\/g, "/")

    try {
        const good = new Good({
            title: title,
            price: price,
            imgUrl: imgUrl
        })
    
        const result = await good.save()

        res.status(201).json({
            success: true,
            data: result
        })
    } catch (error) {
        if (!error.statusCode) {
            error.statusCode = 500
        }
        next(error)
    }
}

exports.deleteGood = async (req, res, next) => {
    const goodId = req.params.goodId

    try {
        const good = await Good.findById(goodId)

        if (!good) {
            const error = new Error('Goods does not found')
            error.statusCode = 404
            throw error
        }

        await Good.findByIdAndRemove(goodId)

        res.status(200).json({
            success: true,
            data: null
        })
    } catch (error) {
        if (!error.statusCode) {
            error.statusCode = 500
        }
        next(error)
    }
}
