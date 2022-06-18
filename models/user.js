const {Schema, model, Types} = require('mongoose')

const schema = new Schema({
    email: { type: String, required: true },
    encryptedPassword: { type: String, required: true },
    role: { type: String, enum: ['admin', 'restricted'], required: true },
})

module.exports = model('user', schema) 