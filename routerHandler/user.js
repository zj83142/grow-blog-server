const db = require('../db/index')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const { jwtSecretKey, expiresIn } = require('../config')

// 注册用户
const regUser = (req, res) => {
  const { username, password } = req.body
  const sqlStr = 'select * from user where username=?'
  db.query(sqlStr, username, (err, result) => {
    if (err) {
      return res.error(err)
    }
    if (result.length > 0) {
      return res.error('用户名被占用，请更换用户名！')
    }
    const _password = bcrypt.hashSync(password, 10)
    const saveSql = 'insert into user set ?'
    db.query(saveSql, { username, password: _password }, (err, result) => {
      if (err) {
        return res.error(err)
      }
      if (result.affectedRows === 1) {
        res.error('注册用户失败！')
      }
      res.ok({ message: '用户注册成功！' })
    })
  })
}
// 登录
const login = (req, res) => {
  const { username, password } = req.body
  const sqlStr = 'select * from user where username=?'
  db.query(sqlStr, username, (err, result, a) => {
    if (err) {
      return res.error(err)
    }
    if (result.length !== 1) {
      return res.error('登录失败')
    }
    const user = result[0]
    const compareResult = bcrypt.compareSync(password, user.password)
    if (!compareResult) {
      return res.error('密码错误')
    }
    // 注入token
    const token = jwt.sign({ ...user, password: '', avator: '' }, jwtSecretKey, { expiresIn })
    res.ok({
      message: '登录成功',
      token: `Bearer ${token}`,
      data: { ...user, password: undefined },
    })
  })
}
// 获取用户信息
const getUser = (req, res) => {
  const id = req.user?.id
  if (!id) {
    return res.error('未登录')
  }
  const sqlStr = 'select * from user where id=?;'
  db.query(sqlStr, id, (err, result) => {
    if (err) {
      return res.error(err)
    }
    if (result.length !== 1) {
      return res.error('获取用户信息失败')
    }
    res.status = 200
    res.ok({
      message: '获取用户信息成功',
      data: result[0],
    })
  })
}
// 新增用户
const addUser = (req, res) => {}
// 更新用户
const updateUser = (req, res) => {}
// 删除用户
const deleteUser = (req, res) => {}
// 获取用户列表
const getUserLs = (req, res) => {}

module.exports = {
  regUser,
  login,
  getUser,
  addUser,
  updateUser,
  deleteUser,
  getUserLs,
}
