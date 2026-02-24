import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../style/logout.css";

const SignoutPage = () => {
  const navigate = useNavigate();
  const [confirmed, setConfirmed] = useState(false);
  const [countdown, setCountdown] = useState(5);

  const userData = JSON.parse(localStorage.getItem("studentAccount") || "{}");

  useEffect(() => {
    if (!confirmed) return;
    if (countdown <= 0) {
      localStorage.removeItem("userData");
      navigate("/login");
      return;
    }
    const t = setTimeout(() => setCountdown(c => c - 1), 1000);
    return () => clearTimeout(t);
  }, [confirmed, countdown, navigate]);

  const handleSignout = () => {
    setConfirmed(true);
    localStorage.removeItem("userData");
  };

  const handleCancel = () => navigate(-1);

  if (!userData?.fname) {
    return (
      <div className="logout-page">
        <div className="logout-card">
          <div className="logout-icon">🔒</div>
          <h1>Not Signed In</h1>
          <p>Please log in or sign up to access the portal.</p>
          <button className="logout-btn primary" onClick={() => navigate("/login")}>Go to Login</button>
        </div>
      </div>
    );
  }

  if (confirmed) {
    return (
      <div className="logout-page">
        <div className="logout-card logout-done">
          <div className="logout-icon success">✅</div>
          <h1>Signed Out</h1>
          <p>You've been successfully signed out.</p>
          <p className="logout-countdown">Redirecting in <strong>{countdown}</strong>s…</p>
          <div className="countdown-bar">
            <div className="countdown-fill" style={{ animationDuration: "5s" }} />
          </div>
          <button className="logout-btn primary" onClick={() => navigate("/login")}>Go Now</button>
        </div>
      </div>
    );
  }

  return (
    <div className="logout-page">
      <div className="logout-card">
        <div className="logout-icon">👋</div>
        <h1>Sign Out?</h1>
        <p>
          Hey <strong>{userData.fname}</strong>, you are currently signed in.
          Are you sure you want to sign out?
        </p>
        <div className="logout-actions">
          <button className="logout-btn danger" onClick={handleSignout}>Yes, Sign Out</button>
          <button className="logout-btn secondary" onClick={handleCancel}>Cancel</button>
        </div>
      </div>
    </div>
  );
};

export default SignoutPage;
