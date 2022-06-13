'use strict'
const News = require('../models/news')

exports.news = async (req,res) =>{
    const news = await News.find()
    const data = {
        "status": 200,
        "values": news
    }
    try{
        res.status(200).json(news)
        res.end()
    }
    catch{
        res.status(500).json('Ошибка')
    }

    
    
}