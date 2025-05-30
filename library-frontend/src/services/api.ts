import axios from 'axios';

const API_BASE_URL = 'http://localhost:8080/library-api';

export interface Book {
  id?: number;
  title: string;
  author: string;
  createdOn?: string;
}

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const bookApi = {
  getAllBooks: async () => {
    try {
      const response = await api.get<Book[]>('/books/all');
      console.log('API Response:', response.data);
      return response.data;
    } catch (error) {
      console.error('Failed to fetch books:', error);
      throw error;
    }
  },

  getBookById: async (id: number) => {
    const response = await api.get<Book>(`/books/${id}`);
    return response.data;
  },

  createBook: async (book: Book) => {
    const response = await api.post<Book>('/books/add', book);
    return response.data;
  },

  updateBook: async (id: number, book: Book) => {
    try {
      const response = await api.put<Book>(`/books/update`, book, {
        params: { id }
      });
      return response.data;
    } catch (error) {
      console.error('Update request failed:', error);
      throw error;
    }
  },

  deleteBook: async (id: number | string) => {
    console.log('API: Sending delete request for book ID:', id);
    try {
      const response = await api.delete(`/books/delete/${id}`);
      console.log('API: Delete response:', response);
      return response.status === 204;
    } catch (error) {
      console.error('API: Delete request failed:', error);
      throw error;
    }
  },
}; 