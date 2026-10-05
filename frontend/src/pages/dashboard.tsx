interface DashboardProps {
  onLogout: () => void;
}

function Dashboard({ onLogout }: DashboardProps) {
  return (
    <div className="dashboard">

      <header className="dashboard-header">

        <div className="dashboard-logo">
          Dash Board
        </div>

        <nav>
          <button>Home</button>
          <button>Contact</button>
          <button>Help</button>
          <button>About Us</button>

          <button
            className="logout-button"
            onClick={onLogout}
          >
            Logout
          </button>
        </nav>

      </header>

      <main className="dashboard-content">

        <h1>
          Welcome to Library Management System
        </h1>

        <p>
          Manage books, members, borrowing and
          returning records easily.
        </p>

        <div className="dashboard-cards">

          <div className="dashboard-card">
            <h2>Books</h2>
            <p>Manage library books</p>
            <button>View Books</button>
          </div>

          <div className="dashboard-card">
            <h2>Members</h2>
            <p>Manage library members</p>
            <button>View Members</button>
          </div>

          <div className="dashboard-card">
            <h2>Borrow</h2>
            <p>Manage borrowed books</p>
            <button>Borrow Books</button>
          </div>

          <div className="dashboard-card">
            <h2>Returns</h2>
            <p>Manage returned books</p>
            <button>View Returns</button>
          </div>

        </div>

      </main>

    </div>
  );
}

export default Dashboard;