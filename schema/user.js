const joi = require('joi')

const username = joi.string().alphanum().min(1).max(10).required()
const password = joi.string().alphanum().required()
// const password = joi.string().pattern(/^[\S]{c, 12}$/).required()

const id = joi.number().integer().min(1).required()
const nickname = joi.string().required()
const email = joi.string().email().required()

const avatar = joi.string().dataUri().required()

const regLoginSchema = {
  body: {
    username,
    password,
  },
}

const updateUserInfoSchema = {
  boay: {
    id,
    nickname,
    email,
  },
}
// joi.ref('oldPwd') 表示和oldPwd保持一致，前面加了not表示不能一致
const updatePwdSchema = {
  body: {
    oldPwd: password,
    newPwd: joi.not(joi.ref('oldPwd')).concat(password),
  },
}
const updateAvatarSchema = {
  body: {
    avatar,
  },
}
module.exports = {
  regLoginSchema,
  updateUserInfoSchema,
  updatePwdSchema,
  updateAvatarSchema,
}
