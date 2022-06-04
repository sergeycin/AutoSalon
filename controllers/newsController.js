'use strict'


// const response = require('./../response')


exports.news = (req,res) =>{
    const data = {
        "status": 200,
        "values": 'Hello its first news'
    }
    res.json(data)
    res.end()
}