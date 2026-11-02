import type { ReactNode } from 'react';
import type { Book } from '../types';

export default function BookCard({ book, children }: { book: Book; children?: ReactNode }) {
  return (
    <div className="book-card">
      <h3>{book.title}</h3>
      <p>Author : {book.author}</p>
      <p>Category : {book.category}</p>
      <p>Available Qty : {book.availableQty}</p>
      {children}
    </div>
  );
}