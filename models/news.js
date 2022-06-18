const {Schema, model, Types} = require('mongoose')

const schema = new Schema({
    en:{
        name:{type: String, required:true, unique:true},
        description: {type: String, required: true},
        
    },
    ru:{
        name:{type: String, required:true, unique:true},
        description: {type: String, required: true},
    },
    image: {type: String, required: true},
})

module.exports = model('news', schema) 