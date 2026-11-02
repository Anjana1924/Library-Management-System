import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

interface Props {
  title: string;
  back?: string;      // path for the ← arrow
  showNav?: boolean;  // Home / Books / History / Profile (member pages)
}

export default function PageHeader({ title, back, showNav }: Props) {
  const { logout } = useAuth();
  const navigate = useNavigate();

  return (
    <header className="header">
      <h2>
        {back && <Link to={back} className="back">←</Link>} {title}
      </h2>
      <nav>
        {showNav && (
          <>
            <Link to="/dashboard">Home</Link>
            <Link to="/books">Books</Link>
            <Link to="/history">History</Link>
            <Link to="/profile">Profile</Link>
          </>
        )}
        <button
          className="link-btn"
          onClick={() => {
            logout();
            navigate('/');
          }}
        >
          Logout
        </button>
      </nav>
    </header>
  );
}