'use strict'

module.exports = (app) =>{
    const newsController = require('./../controllers/newsController')
  

    app.route('/news').get(newsController.news)

}