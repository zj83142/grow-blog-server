const express = require('express')

const { getByCategory, saveBlog, getBlogById, deleteBlog } = require('../routerHandler/blog')

const router = express.Router()

router.get('/blog/getByCategory', getByCategory)
router.get('/blog/getById', getBlogById)
router.post('/blog/save', saveBlog)
router.post('/blog/delete', deleteBlog)

module.exports = router
