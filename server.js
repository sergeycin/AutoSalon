const express = require('express')
const config = require('config')

const mongose = require('mongoose')
const app = express()

const PORT = config.get('port') || 8000

const routes = require('./routes/routes')
routes(app)

const adminRouter = require('./routes/admin.routes')
app.use('/admin',adminRouter)
app.use('/uploads', express.static('uploads'));


async function start(){
    try{
 const mongoDb =  await mongose.connect(config.get('mongoUrl'),{
        useNewUrlParser: true, useUnifiedTopology: true
       })
       app.listen(PORT, () => console.log(`Started ${PORT}`))
    }catch(e){
        console.log('Server Error', e.message)
        process.exit(1)
    }
}

start()