import React, { useState } from 'react';
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
import PlusIcon from '@mui/icons-material/Add';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import DropdownMenu from './DropdownMenu';

const AddBook = ({ books, onAddBook, onUpdateBook, onDeleteBook }) => {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [newBook, setNewBook] = useState({
    book_name: '',
    book_author: '',
    book_price: '',
    book_publish_date: '',
  });

  const [selectedBookId, setSelectedBookId] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewBook((prevBook) => ({
      ...prevBook,
      [name]: value,
    }));
  };

  const handleAddBook = () => {
    if (selectedBookId) {
      onUpdateBook(selectedBookId, newBook);
    } else {
      onAddBook(newBook);
    }
    setNewBook({
      book_name: '',
      book_author: '',
      book_price: '',
      book_publish_date: '',
    });
    setSelectedBookId(null);
    setIsFormOpen(false);
  };

  const handleEditClick = (bookId) => {
    const selectedBook = books.find((book) => book._id === bookId);
    setNewBook({ ...selectedBook });
    setSelectedBookId(bookId);
    setIsFormOpen(true);
  };

  const handleUpdateBook = () => {
    onUpdateBook(selectedBookId, newBook);
    setNewBook({
      book_name: '',
      book_author: '',
      book_price: '',
      book_publish_date: '',
    });
    setSelectedBookId(null);
    setIsFormOpen(false);
  };

  const handleViewClick = (bookId) => {
    console.log(`View book with ID: ${bookId}`);
  };

  const handleDeleteClick = (bookId) => {
    onDeleteBook(bookId);
  };

  const handleOptionClick = (option, bookId) => {
    switch (option) {
      case 'View':
        handleViewClick(bookId);
        break;
      case 'Edit':
        handleEditClick(bookId);
        break;
      case 'Delete':
        handleDeleteClick(bookId);
        break;
      default:
        break;
    }
  };

  return (
    <div>
      <h1>Book List</h1>
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <TableContainer component={Paper}>
          <Tooltip title="Add Book">
            <IconButton>
              <PlusIcon onClick={() => setIsFormOpen(true)} />
            </IconButton>
          </Tooltip>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Book Name</TableCell>
                <TableCell>Book Author</TableCell>
                <TableCell>Book Price</TableCell>
                <TableCell>Book Publish Date</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {books.map((book, index) => (
                <TableRow key={index}>
                  <TableCell>{book.book_name}</TableCell>
                  <TableCell>{book.book_author}</TableCell>
                  <TableCell>{book.book_price}</TableCell>
                  <TableCell>{book.book_publish_date}</TableCell>
                  <TableCell>
                    <DropdownMenu
                      options={['View', 'Edit', 'Delete']}
                      onOptionSelect={(option) => handleOptionClick(option, book._id)}
                    />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
      <Dialog open={isFormOpen} onClose={() => setIsFormOpen(false)}>
        <DialogTitle>{selectedBookId ? 'Update' : 'Add'} Book</DialogTitle>
        <DialogContent>
          <TextField
            fullWidth
            label="Book Name"
            name="book_name"
            value={newBook.book_name}
            onChange={handleInputChange}
            required
          />
          <TextField
            fullWidth
            label="Book Author"
            name="book_author"
            value={newBook.book_author}
            onChange={handleInputChange}
            required
          />
          <TextField
            fullWidth
            label="Book Price"
            name="book_price"
            value={newBook.book_price}
            onChange={handleInputChange}
            required
          />
          <TextField
            fullWidth
            label="Book Publish Date"
            name="book_publish_date"
            value={newBook.book_publish_date}
            onChange={handleInputChange}
            required
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setIsFormOpen(false)}>Cancel</Button>
          <Button onClick={selectedBookId ? handleUpdateBook : handleAddBook}>
            {selectedBookId ? 'Update' : 'Add'}
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default AddBook;
