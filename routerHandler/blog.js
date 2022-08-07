const db = require('../db/index')

const getByCategory = (req, res) => {
  const { id: u_id } = req.user
  const { category } = req.query
  const sqlStr = 'select * from blogs where u_id=? and category=?;'
  db.query(sqlStr, [u_id, category], (err, result) => {
    if (err) {
      return res.error(err)
    }
    res.ok({
      message: '获取列表成功',
      data: result,
    })
  })
}

const getBlogById = (req, res) => {
  const { id: u_id } = req.user
  const { id } = req.query
  const sqlStr = 'select blogs.*, user.username from blogs right join user on blogs.u_id=user.id where blogs.id=? and blogs.u_id=?;'
  db.query(sqlStr, [id, u_id], (err, result) => {
    if (err) {
      return res.error(err)
    }
    if (result.length === 0) {
      return res.error('没有查询到数据！')
    }
    res.ok({
      message: '获取数据成功',
      data: result[0],
    })
  })
}

const saveBlog = (req, res) => {
  const u_id = req.user?.id
  if (!u_id) {
    return res.error('未登录')
  }
  const { id, title, content, descript, category } = req.body
  let sqlStr = ''
  if (id) {
    sqlStr = 'update blogs set ? where id=?;'
  } else {
    sqlStr = 'insert into blogs set ?;'
  }
  const updateTime = new Date()
  const keyword = 'css'
  const actionName = id ? '更新' : '新增'
  const info = { title, descript, content, u_id, keyword, updateTime, category }
  const value = id ? [info, id] : info
  db.query(sqlStr, value, (err, result) => {
    if (err) {
      return res.error(err)
    }
    if (result.affectedRows !== 1) {
      return res.error(`${actionName}数据失败！`)
    }
    return res.ok({ message: `${actionName}数据成功！`, data: id ? id : result.insertId })
  })
}

const deleteBlog = (req, res) => {
  const u_id = req.user?.id
  if (!u_id) {
    return res.error('未登录')
  }
  const { id } = req.body
  const sqlStr = 'delete from blogs where u_id=? and id=?;'
  db.query(sqlStr, [u_id, id], (err, result) => {
    if (err) {
      return res.error(err)
    }
    if (result.affectedRows !== 1) {
      return res.error('数据删除失败！')
    }
    res.ok({
      message: '数据删除成功',
    })
  })
}

module.exports = {
  saveBlog,
  getByCategory,
  getBlogById,
  deleteBlog,
}
