import { createContext, useContext, useState, type ReactNode } from 'react';
import api from '../api';
import type { User } from '../types';

interface RegisterData {
  name: string;
  regNo: string;
  email: string;
  password: string;
}

interface AuthContextType {
  user: User | null;
  loginMember: (regNo: string, password: string) => Promise<void>;
  loginAdmin: (email: string, password: string) => Promise<void>;
  register: (data: RegisterData) => Promise<void>;
  updateUser: (u: User) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(() => {
    try {
      const saved = localStorage.getItem('user');
      return saved ? (JSON.parse(saved) as User) : null;
    } catch {
      return null;
    }
  });

  const save = (token: string, u: User) => {
    localStorage.setItem('token', token);
    localStorage.setItem('user', JSON.stringify(u));
    setUser(u);
  };

  const loginMember = async (regNo: string, password: string) => {
    const { data } = await api.post('/auth/login', { regNo, password });
    save(data.token, data.user);
  };

  const loginAdmin = async (email: string, password: string) => {
    const { data } = await api.post('/auth/admin-login', { email, password });
    save(data.token, data.user);
  };

  const register = async (payload: RegisterData) => {
    const { data } = await api.post('/auth/register', payload);
    save(data.token, data.user);
  };

  const updateUser = (u: User) => {
    localStorage.setItem('user', JSON.stringify(u));
    setUser(u);
  };

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, loginMember, loginAdmin, register, updateUser, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

// eslint-disable-next-line react-refresh/only-export-components
export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used inside AuthProvider');
  return ctx;
}