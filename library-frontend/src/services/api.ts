import axios from 'axios';

const API_BASE_URL = 'http://localhost:8080/library-api';

export interface Book {
  id?: number;
  title: string;
  author: string;
  createdOn?: Date;
}

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const bookApi = {
  getAllBooks: async () => {
    const response = await api.get<Book[]>('/books/all');
    return response.data;
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

  deleteBook: async (id: number) => {
    try {
      await api.delete(`/books/delete/${id}`);
      return true;
    } catch (error) {
      console.error('Delete request failed:', error);
      throw error;
    }
  },
}; 