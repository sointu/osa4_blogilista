const config = require('./utils/config')
const express = require('express')
const bodyParser = require('body-parser')

const app = express()
const cors = require('cors')
const mongoose = require('mongoose')
const blogsRouter = require('./controllers/blogs')

console.log('connecting to ', config.MONGODB_URI)

mongoose.connect(config.MONGODB_URI, { useNewUrlParser: true })
    .then(()=>{
        console.log('connected to mongodb')
    })
    .catch(error => console.log(error.message))

app.use(cors())
app.use(bodyParser.json())
app.use('/api/blogs',blogsRouter)

module.exports = app