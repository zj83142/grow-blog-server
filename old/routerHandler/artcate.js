const db = requier('../db/index')
// 获取文章分类
const getCateLs = (req, res) => {
    const sqlStr = "select * from article_cate where is_delete=0 order by asc;"
    db.query(sqlStr, (err, result) => {
        if (err) {
            return res.cc(err)
        }
        res.send({
            status: 0,
            message: '获取文章分类数据成功',
            data: result
        })
    })
}
const addCate = (req, res) => {
    const sqlStr = "select * frome article_cate where name=? or alias=?;"
    const { name, alias } = req.body
    db.query(sqlStr, [name, alias], (err, result) => {
        if (err) {
            return res.cc(err)
        }
        if (result.length === 2) {
            return res.cc('分类名称与别名被占用，请更改后重试')
        } else if (result.length === 1) {
            const {name: oldName , alias: oldAlias } = result[0]
            if (name === oldName && alias === oldAlias) {
                return res.cc('分类名称与别名被占用，请更改后重试')
            }
            if (name === oldName && alias !== oldAlias) {
                return res.cc('分类名称被占用，请更改后重试')
            }
            if (name !== oldName && alias === oldAlias) {
                return res.cc('分类别名被占用，请更改后重试')
            }
        }
        const sql = "insert into article_cate set ?;"
        db.query(sql, req.body, (err, result) => {
            if (err) {
                return res.cc(err)
            }
            if (result.effectedRows !== 1) {
                return res.cc('新增文章分类失败！')
            }
            res.cc('新增文章分类成功')
        })
    })
}
const deleteCate = (req, res) => {
    const sqlStr = 'update article_cate set id_delete=1 where id=?;'
    db.query(sqlStr, req.params.id, (err, result) => {
        if (err) {
            return res.cc(err)
        }
        if (result.effectedRows !== 1) {
            return res.cc('删除文章分类失败！')
        }
        res.cc('删除文章分类成功')
    })
}
const getCateById = (req, res) => {
    const sqlStr = "select * from article_cate whre id=? and is_delete=0;"
    db.query(sqlStr, req.params.id, (err, result) => {
        if (err) {
            return res.cc(err)
        }
        if (result.length !== 1) {
            return res.cc('获取文章分类失败')
        }
        res.send({
            status: 0,
            message: '获取文章分类成功',
            data: result[0]
        })
    })
}

const updateCate = (req, res) => {
    const sqlStr = "select * frome article_cate where id!=? and (name=? or alias=?);"
    const { id, name, alias } = req.body
    db.query(sqlStr, [name, alias], (err, result) => {
        if (err) {
            return res.cc(err)
        }
        if (result.length === 2) {
            return res.cc('分类名称与别名被占用，请更改后重试')
        } else if (result.length === 1) {
            const {name: oldName , alias: oldAlias } = result[0]
            if (name === oldName && alias === oldAlias) {
                return res.cc('分类名称与别名被占用，请更改后重试')
            }
            if (name === oldName && alias !== oldAlias) {
                return res.cc('分类名称被占用，请更改后重试')
            }
            if (name !== oldName && alias === oldAlias) {
                return res.cc('分类别名被占用，请更改后重试')
            }
        }
        const sql = "update article_cate set name=?, alias=? where id=?;"
        db.query(sql, [name, alias, id], (err, result) => {
            if (err) {
                return res.cc(err)
            }
            if (result.effectedRows !== 1) {
                return res.cc('更新文章分类失败！')
            }
            res.cc('更新文章分类成功')
        })
    })
}
module.exports = {
    getCateLs,
    addCate,
    deleteCate,
    getCateById,
    updateCate
}