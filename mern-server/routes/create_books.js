const express = require('express');
const router = express.Router();
const Book = require('../models/book')
const currDate = new Date();
const options = { year: 'numeric', month: '2-digit', day: '2-digit' };
const today = currDate.toLocaleDateString('en-US', options);

router.post('/add-book',async(req,res) => {
    try{
        const newBook = new Book({
            book_name:req.body.book_name,
            book_author:req.body.book_author,
            book_price:req.body.book_price,
            book_publish_date:today
        })
        const saveBook = await newBook.save()
        res.status(201).json({
            status : 'success',
            msg: 'Record Added!',
            data : {
                saveBook
            }
        })
    }catch(error){
        res.status(500).json({
            status : 'error',
            message : err
        })
        console.error(error)
    }
})

router.get('/get-books',async(req,res) => {
    const booksInfo = await Book.find({})
    try{
        res.status(200).json({
            status : 'success',
            data : {
                booksInfo
            }
        })
    }catch(error){
        res.status(500).json({
            status : 'error',
            message : err
        })
        console.log(error)
    }
})

router.patch('/update-book/:id', async (req,res) => {
    const updateBook = await Book.findByIdAndUpdate(req.params.id,req.body,{
        new : true,
        runValidators : true
    })
    try{
        res.status(202).json({
            status : 'success',
            msg: 'Record Updated!',
            data : {
                updateBook
            }
          })
    }catch(err){
        res.json({
            status : 'error',
            message : err
        })
        console.log(err)
    }
})

router.delete('/delete-book/:id', async (req,res) => {
    const deleteBook = await Book.findByIdAndDelete(req.params.id,req.body)
    try{
        res.status(202).json({
            status : 'error',
            msg: 'Record Deleted!',
            data : { deleteBook }
        })
    }catch(err){
        res.status(500).json({
            status : 'error',
            message : err
        })
        console.log(err)
    }
})

module.exports = router