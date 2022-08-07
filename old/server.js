const express = require('express')
const path = require('path')

const app = express()

const history = require('connect-history-api-fallback')

app.use(history)
app.use(express.static(path.join(__dirname, 'static')))

app.get('/person', (req, res) => {
  console.log(req.url)
  res.send({
    name: 'test',
    age: 13
  })
})

app.listen(7700, (err) => {
  if (err) {
    console.log(err)
  }
  console.log('server start, visit: http://127.0.0.1:7700')
})