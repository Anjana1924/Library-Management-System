import { useState, type FormEvent } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import AuthShell from '../components/AuthShell';
import { useAuth } from '../context/AuthContext';
import { errMsg } from '../api';

export default function Login() {
  const { loginMember } = useAuth();
  const navigate = useNavigate();
  const [regNo, setRegNo] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const submit = async (e: FormEvent) => {
    e.preventDefault();
    setError('');
    try {
      await loginMember(regNo, password);
      navigate('/dashboard');
    } catch (err) {
      setError(errMsg(err));
    }
  };

  return (
    <AuthShell>
      <form onSubmit={submit}>
        <label className="field">Reg No. :
          <input value={regNo} onChange={(e) => setRegNo(e.target.value)} required />
        </label>
        <label className="field">Password :
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
        </label>
        {error && <p className="error">{error}</p>}
        <button className="btn pill" type="submit">LOGGING</button>
        <hr />
        <p className="small">If you don't have Account</p>
        <p className="small right"><Link to="/register">Create New Account</Link></p>
      </form>
      <Link to="/admin-login" className="btn pill block-link">Logging as Admin</Link>
    </AuthShell>
  );
}