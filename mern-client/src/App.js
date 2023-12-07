import './App.css';
import React, { useState,useEffect } from 'react'
import {Route, Routes } from "react-router-dom";
import SignIn from './pages/pages/SignIn';
import AddBook from './components/AddBook';
import Axios from 'axios';

const initialBooks = [
  {
      _id : '',
      book_name: 'The Secret',
      book_author: 'Rhonda Byrne',
      book_price: '250',
      book_publish_date: '2006-11-10',
  },

];

function App() {
  const [books, setBooks] = useState(initialBooks);
  const handleAddBook = async (newBook) => {
    try {
      const response = await Axios.post('http://localhost:8000/api/add-book', newBook);
      if (response.status === 201) {
        const addedBook = response.data;
        setBooks((prevBooks) => [...prevBooks, addedBook]);
        getBookInfo();
      } else {
        console.error('Failed to add book to the API');
      }
    } catch (error) {
      console.error('Error adding book:', error);
    }
  };

  const handleUpdateBook = async (bookId, updatedBook) => {
    try {
      const response = await Axios.patch(`http://localhost:8000/api/update-book/${bookId}`, updatedBook);
      if (response.status === 200) {
        const updatedBookData = response.data.data.updateBook;
        setBooks((prevBooks) =>
          prevBooks.map((book) => (book._id === updatedBookData._id ? updatedBookData : book))
        );
      } else {
        console.error('Failed to update book to the API');
      }
    } catch (error) {
      console.error('Error updating book:', error);
    }
  };

  const handleDeleteBook = async (bookId) => {
    try {
      const response = await Axios.delete(`http://localhost:8000/api/delete-book/${bookId}`);
      if (response.status === 204) {
        setBooks((prevBooks) => prevBooks.filter((book) => book._id !== bookId));
      } else {
        console.error('Failed to delete book from the API');
      }
    } catch (error) {
      console.error('Error deleting book:', error);
    }
  };

  const getBookInfo = () =>{
    Axios.get('http://localhost:8000/api/get-books').then(res => {
      setBooks(res.data.data.booksInfo)
    })
  }
  
  useEffect(() => {
    getBookInfo();
  },[])

  return (
    <>
      <Routes>
        <Route path="/" element={<SignIn />}></Route>
        <Route path="/addbook" element={<AddBook books={books} onAddBook={handleAddBook} onUpdateBook={handleUpdateBook} onDeleteBook={handleDeleteBook} />}></Route>
      </Routes>
    </>
  );
}

export default App;
