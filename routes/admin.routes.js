const AdminBro = require('admin-bro')
const AdminBroExpress = require('admin-bro-expressjs')
const AdminBroMongoose = require('admin-bro-mongoose')
const uploadFeature = require('@adminjs/upload')
const News = require('../models/news')
const User = require('../models/user')
const mongoose = require('mongoose')
const bcrypt = require('bcrypt') 
AdminBro.registerAdapter(AdminBroMongoose)

const pageResourceOptions = {
  options: {
    listProperties: ['fileUrl', 'mimeType'],
    },
    features: [uploadFeature({
      provider: { local: { bucket: 'public' } },
      properties: {
        // virtual properties, created by this plugin on the go. They are not stored in the database
        // this is where frontend will send info to the backend
        file: `uploadedFile.file`,
        // here is where backend will send path to the file to the frontend [virtual property]
        filePath: `uploadedFile.file`,
        // here backend will send information which files has to be deleted
        // It is required only in `multiple` mode, but cannot overlap any other property
        filesToDelete: `uploadedFile.filesToDelete`,
    // DB properties: have to be in your schema
    // where bucket key will be stored
    key: `uploadedFile.key`,
    // where mime type will be stored
    mimeType: `uploadedFile.mime`,
    // where bucket name will be stored
    bucket: `uploadedFile.bucket`,
    // where size will be stored
    size: `uploadedFile.size`,
    
    },
    // properties: {
    // key: 'fileUrl', // to this db field feature will safe S3 key
    // mimeType: 'mimeType' // this property is important because allows to have previews
    // },
    // validation: {
    // mimeTypes: 'application/pdf'
    // }
    })]
}



const optionUserAdd = {
  options: {
    properties: {
      encryptedPassword: {
        isVisible: false,
      },
      password: {
        type: 'string',
        isVisible: {
          list: false, edit: true, filter: false, show: false,
        },
      },
    },
    actions: {
      new: {
        before: async (request) => {
          if(request.payload.password) {
            request.payload = {
              ...request.payload,
              encryptedPassword: await bcrypt.hash(request.payload.password, 10),
              password: undefined,
            }
          }
          return request
        },
      }
    }
  }
}


const adminBro = new AdminBro({
  resources: [
    {resource:News,pageResourceOptions},
   User

],
  rootPath: '/admin',
})

const ADMIN = {
  email: process.env.ADMIN_EMAIL || 'admin@lexus.com',
  password: process.env.ADMIN_PASSWORD || 'admin222'

}

const router = AdminBroExpress.buildAuthenticatedRouter(adminBro,{
  cookieName: process.env.ADMIN_COOKIE_NAME || 'admin',
  cookiePassword: process.env.ADMIN_COOKIE_PASS || 'admin222',
  authenticate: async (email, password) => {
    const user = await User.findOne({ email })
    if (user) {
      const matched = await bcrypt.compare(password, user.encryptedPassword)
      if (matched) {
        return user
      }
    }
    if(email === ADMIN.email && password === ADMIN.password){
      return ADMIN
    }
    return false
  },
  cookiePassword: 'some-secret-password-used-to-secure-cookie',
  // authenticate: async(email,password) =>{
  //   if(email === ADMIN.email && password === ADMIN.password){
  //     return ADMIN
  //   }
  //   return null
  // }
})

module.exports = router
