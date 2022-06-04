'use strict'

module.exports = (app) =>{
    const newsController = require('./../controllers/newsController')
  

    app.route('/').get(newsController.news)

}