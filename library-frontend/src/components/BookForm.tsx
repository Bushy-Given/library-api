import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  Box,
  Typography,
  useTheme,
} from '@mui/material'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useState } from 'react'
import type { Book } from '../services/api'
import { bookApi } from '../services/api'
import toast from 'react-hot-toast'

interface BookFormProps {
  book: Book | null
  open: boolean
  onClose: () => void
}

export default function BookForm({ book, open, onClose }: BookFormProps) {
  const theme = useTheme()
  const queryClient = useQueryClient()
  const [title, setTitle] = useState(book?.title || '')
  const [author, setAuthor] = useState(book?.author || '')
  const [errors, setErrors] = useState({
    title: '',
    author: '',
  })

  const mutation = useMutation({
    mutationFn: (newBook: Book) => {
      if (book?.id) {
        return bookApi.updateBook(book.id, newBook)
      }
      return bookApi.createBook(newBook)
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['books'] })
      toast.success(book ? 'Book updated successfully' : 'Book added successfully')
      handleClose()
    },
    onError: (error) => {
      toast.error(book ? 'Failed to update book' : 'Failed to add book')
      console.error('Mutation error:', error)
    },
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    
    // Validate form
    const newErrors = {
      title: title.trim() ? '' : 'Title is required',
      author: author.trim() ? '' : 'Author is required',
    }
    setErrors(newErrors)

    if (Object.values(newErrors).some(error => error)) {
      return
    }

    mutation.mutate({
      id: book?.id,
      title: title.trim(),
      author: author.trim(),
    })
  }

  const handleClose = () => {
    setTitle('')
    setAuthor('')
    setErrors({ title: '', author: '' })
    onClose()
  }

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      PaperProps={{
        elevation: 0,
        sx: {
          borderRadius: 2,
          border: `1px solid ${theme.palette.divider}`,
        },
      }}
    >
      <form onSubmit={handleSubmit}>
        <DialogTitle>
          <Typography variant="h6" component="div" fontWeight="bold">
            {book ? 'Edit Book' : 'Add New Book'}
          </Typography>
        </DialogTitle>
        <DialogContent>
          <Box sx={{ mt: 1 }}>
            <TextField
              autoFocus
              fullWidth
              label="Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              error={!!errors.title}
              helperText={errors.title}
              sx={{
                mb: 2,
                '& .MuiOutlinedInput-root': {
                  borderRadius: 2,
                },
              }}
            />
            <TextField
              fullWidth
              label="Author"
              value={author}
              onChange={(e) => setAuthor(e.target.value)}
              error={!!errors.author}
              helperText={errors.author}
              sx={{
                '& .MuiOutlinedInput-root': {
                  borderRadius: 2,
                },
              }}
            />
          </Box>
        </DialogContent>
        <DialogActions sx={{ px: 3, pb: 2 }}>
          <Button
            onClick={handleClose}
            variant="outlined"
            disabled={mutation.isPending}
            sx={{
              borderRadius: 2,
              textTransform: 'none',
              borderColor: theme.palette.divider,
              '&:hover': {
                borderColor: theme.palette.text.secondary,
              },
            }}
          >
            Cancel
          </Button>
          <Button
            type="submit"
            variant="contained"
            disabled={mutation.isPending}
            sx={{
              borderRadius: 2,
              textTransform: 'none',
              ml: 1,
            }}
          >
            {book ? 'Save Changes' : 'Add Book'}
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  )
} 