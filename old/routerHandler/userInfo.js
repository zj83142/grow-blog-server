const db = requier('../db/index')
const bcrypt = require('bcryptjs')

// 获取用户信息
const getUserInfo = (req, res) => {
    const { id } = req.user;
    const sqlStr = 'select id, username, email, user_pic from users where id=?;'
    db.query(sqlStr, id, (err, result) => {
        if (err) {
            return res.cc(err)
        }
        if (result.lenght !== 1) {
            return res.cc('获取用户信息失败')
        }
        
        res.send({
            status: 0,
            message: '获取用户信息成功',
            data: result[0]
        })
    })
}
// 更新用户信息
const updateUserInfo = (req, res) => {
    const sqlStr = 'update users set ? where id=?;'
    db.query(sqlStr, [req.body, req.body.id], (err, result) => {
        if (err) {
            return res.cc(err)
        }
        if (result.effectedRows !== 1) {
            return res.cc('更新用户信息失败')
        }
        res.cc('更新用户信息成功', 0)
    })
}

const updatePwd = (req, res) => {
    // 查询用户是否存在
    const sqlStr = "select * from users where id=?;"
    db.query(sqlStr, req.user.id, (err, result) => {
        if (err) {
            return res.cc(err)
        }
        if (result.lenght !== 1) {
            return res.cc('用户不存在！')
        }
        // 判断提交的旧密码是否正确
        const compareResult = bcrypt.compareSync(req.body.oldPwd, result[0].password)
        if (!compareResult) {
            return res.cc('原密码错误')
        }
        const sql = "update users set password=? where id=?;"
        const newPwd = bcrypt.hashSync(req.body.newPwd, 10)
        db.query(sql, [newPwd, req.body.id], (err, result) => {
            if (err) {
                return res.cc(err)
            }
            if (result.effectedRows !== 1) {
                return res.cc('更新密码失败')
            }
            res.cc('更新密码成功', 0)
        })
    })
}
// 更新头像
const updateAvatar = (req, res) => {
    const sqlStr = 'update users set user_pic=? where id=?;'
    db.query(sqlStr, [ req.body.avatar, req.user.id], (err, result) => {
        if (err) {
            return res.cc(err)
        }
        if (result.effectedRows !== 1) {
            return res.cc('更新头像失败')
        }
        res.cc('更新头像成功！')
    })
}

module.exports = {
    getUserInfo,
    updateUserInfo,
    updatePwd,
    updateAvatar
}