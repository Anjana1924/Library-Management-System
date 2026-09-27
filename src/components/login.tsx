interface LoginProps {
  onRegister: () => void;
  onDashboard: () => void;
  onHome: () => void;
}

function Login({
  onRegister,
  onDashboard,
  onHome
}: LoginProps) {

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();

    // Temporary navigation
    // Later we will check MongoDB here
    onDashboard();
  };

  const handleAdminLogin = () => {
    // Later we can create a separate admin authentication
    onDashboard();
  };

  return (
    <div className="page login-page">

      <button
        className="back-button"
        onClick={onHome}
      >
        ←
      </button>

      <div className="login-box">
        <br/>
        <br/>

        <form onSubmit={handleLogin}>

          <div className="input-row">
            <label>Reg No. :</label>

            <input
              type="text"
              required
            />
          </div>

          <div className="input-row">
            <label>Password :</label>

            <input
              type="password"
              required
            />
          </div>

          <button
            type="submit"
            className="glass-button"
          >
            LOGGING
          </button>

        </form>
        <hr/>

        <div className="account-text">
          <span>
            If you don't have Account
          
          </span>
          
            <br/>
            <br/>
          <button
            className="text-button"
            onClick={onRegister}
          >
            Create New Account
          </button>
        </div>

        <button
          className="glass-button admin-button"
          onClick={handleAdminLogin}
        >
          Logging as Admin
        </button>

      </div>

      <div className="right-title">
        <h1>
          LIBRARY<br />
          MANAGEMENT<br />
          SYSTEM
        </h1>
      </div>

    </div>
  );
}

export default Login;