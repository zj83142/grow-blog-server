const express = require('express')
const expressJoi = require('@escook/express-joi')
const { updateUserInfoSchema, updatePwdSchema } = require('../schema/user')
const { getUserInfo, updateUserInfo, updatePwd, updateAvatar } = require('../routerHandler/userInfo')

const router = express.Router()

router.get('/userinfo', getUserInfo)

router.post('/updateUserInfo', expressJoi(updateUserInfoSchema), updateUserInfo)

router.post('/updatePwd', expressJoi(updatePwdSchema), updatePwd)

router.post('/update/avatar', expressJoi(updateAvatarSchema), updateAvatar)

module.exports = router