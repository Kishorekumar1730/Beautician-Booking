import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { api } from "../api";
import "../styles/auth.css";

export default function Signup() {
  const [f, setF] = useState({ username: "", email: "", password: "" });
  const nav = useNavigate();

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await api.post("/api/auth/signup", f);
      alert("Signup successful! Please login.");
      nav("/login");
    } catch (err: any) {
      alert(err?.response?.data?.message ?? "Signup failed");
    }
  };

  return (
    <div className="card-wrap">
      <div className="card">
        <div className="art" aria-hidden="true">
          {/* reuse the same inline SVG */}
          <svg viewBox="0 0 220 240" className="art-svg" role="img" aria-label="Beautician silhouette">
            <defs>
              <linearGradient id="hairGrad" x1="0" x2="0" y1="0" y2="1">
                <stop offset="0" stopColor="#ffb3c4" />
                <stop offset="1" stopColor="#ff8faf" />
              </linearGradient>
            </defs>
            <path
              d="M162 44c-18-18-44-26-67-19-25 8-46 33-53 61-7 26 1 52 19 70 7 7 13 12 23 16 6 2 13 4 16 3 4-1 2-8-1-13-4-8-7-18-6-27 1-12 7-22 15-31 5-5 10-9 16-11 6-3 13-4 20-2 8 2 15 8 20 15 4 6 7 12 8 19 3-17 1-56-10-81z"
              fill="url(#hairGrad)"
              stroke="#d4577b"
              strokeWidth="4"
              strokeLinejoin="round"
            />
            <path
              d="M152 116c-6 7-17 11-26 9-9-2-17-9-20-18-2-6-1-12 1-18 2-6 6-12 11-16 7-6 17-8 25-6"
              fill="none"
              stroke="#d4577b"
              strokeWidth="4"
              strokeLinecap="round"
            />
            <path d="M147 98c-4 2-7 5-7 8" fill="none" stroke="#d4577b" strokeWidth="4" strokeLinecap="round" />
            <path d="M143 114c4 0 7 0 10-2" fill="none" stroke="#d4577b" strokeWidth="4" strokeLinecap="round" />
            <path d="M131 132c-7 12-13 19-21 24" fill="none" stroke="#d4577b" strokeWidth="4" strokeLinecap="round" />
            <path d="M101 153c-8 15-6 27 0 37" fill="none" stroke="#d4577b" strokeWidth="4" strokeLinecap="round" />
          </svg>
        </div>

        <div className="pane">
          <h2>
            Create
            <br />
            Account
          </h2>

          <form onSubmit={submit} className="form-col">
            <input
              className="input"
              placeholder="Username"
              value={f.username}
              onChange={(e) => setF({ ...f, username: e.target.value })}
              required
            />
            <input
              className="input"
              type="email"
              placeholder="Email"
              value={f.email}
              onChange={(e) => setF({ ...f, email: e.target.value })}
              required
            />
            <input
              className="input"
              type="password"
              placeholder="Password"
              value={f.password}
              onChange={(e) => setF({ ...f, password: e.target.value })}
              required
            />
            <button className="btn" type="submit">
              Sign Up
            </button>
          </form>

          <p className="muted">
            Have an account? <Link to="/login">Login</Link>
          </p>
        </div>
      </div>

      <p className="copy">© 2025 Beauty Parlour</p>
    </div>
  );
}
