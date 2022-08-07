const qs = require('querystring')
const bodyParser = function(req, res, next) {
    let str = ''
    req.on('data', chunck => {
        str += chunck
    })
    req.on('end', () => {
        console.log('result: ', str)
        const body = qs.parse(str);
        req.body = body
        next()
    })
}

module.exports = bodyParser