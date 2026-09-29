import { useEffect, useState } from "react";
import Home from "./components/home";
import Login from "./components/login";
import Register from "./components/register";
import Dashboard from "./components/dashboard";
import "./App.css";

type Page = "home" | "login" | "register" | "dashboard";

function App() {
  const [page, setPage] = useState<Page>("home");


  return (
    <div className="app">

      {page === "home" && (
        <Home
          onLogin={() => setPage("login")}
        />
      )}

      {page === "login" && (
        <Login
          onRegister={() => setPage("register")}
          onDashboard={() => setPage("dashboard")}
          onHome={() => setPage("home")}
        />
      )}

      {page === "register" && (
        <Register
          onLogin={() => setPage("login")}
          onHome={() => setPage("home")}
        />
      )}

      {page === "dashboard" && (
        <Dashboard
          onLogout={() => setPage("login")}
        />
      )}

    </div>
  );
}

export default App;