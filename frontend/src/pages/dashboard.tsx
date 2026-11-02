import { Link } from 'react-router-dom';
import PageHeader from '../components/PageHeader';

export default function Dashboard() {
  return (
    <div className="bg-dark">
      <PageHeader title="Dash Board" showNav />
      <div className="container tiles">
        <Link to="/books" className="tile">BOOKS</Link>
        <Link to="/history" className="tile">HISTORY</Link>
      </div>
    </div>
  );
}