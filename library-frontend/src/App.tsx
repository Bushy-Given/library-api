import { useState } from 'react'
import {
  AppBar,
  Toolbar,
  Typography,
  Container,
  Button,
  Box,
  CssBaseline,
  ThemeProvider,
  createTheme,
  Alert,
  Snackbar,
  IconButton,
  useMediaQuery,
} from '@mui/material'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { Toaster } from 'react-hot-toast'
import BookList from './components/BookList'
import BookForm from './components/BookForm'
import { Add as AddIcon, Brightness4, Brightness7 } from '@mui/icons-material'

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 2,
      retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),
      staleTime: 5 * 60 * 1000, // 5 minutes
    },
  },
})

function App() {
  const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)')
  const [isDarkMode, setIsDarkMode] = useState(prefersDarkMode)
  const [isAddingBook, setIsAddingBook] = useState(false)
  const [error, setError] = useState<Error | null>(null)

  const theme = createTheme({
    palette: {
      mode: isDarkMode ? 'dark' : 'light',
      primary: {
        main: isDarkMode ? '#90caf9' : '#1976d2',
      },
      secondary: {
        main: isDarkMode ? '#f48fb1' : '#dc004e',
      },
      background: {
        default: isDarkMode ? '#121212' : '#f5f5f5',
        paper: isDarkMode ? '#1e1e1e' : '#ffffff',
      },
    },
    components: {
      MuiAppBar: {
        styleOverrides: {
          root: {
            backgroundColor: isDarkMode ? '#1e1e1e' : '#1976d2',
            backgroundImage: 'none',
          },
        },
      },
      MuiPaper: {
        styleOverrides: {
          root: {
            backgroundImage: 'none',
          },
        },
      },
    },
  })

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Box sx={{ flexGrow: 1, minHeight: '100vh', bgcolor: 'background.default' }}>
          <AppBar position="static" elevation={0}>
            <Toolbar>
              <Typography 
                variant="h5" 
                component="div" 
                sx={{ 
                  flexGrow: 1,
                  fontWeight: 'bold',
                  letterSpacing: '0.5px'
                }}
              >
                Library Management
              </Typography>
              <IconButton
                color="inherit"
                onClick={() => setIsDarkMode(!isDarkMode)}
                sx={{ mr: 2 }}
              >
                {isDarkMode ? <Brightness7 /> : <Brightness4 />}
              </IconButton>
              <Button
                variant="contained"
                color="secondary"
                onClick={() => setIsAddingBook(true)}
                startIcon={<AddIcon />}
                sx={{
                  borderRadius: 2,
                  textTransform: 'none',
                  px: 3,
                }}
              >
                Add Book
              </Button>
            </Toolbar>
          </AppBar>
          <Container 
            maxWidth="lg" 
            sx={{ 
              mt: 4,
              mb: 4,
              display: 'flex',
              flexDirection: 'column',
              gap: 3
            }}
          >
            <BookList />
            <BookForm
              book={null}
              onClose={() => setIsAddingBook(false)}
              open={isAddingBook}
            />
          </Container>
        </Box>
        <Toaster 
          position="top-right"
          toastOptions={{
            duration: 4000,
            style: {
              background: isDarkMode ? '#333' : '#fff',
              color: isDarkMode ? '#fff' : '#333',
            },
            success: {
              duration: 3000,
              iconTheme: {
                primary: '#4caf50',
                secondary: isDarkMode ? '#333' : '#fff',
              },
            },
            error: {
              duration: 5000,
              iconTheme: {
                primary: '#f44336',
                secondary: isDarkMode ? '#333' : '#fff',
              },
            },
          }}
        />
        <Snackbar
          open={!!error}
          autoHideDuration={6000}
          onClose={() => setError(null)}
        >
          <Alert severity="error" onClose={() => setError(null)}>
            {error?.message}
          </Alert>
        </Snackbar>
      </ThemeProvider>
    </QueryClientProvider>
  )
}

export default App
