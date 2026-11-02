import { useCallback, useEffect, useState } from 'react';
import PageHeader from '../components/PageHeader';
import BookCard from '../components/BookCard';
import api, { errMsg } from '../api';
import type { Book } from '../types';

export default function BooksPage({ mode }: { mode: 'member' | 'admin' }) {
  const [books, setBooks] = useState<Book[]>([]);
  const [search, setSearch] = useState('');
  const [msg, setMsg] = useState('');

  const load = useCallback(async () => {
    try {
      const { data } = await api.get<Book[]>('/books', { params: { search } });
      setBooks(data);
    } catch (e) {
      setMsg(errMsg(e));
    }
  }, [search]);

  // debounce the search box
  useEffect(() => {
    const t = setTimeout(load, 300);
    return () => clearTimeout(t);
  }, [load]);

  const borrow = async (id: string) => {
    try {
      await api.post(`/borrows/${id}`);
      setMsg('Book borrowed. Please return within 14 days.');
      load();
    } catch (e) {
      setMsg(errMsg(e));
    }
  };

  const remove = async (id: string) => {
    if (!window.confirm('Remove this book?')) return;
    try {
      await api.delete(`/books/${id}`);
      setMsg('Book removed.');
      load();
    } catch (e) {
      setMsg(errMsg(e));
    }
  };

  return (
    <div className="bg-dark">
      {mode === 'member' ? (
        <PageHeader title="Books" back="/dashboard" showNav />
      ) : (
        <PageHeader title="Total Books" back="/admin" />
      )}
      <div className="container">
        <input
          className="search"
          placeholder="Search books..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        {msg && <p className="notice">{msg}</p>}
        <div className="grid">
          {books.map((b) => (
            <BookCard key={b._id} book={b}>
              {mode === 'member' ? (
                <button className="btn" disabled={b.availableQty < 1} onClick={() => borrow(b._id)}>
                  {b.availableQty < 1 ? 'Unavailable' : 'Borrow'}
                </button>
              ) : (
                <button className="btn btn-danger" onClick={() => remove(b._id)}>Remove</button>
              )}
            </BookCard>
          ))}
        </div>
        {books.length === 0 && <p className="notice">No books found.</p>}
      </div>
    </div>
  );
}