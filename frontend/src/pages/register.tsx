import { useState, type FormEvent } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import AuthShell from '../components/AuthShell';
import { useAuth } from '../context/AuthContext';
import { errMsg } from '../api';

export default function Register() {
  const { register } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: '', regNo: '', email: '', password: '' });
  const [error, setError] = useState('');

  const set = (k: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement>) =>
    setForm({ ...form, [k]: e.target.value });

  const submit = async (e: FormEvent) => {
    e.preventDefault();
    setError('');
    try {
      await register(form);
      navigate('/dashboard');
    } catch (err) {
      setError(errMsg(err));
    }
  };

  return (
    <AuthShell>
      <Link to="/login" className="back-link">← Back to Login</Link>
      <form onSubmit={submit}>
        <label className="field">Name : <input value={form.name} onChange={set('name')} required /></label>
        <label className="field">Reg No. : <input value={form.regNo} onChange={set('regNo')} required /></label>
        <label className="field">Email : <input type="email" value={form.email} onChange={set('email')} required /></label>
        <label className="field">Password : <input type="password" minLength={6} value={form.password} onChange={set('password')} required /></label>
        {error && <p className="error">{error}</p>}
        <button className="btn pill" type="submit">Create Account</button>
        <hr />
        <p className="small">Already have an account? <Link to="/login" className="underline">Login</Link></p>
      </form>
    </AuthShell>
  );
}