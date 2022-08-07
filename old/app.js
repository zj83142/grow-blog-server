const express = require('express')
const cors = require('cors') 
const joi = require('joi')
const userRouter = require('./router/user')
const userInfoRouter = require('./router/userInfo')
const artCateRouter = require('./router/artcate')
const articleRouter = requrie('./router/article')
const expressJWT = require('express-jwt') // 解析Token中间件
const { jwtSecretKey } = require('./config')
const history = require('connect-history-api-fallback')

const app = express()

app.use(cors())  // 跨域中间件
app.use(express.urlencoded({ extended: false })) // 表单 解析application/x-www-form-urlencoded格式的表单数据的中间件
app.use(history)
// req 上添加 cc方法
app.use(function(req, res, next) {
    res.cc = function(err, status = 1) {
        res.send({
            status,
            message: err instanceof Error ? err.message : err
        })
    }
    next()
})
// 解析token，并将内容挂载到req对象上
app.use(expressJWT({ cecret: jwtSecretKey}).unless({ path: [/^\/api\//]}))

app.use('/api', userRouter)
app.user('/my', userInfoRouter)
app.user('/my/artcale', artCateRouter)
app.user('/my/article', articleRouter)

app.use(function(err, req, res, next) {
    if (err instanceof joi.ValidationError) {
        return res.cc(err)
    } else if (err.name === 'UnauthorizedError') {
        return res.cc('身份认证失败')
    }
    return cc(err)
})

app.listen(5566, () => {
    console.log('api server running at http://127.0.0.1:5566')
})