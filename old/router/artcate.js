const express = require('express')
const expressJoi = require('@escook/express-joi')
const { getCateLs, addCate, deleteCate, getCateById, updateCate } = require('../routerHandler/artcate')
const { addCateSchema, deleteCateSchema, getCateSchema, updateCateSchema } = require('../schema/artcate')

const router = express.Router()

router.get('/cateLs', getCateLs)

router.post('/addCate', expressJoi(addCateSchema), addCate)

router.get('/delete/:id', expressJoi(deleteCateSchema), deleteCate)

router.get('/cates/:id', expressJoi(getCateSchema), getCateById)

router.post('/updateCate', expressJoi(updateCateSchema), updateCate)

module.exports = router