const User = require('../models/user')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

exports.addUser = async (req, res, next) => {
    const username = req.body.username
    const password = req.body.password

    try {
        const hashedPw = await bcrypt.hash(password, 12)

        const user = new User({
            username: username,
            password: hashedPw
        })

        const result = await user.save()
        
        res.status(201).json({
            success: true,
            userId: result._id
        })

    } catch (error) {
        if (!error.statusCode) {
            error.statusCode = 500
        }
        next(error)
    }
}

exports.login = async (req, res, next) => {
    const username = req.body.username
    const password = req.body.password

    try {
        const user = await User.findOne({username: username})

        if (!user) {
            const error = new Error('User not found')
            error.statusCode = 404
            throw error
        }

        const isEqual = await bcrypt.compare(password, user.password)

        if (!isEqual) {
            const error = new Error('Password does not match')
            error.statusCode = 401
            throw error
        }

        const token = jwt.sign(
            {
                username: user.username,
                userId: user._id.toString()
            },
            "Sherif'sSecretKey",
            {expiresIn: '24h'}
        )

        res.status(200).json({
            success: true,
            token: token,
            username: username
        })

    } catch (error) {
        if (!error.statusCode) {
            error.statusCode = 500
        }
        next(error)
    }
}
