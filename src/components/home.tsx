interface HomeProps {
  onLogin: () => void;
}

function Home({ onLogin }: HomeProps) {
  return (
    <div className="page home-page">

      <button
        className="top-login"
        onClick={onLogin}
      >
        LOGIN
      </button>

      <div className="home-title">
        <h1>
          LIBRARY<br />
          MANAGEMENT<br />
          SYSTEM
        </h1>
      </div>

    </div>
  );
}

export default Home;