const express = require('express')
const config = require('config')
const mongose = require('mongoose')
const app = express()

const PORT = config.get('port') || 5000

// app.listen(PORT, () =>{
//     console.log(`App listent ${PORT}`)
// })
const routes = require('./routes/routes')
routes(app)

async function start(){
    try{
       await mongose.connect(config.get('mongoUrl'),{
        useNewUrlParser: true, useUnifiedTopology: true
       })
       app.listen(PORT, () => console.log(`Started ${PORT}`))
    }catch(e){
        console.log('Server Error', e.message)
        process.exit(1)
    }
}

start()