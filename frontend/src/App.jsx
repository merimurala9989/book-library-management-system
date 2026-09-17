import "./App.css";
import { useState } from "react";
import Books from "./Books";
import Auth from "./Auth";

function App() {
  const [showAuth, setShowAuth] = useState(false);
  const [authMode, setAuthMode] = useState(true);
  return (
    <div className="app">
      {/* Navigation */}
      <nav className="navbar">
        <div className="logo">📚 Book Library</div>

        <div className="nav-links">
          <button>Home</button>

          <button
            onClick={() => {
              window.location.href = "#books";
            }}
          >
            Books
          </button>
          <button
  onClick={() => {
    setShowAuth(true);
    setTimeout(() => {
      document
        .getElementById("auth")
        ?.scrollIntoView({ behavior: "smooth" });
    }, 100);
  }}
>
  Login
</button>
      <button
  className="signup-btn"
  onClick={() => {
    setShowAuth(true);
    setAuthMode(false);
    setTimeout(() => {
      document
        .getElementById("auth")
        ?.scrollIntoView({ behavior: "smooth" });
    }, 100);
  }}
>
  Sign Up
</button>
        </div>
      </nav>

      {/* Home */}
      <section className="hero">
        <div className="hero-content">
          <h1>Welcome to Our Book Library</h1>

          <p>
            Discover, manage and explore your favorite books
            in one simple place.
          </p>

          <button
            className="primary-btn"
            onClick={() => {
              window.location.href = "#books";
            }}
          >
            Explore Books
          </button>
        </div>
      </section>

      {/* Features */}
      <section className="features">
        <h2>Library Features</h2>

        <div className="feature-container">
          <div className="feature-card">
            <div className="feature-icon">📖</div>
            <h3>Manage Books</h3>
            <p>Add, edit and delete book records easily.</p>
          </div>

          <div className="feature-card">
            <div className="feature-icon">🔍</div>
            <h3>Search Books</h3>
            <p>Find books quickly by title or author.</p>
          </div>

          <div className="feature-card">
            <div className="feature-icon">📌</div>
            <h3>Book Status</h3>
            <p>Check whether a book is available or issued.</p>
          </div>
        </div>
      </section>
       {showAuth && (
  <section id="auth">
    <Auth
  onLogin={() => setShowAuth(false)}
  startWithLogin={authMode}
/>
  </section>
)}

      {/* Books */}
      <section id="books">
        <Books />
      </section>

      {/* Footer */}
      <footer>
        <p>© 2026 Book Library Management System</p>
      </footer>
    </div>
  );
}

export default App;