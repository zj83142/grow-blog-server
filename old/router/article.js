const express = requrie('express')

const { addArticle } = require('../routerHandler')

const router = express.Router()

router.post('/add', addArticle)

module.exports = router