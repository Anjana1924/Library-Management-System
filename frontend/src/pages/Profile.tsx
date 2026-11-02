import { useState, type FormEvent } from 'react';
import PageHeader from '../components/PageHeader';
import { useAuth } from '../context/AuthContext';
import api, { errMsg } from '../api';
import type { User } from '../types';

export default function Profile() {
  const { user, updateUser } = useAuth();
  const [form, setForm] = useState({
    name: user?.name ?? '',
    email: user?.email ?? '',
    idNo: user?.idNo ?? '',
  });
  const [pw, setPw] = useState({ newPassword: '', confirmPassword: '' });
  const [msg, setMsg] = useState('');
  const [error, setError] = useState('');

  const saveProfile = async (e: FormEvent) => {
    e.preventDefault();
    setMsg(''); setError('');
    try {
      const { data } = await api.put<User>('/users/me', form);
      updateUser(data);
      setMsg('Profile updated.');
    } catch (err) {
      setError(errMsg(err));
    }
  };

  const changePassword = async (e: FormEvent) => {
    e.preventDefault();
    setMsg(''); setError('');
    try {
      await api.put('/users/me/password', pw);
      setPw({ newPassword: '', confirmPassword: '' });
      setMsg('Password changed.');
    } catch (err) {
      setError(errMsg(err));
    }
  };

  return (
    <div className="bg-dark">
      <PageHeader title="Profile" back="/dashboard" showNav />
      <div className="container">
        <div className="panel narrow">
          <form onSubmit={saveProfile}>
            <label className="field">Name : <input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} /></label>
            <label className="field">Reg No. : <input value={user?.regNo ?? ''} disabled /></label>
            <label className="field">Email : <input type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} /></label>
            <label className="field">ID No. : <input value={form.idNo} onChange={(e) => setForm({ ...form, idNo: e.target.value })} /></label>
            <button className="btn" type="submit">Save Profile</button>
          </form>

          <hr />
          <h4>Change Password</h4>
          <form onSubmit={changePassword}>
            <label className="field">New Password :
              <input type="password" minLength={6} value={pw.newPassword} onChange={(e) => setPw({ ...pw, newPassword: e.target.value })} required />
            </label>
            <label className="field">Confirm Password :
              <input type="password" minLength={6} value={pw.confirmPassword} onChange={(e) => setPw({ ...pw, confirmPassword: e.target.value })} required />
            </label>
            <button className="btn" type="submit">Update Password</button>
          </form>
          {msg && <p className="notice">{msg}</p>}
          {error && <p className="error">{error}</p>}
        </div>
      </div>
    </div>
  );
}