const express = require('express')
const expressJoi = require('@escook/express-joi')
const userHandler = require('../routerHandler/user')
const { regLoginSchema } = require('../schema/user')
const router = express.Router()

router.post('/reguser', expressJoi(regLoginSchema), userHandler.regUser)
router.post('/login', expressJoi(regLoginSchema), userHandler.login)

module.exports = router