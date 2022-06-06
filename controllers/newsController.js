'use strict'


exports.news = (req,res) =>{
    const data = {
        "status": 200,
        "values": 'Hello its first news'
    }
    res.json(data)
    res.end()
}