export type Role = 'member' | 'admin';

export interface User {
  _id: string;
  name: string;
  regNo?: string;
  idNo?: string;
  email: string;
  role: Role;
}

export interface Book {
  _id: string;
  title: string;
  isbn: string;
  author: string;
  category: string;
  publisher: string;
  totalQty: number;
  availableQty: number;
}

export interface BorrowRecord {
  _id: string;
  book: { _id: string; title: string } | null;
  borrowedDate: string;
  dueDate: string;
  returnedDate: string | null;
  status: 'Returned' | 'Pending' | 'Over Due';
}