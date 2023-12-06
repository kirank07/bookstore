import React, { useState } from 'react'
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
} from '@mui/material';

const AddBook = ({ books, onAddBook }) => {
    const [isFormOpen, setIsFormOpen] = useState(false);
    const [newBook, setNewBook] = useState({
      book_name: '',
      book_author: '',
      book_price: '',
      book_publish_date: '',
    });
  
    const handleInputChange = (e) => {
      const { name, value } = e.target;
      setNewBook((prevBook) => ({
        ...prevBook,
        [name]: value,
      }));
    };
  
    const handleAddBook = () => {
      onAddBook(newBook);
      setNewBook({
        book_name: '',
        book_author: '',
        book_price: '',
        book_publish_date: '',
      });
      setIsFormOpen(false);
    };

  return (
    <div>
      <h1>Book List</h1>
        <Button variant="outlined" onClick={() => setIsFormOpen(true)}>
            Add Book
        </Button>
        <TableContainer component={Paper}>
            <Table>
                <TableHead>
                <TableRow>
                    <TableCell>Book Name</TableCell>
                    <TableCell>Book Author</TableCell>
                    <TableCell>Book Price</TableCell>
                    <TableCell>Book Publish Date</TableCell>
                </TableRow>
                </TableHead>
                <TableBody>
                {books.map((book, index) => (
                    <TableRow key={index}>
                    <TableCell>{book.book_name}</TableCell>
                    <TableCell>{book.book_author}</TableCell>
                    <TableCell>{book.book_price}</TableCell>
                    <TableCell>{book.book_publish_date}</TableCell>
                    </TableRow>
                ))}
                </TableBody>
            </Table>
        </TableContainer>
      
        <Dialog open={isFormOpen} onClose={() => setIsFormOpen(false)}>
            <DialogTitle>Add New Book</DialogTitle>
            <DialogContent>
                <TextField
                fullWidth
                label="Book Name"
                name="book_name"
                value={newBook.book_name}
                onChange={handleInputChange}
                />
                <TextField
                fullWidth
                label="Book Author"
                name="book_author"
                value={newBook.book_author}
                onChange={handleInputChange}
                />
                <TextField
                fullWidth
                label="Book Price"
                name="book_price"
                value={newBook.book_price}
                onChange={handleInputChange}
                />
                <TextField
                fullWidth
                label="Book Publish Date"
                name="book_publish_date"
                value={newBook.book_publish_date}
                onChange={handleInputChange}
                />
            </DialogContent>
            <DialogActions>
                <Button onClick={() => setIsFormOpen(false)}>Cancel</Button>
                <Button onClick={handleAddBook}>Add</Button>
            </DialogActions>
        </Dialog>
    </div>
  )
}

export default AddBook
