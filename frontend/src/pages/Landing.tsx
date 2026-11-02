import { Link } from 'react-router-dom';

export default function Landing() {
  return (
    <div className="bg-light landing">
      <Link to="/login" className="landing-login">LOGIN</Link>
      <h1 className="big-title left">
        LIBRARY<br />MANAGEMENT<br />SYSTEM
      </h1>
    </div>
  );
}