const joi = require('joi')

const id = joi.number().integer().min(1).required()
const name = joi.string().required()
const alias = joi.string().alphanum().required()

const addCateSchema = {
    body: {
        name,
        alias
    }
}

const deleteCateSchema = {
    params: {
        id
    }
}
const getCateSchema = {
    params: {
        id
    }
}
const updateCateSchema = {
    body: {
        id,
        name,
        alias
    }
}

module.exports = {
    addCateSchema,
    deleteCateSchema,
    getCateSchema,
    updateCateSchema
}