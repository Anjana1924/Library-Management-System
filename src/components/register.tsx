import { useState } from "react";

interface RegisterProps {
  onLogin: () => void;
  onHome: () => void;
}

function Register({
  onLogin,
  onHome
}: RegisterProps) {

  // Store input values
  const [regNo, setRegNo] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleRegister = async (
    e: React.FormEvent
  ) => {

    e.preventDefault();

    try {

      // Send data to backend
      const response = await fetch(
        "http://localhost:5000/api/auth/register",
        {
          method: "POST",

          headers: {
            "Content-Type": "application/json"
          },

          body: JSON.stringify({
            regNo: regNo,
            email: email,
            password: password
          })
        }
      );

      // Get response from backend
      const data = await response.json();

      // If backend returns an error
      if (!response.ok) {
        alert(data.message);
        return;
      }

      // Registration successful
      alert(data.message);

      // Go to login page
      onLogin();

    } catch (error) {

      console.error(
        "Registration error:",
        error
      );

      alert(
        "Unable to connect to the server."
      );
    }
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

          {/* Registration Number */}

          <div className="input-row">

            <label>
              Reg No. :
            </label>

            <input
              type="text"
              value={regNo}
              onChange={(e) =>
                setRegNo(e.target.value)
              }
              required
            />

          </div>


          {/* Email */}

          <div className="input-row">

            <label>
              Email :
            </label>

            <input
              type="email"
              value={email}
              onChange={(e) =>
                setEmail(e.target.value)
              }
              required
            />

          </div>


          {/* Password */}

          <div className="input-row">

            <label>
              Password :
            </label>

            <input
              type="password"
              value={password}
              onChange={(e) =>
                setPassword(e.target.value)
              }
              required
            />

          </div>


          {/* Register Button */}

          <button
            type="submit"
            className="glass-button"
          >
            Create Account
          </button>

        </form>


        {/* Login */}

        <button
          className="text-button login-existing"
          onClick={onLogin}
        >
          Already have an account? Login
        </button>

      </div>


      {/* Page Title */}

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