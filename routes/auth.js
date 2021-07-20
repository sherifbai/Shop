const { Router } = require('express')


const authController = require('../controller/auth')


const router = Router()

router.post('/signup', authController.addUser)
router.post('/login', authController.login)

module.exports = router
