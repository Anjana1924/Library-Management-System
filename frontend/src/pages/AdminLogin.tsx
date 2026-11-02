import { useState, type FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import AuthShell from '../components/AuthShell';
import { useAuth } from '../context/AuthContext';
import { errMsg } from '../api';
import { Link } from 'react-router-dom';

export default function AdminLogin() {
  const { loginAdmin } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const submit = async (e: FormEvent) => {
    e.preventDefault();
    setError('');
    try {
      await loginAdmin(email, password);
      navigate('/admin');
    } catch (err) {
      setError(errMsg(err));
    }
  };

  return (
    <AuthShell>
      <form onSubmit={submit}>
      <Link to="/login" className="back-link">← Back to Login</Link>
        <label className="field">Admin Email :
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        </label>
        <label className="field">Password :
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
        </label>
        {error && <p className="error">{error}</p>}
        <button className="btn pill" type="submit">Admin Login</button>
      </form>
    </AuthShell>
  );
}