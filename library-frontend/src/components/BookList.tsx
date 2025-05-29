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
  TextField,
  TablePagination,
  Stack,
  InputAdornment,
  alpha,
} from '@mui/material';
import { Delete as DeleteIcon, Edit as EditIcon, Search as SearchIcon } from '@mui/icons-material';
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
  const [searchQuery, setSearchQuery] = useState('');
  const [searchFocused, setSearchFocused] = useState(false);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const queryClient = useQueryClient();

  const { data: books = [], isLoading } = useQuery({
    queryKey: ['books'],
    queryFn: bookApi.getAllBooks,
  });

  // Filter books based on search query
  const filteredBooks = books.filter(book => 
    book.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    book.author.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Calculate pagination
  const paginatedBooks = filteredBooks.slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage
  );

  const handleChangePage = (_: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

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
      <Box sx={{ width: '100%' }}>
        <TextField
          fullWidth
          variant="outlined"
          placeholder="Search books..."
          disabled
          sx={{
            mb: 2,
            transition: 'all 0.3s ease-in-out',
            '& .MuiOutlinedInput-root': {
              backgroundColor: alpha(theme.palette.background.paper, 0.8),
              backdropFilter: 'blur(8px)',
              borderRadius: '28px',
              height: '48px',
              transition: 'all 0.3s ease-in-out',
            },
          }}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon sx={{ color: 'action.disabled', ml: 1 }} />
              </InputAdornment>
            ),
          }}
        />
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
      </Box>
    );
  }

  if (!books.length) {
    return (
      <Box sx={{ width: '100%' }}>
        <TextField
          fullWidth
          variant="outlined"
          placeholder="Search books..."
          disabled
          sx={{
            mb: 2,
            transition: 'all 0.3s ease-in-out',
            '& .MuiOutlinedInput-root': {
              backgroundColor: alpha(theme.palette.background.paper, 0.8),
              backdropFilter: 'blur(8px)',
              borderRadius: '28px',
              height: '48px',
              transition: 'all 0.3s ease-in-out',
            },
          }}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon sx={{ color: 'action.disabled', ml: 1 }} />
              </InputAdornment>
            ),
          }}
        />
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
      </Box>
    );
  }

  return (
    <>
      <Stack spacing={2}>
        <TextField
          fullWidth
          variant="outlined"
          placeholder="Search books by title or author..."
          value={searchQuery}
          onChange={(e) => {
            setSearchQuery(e.target.value);
            setPage(0);
          }}
          onFocus={() => setSearchFocused(true)}
          onBlur={() => setSearchFocused(false)}
          sx={{
            mb: 2,
            transition: 'all 0.3s ease-in-out',
            '& .MuiOutlinedInput-root': {
              backgroundColor: alpha(theme.palette.background.paper, 0.8),
              backdropFilter: 'blur(8px)',
              borderRadius: '28px',
              height: '48px',
              transition: 'all 0.3s ease-in-out',
              '&:hover': {
                backgroundColor: alpha(theme.palette.background.paper, 0.95),
                transform: 'translateY(-1px)',
                boxShadow: theme.shadows[2],
              },
              '&.Mui-focused': {
                backgroundColor: theme.palette.background.paper,
                transform: 'translateY(-2px)',
                boxShadow: theme.shadows[4],
              },
            },
          }}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon 
                  sx={{ 
                    ml: 1,
                    color: searchFocused ? 'primary.main' : 'action.active',
                    transition: 'color 0.3s ease-in-out',
                  }} 
                />
              </InputAdornment>
            ),
          }}
        />

        <Box sx={{ display: 'flex', justifyContent: 'flex-end', mb: 1 }}>
          <Typography variant="body2" color="text.secondary">
            Total Books: {filteredBooks.length}
          </Typography>
        </Box>

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
              {paginatedBooks.map((book) => (
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
          <TablePagination
            component="div"
            count={filteredBooks.length}
            page={page}
            onPageChange={handleChangePage}
            rowsPerPage={rowsPerPage}
            onRowsPerPageChange={handleChangeRowsPerPage}
            rowsPerPageOptions={[5, 10, 25]}
          />
        </TableContainer>
      </Stack>

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