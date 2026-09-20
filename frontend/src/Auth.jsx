import { useState } from "react";

function Auth({ onLogin, startWithLogin = true }) {
  const API_URL = import.meta.env.VITE_API_URL;
const [isLogin, setIsLogin] = useState(startWithLogin);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const endpoint = isLogin
  ? `${API_URL}/api/auth/login`
  : `${API_URL}/api/auth/signup`;

    const body = isLogin
      ? {
          email,
          password,
        }
      : {
          name,
          email,
          password,
        };

    try {
      const response = await fetch(endpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      });

      const data = await response.json();

      if (!response.ok) {
        alert(data.message || "Something went wrong");
        return;
      }

      if (isLogin) {
  localStorage.setItem("token", data.token);
  onLogin();
} else {
        alert("Signup successful! Please login.");
        setIsLogin(true);
      }

      setName("");
      setEmail("");
      setPassword("");
    } catch (error) {
      console.error("Authentication error:", error);
      alert("Unable to connect to server.");
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-card">
        <h1>{isLogin ? "Login" : "Create Account"}</h1>

        <p>
          {isLogin
            ? "Login to manage your library."
            : "Sign up to start using the library."}
        </p>

        <form
  onSubmit={handleSubmit}
  style={{
    display: "flex",
    flexDirection: "column",
    gap: "15px",
  }}
>
          {!isLogin && (
            <input
              type="text"
              placeholder="Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          )}

          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <button type="submit">
            {isLogin ? "Login" : "Sign Up"}
          </button>
        </form>

        <button
          type="button"
          className="auth-switch"
          onClick={() => {
            setIsLogin(!isLogin);
            setName("");
            setEmail("");
            setPassword("");
          }}
        >
          {isLogin
            ? "Don't have an account? Sign Up"
            : "Already have an account? Login"}
        </button>
      </div>
    </div>
  );
}

export default Auth;