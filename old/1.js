// -------------------------- fs 和 path ------------------------
// const fs = require('fs');
// const path = require('path');
// console.log(path.basename('./files/1.txt'))
// fs.readFile(path.join(__dirname, './files/1.txt'), 'utf8', function(err, res) {
//     if (err) {
//         return console.log('文件读取失败');
//     }
//     console.log('读取结果：', res);
//     writeResult(res)
// })
// function writeResult(str) {
//     fs.writeFile(path.join(__dirname, './files/result.txt'), str.replaceAll(' ', '\r\n').replaceAll('=', ': '), function(err) {
//         if(err) {
//             return console.log('文件写入失败');
//         }
//         console.log('文件写入成功！');
//     })
// }
// -------------------------- http ------------------------
// const http = require('http')
// const fs = require('fs')
// const path = require('path')

// const server = http.createServer()
// server.on('request', function(req, res) {
//     // res.setHeader('Content-Type', 'text/html;charset=utf-8')
//     const { url } = req;
//     let fpath = ''
//     if (url === '/') {
//         fpath = path.join(__dirname, '/fsAndPathTest', '/index.html')
//     } else {
//         fpath = path.join(__dirname, '/fsAndPathTest', url);
//     }
//     fs.readFile(fpath, 'utf8', function (err, dataStr) {
//         if (err) {
//             return res.end('404 Not Found!')
//         }
//         res.end(dataStr)
//     })
// })
// server.listen(80, function() {
//     console.log('server running at http://127.0.0.1/')
// })

// const test = require('./test')
// console.log(test, '-------')

// const timeUtls = require('./dateUtils/index')
const dt = new Date()

// const newDt = timeUtls.dateFormat(dt)
// console.log(newDt)

const moment = require('moment');
console.log(moment(dt).format('YYYY-MM-DD HH:mm:ss'))