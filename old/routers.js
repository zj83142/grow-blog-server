const express = require('express')
const mysql = require('mysql')
const router = express.Router()
const jwt = require('jsonwebtoken')
const expressJWT = require('express-jwt')
const secretKey = 'zjblog !>_<!' // 越复杂越好

router.use(function(req, res, next) {
    console.log('----路由中间件----')
    next()
})
router.post('/login1', (req, res) => {
    const { username, password } = res.body;
    if (username !== 'admin' || password !== '00000000') {
        return res.send({ status: 1, msg: '登录失败'})
    }
    req.session.user = res.body
    req.session.isLogin = true
    res.send({ status: 0, msg: '登录成功！'})
})
router.post('/login2', (req, res) => {
    const { username, password } = res.body;
    if (username !== 'admin' || password !== '00000000') {
        return res.send({ status: 1, msg: '登录失败'})
    }
    res.send({ 
        status: 0, 
        msg: '登录成功！',
        token: jwt.sign({ username }, secretKey, { expiresIn: '30s'})
    })
})

router.get('/getUser', function(req, res) {
    const query = req.query;
    const params = req.params
    const db = mysql.createPool({
        host: '127.0.0.1',
        user: 'root',
        password: 'admin132',
        database: 'myblog'
    })
    db.query('select * from users', (err, results) => {
        if (err) {
            res.send('数据查询失败！')
        }
        console.log(results)
        res.send({userName: '小黑', userId: '1', age: 18, ...query, ...params})
    })
})
router.put('/getUser', function(req, res) {
    const query = req.query;
    const params = req.params
    res.send({userName: '小黑', userId: '12', age: 18, ...query, ...params})
})
router.get('/getUser/:id', function(req, res) {
    const query = req.query;
    const params = req.params
    res.send({userName: '小黑', userId: '1', age: 18, ...query, ...params})
})
router.post('/getUserLs', function(req, res) {
    throw new Error('------手动跑出错误-------')
    res.send('请求成功！路由模块化，更新了呀！')
})
router.post('/updateUser', function(req, res) {
    const {userName, userPwd, userId } = req.body;
    console.log('==updateUser===>', req.body)
    const sqlStr = 'update users set u_name=?, u_pwd=? where u_id=3;'
    const db = mysql.createPool({
        host: '127.0.0.1',
        user: 'root',
        password: 'admin132',
        database: 'myblog'
    })
    db.query(sqlStr, [userName, userPwd], (err, result) => {
        console.log('----------------', err, result)
        if (err) {
            res.send('数据保存失败！', err.message)
        }
        if(result.affectedRows === 1) {
            console.log('保存结果：', result)
            res.send('数据保存成功！')
        }
    })
})
router.post('/addUser', function(req, res) {
    const {userName, userPwd } = req.body;
    const sqlStr = 'insert into users (u_name, u_pwd) values (?, ?);'
    const db = mysql.createPool({
        host: '127.0.0.1',
        user: 'root',
        password: 'admin132',
        database: 'myblog'
    })
    db.query(sqlStr, [userName, userPwd], (err, result) => {
        if (err) {
            res.send('数据保存失败！', err.message)
        }
        if(result.affectedRows === 1) {
            console.log('保存结果：', result)
            res.send('数据保存成功！')
        }
    })
    // res.send('数据保存成功！')
})

module.exports = router