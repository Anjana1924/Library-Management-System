import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import PageHeader from '../components/PageHeader';
import api from '../api';

export default function AdminDashboard() {
  const [stats, setStats] = useState({ totalBooks: 0, totalMembers: 0 });

  useEffect(() => {
    api.get('/admin/stats').then(({ data }) => setStats(data)).catch(() => {});
  }, []);

  return (
    <div className="bg-dark">
      <PageHeader title="Dash Board" />
      <div className="container">
        <div className="stats">
          <Link to="/admin/books" className="stat-card">
            <div className="stat-icon">📚</div>
            <div>
              <div>Total Books</div>
              <strong>{stats.totalBooks}</strong>
            </div>
          </Link>
          <Link to="/admin/members" className="stat-card">
            <div className="stat-icon">👥</div>
            <div>
              <div>Total Members</div>
              <strong>{stats.totalMembers}</strong>
            </div>
          </Link>
        </div>
        <hr />
        <Link to="/admin/add-book" className="wide-btn">Add Books</Link>
        <Link to="/admin/books" className="wide-btn">Remove Books</Link>
      </div>
    </div>
  );
}