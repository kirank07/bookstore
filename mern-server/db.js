const mongoose = require("mongoose")

mongoose.connect("mongodb://127.0.0.1:27017/bookstore")

mongoose.connection.on('connected',()=>{console.log('Connected to mongo DB')})

mongoose.connection.on('error',(err)=>{console.log('Connection error:',+err)})

module.exports = mongoose