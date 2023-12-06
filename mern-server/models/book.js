const mongoose = require('mongoose')

const bookSchema = new mongoose.Schema({
    book_name:{
        type:String,
        required:false
    },
    book_author:{
        type:String,
        required:false
    },
    book_price:{
        type:Number,
        required:false
    },
    book_publish_date:{
        type:Date,
        required:false
    },
    book_status:{
        type:String,
        enum:['enable','disable'],
        default:'enable'
    }
})

module.exports = mongoose.model('bs_books',bookSchema)