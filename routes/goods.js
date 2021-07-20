const {Router} = require('express')


const isAuth = require('../middleware/isAuth')


const goodController = require('../controller/goods')


const router = Router()


router.post('/add', isAuth, goodController.addGood)
router.get('/', isAuth, goodController.getAllGoods)
router.delete('/delete/:goodId', isAuth, goodController.deleteGood)


module.exports = router
