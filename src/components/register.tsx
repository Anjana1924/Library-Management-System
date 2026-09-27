interface RegisterProps {
  onLogin: () => void;
  onHome: () => void;
}

function Register({
  onLogin,
  onHome
}: RegisterProps) {

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();

    alert("Account created successfully!");

    onLogin();
  };

  return (
    <div className="page register-page">

      <button
        className="back-button"
        onClick={onHome}
      >
        ←
      </button>

      <div className="register-box">

        <form onSubmit={handleRegister}>

          <div className="input-row">
            <label>Reg No. :</label>

            <input
              type="text"
              required
            />
          </div>

          <div className="input-row">
            <label>Email :</label>

            <input
              type="email"
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
            Create Account
          </button>

        </form>

        <button
          className="text-button login-existing"
          onClick={onLogin}
        >
          Already have an account?   Login
        </button>

      </div>

      <div className="right-title register-title">
        <h1>
          LIBRARY<br />
          MANAGEMENT<br />
          SYSTEM
        </h1>
      </div>

    </div>
  );
}

export default Register;