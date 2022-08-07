const express = require('express')
const expressJoi = require('@escook/express-joi')
const userHandler = require('../routerHandler/user')
const { regLoginSchema } = require('../schema/user')
const router = express.Router()

router.post('/regUser', expressJoi(regLoginSchema), userHandler.regUser)
router.post('/login', expressJoi(regLoginSchema), userHandler.login)
router.get('/getUser', userHandler.getUser)

module.exports = router
