const express = require('express')
const routers = require('./routers');
const cors = require('cors')
const session = require('express-session')

// const bodyParser = require('./mvs/bodyParser')
const app = express()

app.use(express.static('./files'))

// 接口跨域
app.use(cors())
// 解析表单数据的中间件
// app.use(bodyParser)
app.use(express.urlencoded({ extended: false }))

app.use(session({
    secret: 'zjblog',
    resave: false,
    saveUninitialized: true
}))

app.get('/api/jsonp', (req, res) => {
    console.log(req.query)
    const funcName = req.query.callback
    const data = { name: '小灰', age: 8, ...req.query }
    const srciptStr = `${funcName}(${JSON.stringify(data)})`
    res.send(srciptStr)
})

app.use('/api', routers)
app.use(function(err, req, res, next) {
    console.log('-----错误级别中间件-------')
    res.send('----服务器报错了-----')
    if (err.name === 'UnauthorizedError') {
        return res.send({ status: 401, message: '无效token'})
    }
     res.send({ status: 500, message: '未知错误'})
})

app.listen(8081, () => {
    console.log('server runnint at http://127.0.0.1:8081')
})


