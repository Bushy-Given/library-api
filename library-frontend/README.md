# Library Management System Frontend

A modern, responsive React application for managing a library's book collection. Built with React, TypeScript, and Material-UI.

## Features

- 📚 Complete CRUD operations for books
- 🎨 Modern Material Design with dark mode support
- 🔍 Real-time search functionality with animations
- 📱 Responsive design for all screen sizes
- 📊 Paginated data display
- ✨ Smooth animations and transitions
- 🎯 Error handling and loading states
- 🔄 Optimistic updates for better UX

## Tech Stack

- React 18
- TypeScript
- Vite
- Material-UI (MUI)
- React Query
- React Router
- React Hot Toast

## Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn
- Backend API running on `http://localhost:8080`

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd library-frontend
```

2. Install dependencies:
```bash
npm install
# or
yarn
```

3. Start the development server:
```bash
npm run dev
# or
yarn dev
```

The application will be available at `http://localhost:3000`

## Project Structure

```
library-frontend/
├── src/
│   ├── components/      # React components
│   ├── services/        # API services
│   ├── theme/          # MUI theme configuration
│   ├── App.tsx         # Main application component
│   └── main.tsx        # Application entry point
├── public/             # Static assets
└── package.json        # Project dependencies and scripts
```

## Features in Detail

### Book Management
- View all books in a paginated table
- Add new books
- Edit existing books
- Delete books with confirmation
- Real-time search by title or author

### UI/UX Features
- Responsive Material Design
- Dark mode support
- Loading skeletons
- Toast notifications
- Animated search bar with hover effects
- Smooth transitions and micro-interactions
- Confirmation dialogs

### Data Management
- React Query for server state management
- Optimistic updates for better UX
- Error handling with user feedback
- Loading states

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint
- `npm run type-check` - Run TypeScript type checking

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.
