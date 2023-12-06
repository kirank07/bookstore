import './App.css';
import React, { useState } from 'react'
import {Route, Routes } from "react-router-dom";
import SignIn from './pages/pages/SignIn';
import AddBook from './components/AddBook';
import Axios from 'axios';

const initialBooks = [
  {
    book_name: 'The Great Gatsby',
    book_author: 'F. Scott Fitzgerald',
    book_price: '$10.99',
    book_publish_date: '1925-04-10',
  },

];

function App() {
  const [books, setBooks] = useState(initialBooks);
  const handleAddBook = async (newBook) => {
    try {
      const response = await Axios.post('http://localhost:8080/add-book', newBook);
      console.log(response.status);
      if (response.status === 201) {
        const addedBook = response.data;
        setBooks((prevBooks) => [...prevBooks, addedBook]);
      } else {
        console.error('Failed to add book to the API');
      }
    } catch (error) {
      console.error('Error adding book:', error);
    }
  };


  return (
    <>
      <Routes>
        <Route path="/" element={<SignIn />}></Route>
        <Route path="/addbook" element={<AddBook books={books} onAddBook={handleAddBook}/>}></Route>
      </Routes>
    </>
  );
}

export default App;
