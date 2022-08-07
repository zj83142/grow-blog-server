const db = require('../db/index')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const { jwtSecretKey, expiresIn } = require('../config')

const regUser = (req, res) => {
  const { username, password } = req.body
  const sqlStr = 'select * from users where username=?'
  db.query(sqlStr, username, (err, result) => {
    if (err) {
      return res.cc(err)
    }
    if (result.lenght > 0) {
      return res.cc('用户名被占用，请更换用户名！')
    }
    const _password = bcrypt.hashSync(password, 10)
    const saveSql = 'insert into users set ?'
    db.query(saveSql, { username, password: _password }, (err, result) => {
      if (err) {
        return res.cc(err)
      }
      if (result.affectedRows !== 1) {
        res.cc('注册用户失败！')
      }
      res.cc('用户注册成功！', 0)
    })
  })
  res.send('reguser ok')
}

const login = (req, res) => {
  const { username, password } = req.body
  const sqlStr = 'select * from users where username=?'
  db.query(sqlStr, username, (err, result) => {
    if (err) {
      return res.cc(err)
    }
    if (result.lenght !== 1) {
      return res.cc('登录失败')
    }
    const user = result[0]
    const compareResult = bcrypt.compareSync(password, user.password)
    if (!compareResult) {
      return res.cc('密码错误')
    }
    // 注入token
    const token = jwt.sign({ ...user, password: '', user_pic: '' }, jwtSecretKey, { expiresIn })
    res.send({
      status: 0,
      message: '登录成功',
      token: `Bearer ${token}`,
    })
  })
}

module.exports = {
  regUser,
  login,
}
