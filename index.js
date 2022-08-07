const express = require('express')
const cors = require('cors')
const session = require('express-session')
const expressjwt = require('express-jwt') // 解析Token中间件
const { jwtSecretKey } = require('./config')
// const history = require('connect-history-api-fallback')

const bodyParser = require('body-parser')
var url = require('url')

const userRouter = require('./router/user')
const blogRouter = require('./router/blog')

const app = express()

app.use(express.static('./static'))

// 接口跨域
app.use(cors())
app.disable('etag')
app.use(express.urlencoded({ extended: false }))
// app.use(history)

app.use(function (req, res, next) {
  const query = url.parse(req.url, true).query
  req.query = query
  res.error = function (err) {
    res.send({
      status: 0,
      message: err instanceof Error ? err.message : err,
    })
  }
  res.ok = function (data) {
    res.send({
      status: 1,
      ...data,
    })
  }
  next()
})
app.use(
  session({
    secret: 'grow-manager',
    resave: false,
    saveUninitialized: true,
  })
)

app.use(expressjwt({ secret: jwtSecretKey }).unless({ path: [/^\/api\/login/] }))

app.use(
  bodyParser.urlencoded({
    extended: true,
  })
)
app.use(bodyParser.json())

app.use('/api', userRouter)
app.use('/api', blogRouter)

app.use((err, req, res, next) => {
  if (err.name === 'UnauthorizedError') return res.error('身份认证失败！')
  res.error = function (err) {
    res.send({
      status: 0,
      message: err instanceof Error ? err.message : err,
    })
  }
  next()
})

app.listen(8085, (err) => {
  if (err) {
    return err
  }
  console.log('server running at http://127.0.0.1:8085')
})
