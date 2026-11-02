import { useState, type FormEvent } from 'react';
import PageHeader from '../components/PageHeader';
import api, { errMsg } from '../api';

const empty = { title: '', isbn: '', author: '', category: '', publisher: '', quantity: '1' };

export default function AddBook() {
  const [form, setForm] = useState(empty);
  const [msg, setMsg] = useState('');
  const [error, setError] = useState('');

  const set = (k: keyof typeof empty) => (e: React.ChangeEvent<HTMLInputElement>) =>
    setForm({ ...form, [k]: e.target.value });

  const submit = async (e: FormEvent) => {
    e.preventDefault();
    setMsg(''); setError('');
    try {
      await api.post('/books', { ...form, quantity: Number(form.quantity) });
      setMsg('Book added successfully.');
      setForm(empty);
    } catch (err) {
      setError(errMsg(err));
    }
  };

  return (
    <div className="bg-dark">
      <PageHeader title="Add Books" back="/admin" />
      <div className="container">
        <form className="panel narrow" onSubmit={submit}>
          <label className="field">Title : <input value={form.title} onChange={set('title')} required /></label>
          <label className="field">ISBN : <input value={form.isbn} onChange={set('isbn')} required /></label>
          <label className="field">Author : <input value={form.author} onChange={set('author')} required /></label>
          <label className="field">Category : <input value={form.category} onChange={set('category')} required /></label>
          <label className="field">Publisher : <input value={form.publisher} onChange={set('publisher')} required /></label>
          <label className="field">Quantity : <input type="number" min={1} value={form.quantity} onChange={set('quantity')} required /></label>
          <button className="btn" type="submit">Add Book</button>
          {msg && <p className="notice">{msg}</p>}
          {error && <p className="error">{error}</p>}
        </form>
      </div>
    </div>
  );
}