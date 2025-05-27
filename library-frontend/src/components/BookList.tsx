import { useState } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  Typography,
  Box,
  Skeleton,
  useTheme,
} from '@mui/material';
import { Delete as DeleteIcon, Edit as EditIcon } from '@mui/icons-material';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import type { Book } from '../services/api';
import { bookApi } from '../services/api';
import toast from 'react-hot-toast';
import BookForm from './BookForm';
import ConfirmDialog from './ConfirmDialog';

export default function BookList() {
  const theme = useTheme();
  const [editBook, setEditBook] = useState<Book | null>(null);
  const [deleteBook, setDeleteBook] = useState<Book | null>(null);
  const queryClient = useQueryClient();

  const { data: books = [], isLoading } = useQuery({
    queryKey: ['books'],
    queryFn: bookApi.getAllBooks,
  });

  const deleteMutation = useMutation({
    mutationFn: (id: number) => bookApi.deleteBook(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['books'] });
      toast.success('Book deleted successfully');
      setDeleteBook(null);
    },
    onError: (error) => {
      toast.error('Failed to delete book');
      console.error('Delete error:', error);
    },
  });

  if (isLoading) {
    return (
      <TableContainer 
        component={Paper} 
        elevation={0}
        sx={{ 
          borderRadius: 2,
          border: `1px solid ${theme.palette.divider}`,
        }}
      >
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Title</TableCell>
              <TableCell>Author</TableCell>
              <TableCell>Created On</TableCell>
              <TableCell align="right">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {[...Array(5)].map((_, index) => (
              <TableRow key={index}>
                <TableCell><Skeleton /></TableCell>
                <TableCell><Skeleton /></TableCell>
                <TableCell><Skeleton /></TableCell>
                <TableCell><Skeleton /></TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    );
  }

  if (!books.length) {
    return (
      <Box
        sx={{
          p: 4,
          textAlign: 'center',
          borderRadius: 2,
          bgcolor: 'background.paper',
          border: `1px solid ${theme.palette.divider}`,
        }}
      >
        <Typography variant="h6" color="text.secondary">
          No books found
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
          Add a new book to get started
        </Typography>
      </Box>
    );
  }

  return (
    <>
      <TableContainer 
        component={Paper} 
        elevation={0}
        sx={{ 
          borderRadius: 2,
          border: `1px solid ${theme.palette.divider}`,
        }}
      >
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>
                <Typography variant="subtitle2" fontWeight="bold">
                  Title
                </Typography>
              </TableCell>
              <TableCell>
                <Typography variant="subtitle2" fontWeight="bold">
                  Author
                </Typography>
              </TableCell>
              <TableCell>
                <Typography variant="subtitle2" fontWeight="bold">
                  Created On
                </Typography>
              </TableCell>
              <TableCell align="right">
                <Typography variant="subtitle2" fontWeight="bold">
                  Actions
                </Typography>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {books.map((book) => (
              <TableRow
                key={book.id}
                sx={{
                  '&:last-child td, &:last-child th': { border: 0 },
                  '&:hover': {
                    bgcolor: theme.palette.action.hover,
                  },
                }}
              >
                <TableCell>{book.title}</TableCell>
                <TableCell>{book.author}</TableCell>
                <TableCell>
                  {new Date(book.createdOn!).toLocaleDateString()}
                </TableCell>
                <TableCell align="right">
                  <IconButton
                    size="small"
                    onClick={() => setEditBook(book)}
                    sx={{ 
                      color: theme.palette.primary.main,
                      '&:hover': {
                        bgcolor: theme.palette.primary.main + '1A',
                      },
                    }}
                  >
                    <EditIcon />
                  </IconButton>
                  <IconButton
                    size="small"
                    onClick={() => setDeleteBook(book)}
                    sx={{ 
                      ml: 1,
                      color: theme.palette.error.main,
                      '&:hover': {
                        bgcolor: theme.palette.error.main + '1A',
                      },
                    }}
                  >
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <BookForm
        book={editBook}
        open={!!editBook}
        onClose={() => setEditBook(null)}
      />

      <ConfirmDialog
        open={!!deleteBook}
        title="Delete Book"
        content={`Are you sure you want to delete "${deleteBook?.title}"?`}
        onConfirm={() => deleteBook?.id && deleteMutation.mutate(deleteBook.id)}
        onCancel={() => setDeleteBook(null)}
      />
    </>
  );
} 