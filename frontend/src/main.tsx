// src/main.tsx
import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider, useAuth } from "./auth";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import App from "./App"; // <-- main dashboard layout with sidebar
import "./styles/index.css";

function Private({ children }: { children: React.ReactElement }) {
  const { token } = useAuth();
  return token ? children : <Navigate to="/login" replace />;
}

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          {/* Public routes */}
          <Route path="/" element={<Navigate to="/login" />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />

          {/* Private dashboard route */}
          <Route
            path="/dashboard/*"
            element={
              <Private>
                <App />
              </Private>
            }
          />

          {/* Example of another private route */}
          <Route
            path="/private"
            element={
              <Private>
                <div>Private Route Content</div>
              </Private>
            }
          />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  </React.StrictMode>
);
