import { Routes, Route, Navigate } from 'react-router-dom';
import ProtectedRoute from './components/ProtectedRoute';
import Landing from './pages/Landing';
import Login from './pages/login';
import Register from './pages/register';
import AdminLogin from './pages/AdminLogin';
import Dashboard from './pages/dashboard';
import BooksPage from './pages/BooksPage';
import History from './pages/History';
import Profile from './pages/Profile';
import AdminDashboard from './pages/AdminDashboard';
import AdminMembers from './pages/AdminMembers';
import AddBook from './pages/AddBook';

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Landing />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/admin-login" element={<AdminLogin />} />

      {/* Member */}
      <Route path="/dashboard" element={<ProtectedRoute role="member"><Dashboard /></ProtectedRoute>} />
      <Route path="/books" element={<ProtectedRoute role="member"><BooksPage mode="member" /></ProtectedRoute>} />
      <Route path="/history" element={<ProtectedRoute role="member"><History /></ProtectedRoute>} />
      <Route path="/profile" element={<ProtectedRoute role="member"><Profile /></ProtectedRoute>} />

      {/* Admin */}
      <Route path="/admin" element={<ProtectedRoute role="admin"><AdminDashboard /></ProtectedRoute>} />
      <Route path="/admin/books" element={<ProtectedRoute role="admin"><BooksPage mode="admin" /></ProtectedRoute>} />
      <Route path="/admin/members" element={<ProtectedRoute role="admin"><AdminMembers /></ProtectedRoute>} />
      <Route path="/admin/add-book" element={<ProtectedRoute role="admin"><AddBook /></ProtectedRoute>} />

      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}