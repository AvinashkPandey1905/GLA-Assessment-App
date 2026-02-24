import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  FaEye, FaEyeSlash, FaLock, FaEnvelope,
  FaUser, FaPhone, FaSchool, FaBirthdayCake,
  FaCheckCircle, FaExclamationCircle
} from "react-icons/fa";
import "../style/login.css";

const useToast = () => {
  const [toast, setToast] = useState({ msg: "", type: "" });
  const show = (msg, type = "error") => {
    setToast({ msg, type });
    setTimeout(() => setToast({ msg: "", type: "" }), 3000);
  };
  return { toast, show };
};

const validators = {
  fname: v => !v.trim() ? "First name is required"
    : !/^[A-Za-z\s]{2,}$/.test(v.trim()) ? "Only letters, min 2 characters"
      : "",
  lname: v => !v.trim() ? "Last name is required"
    : !/^[A-Za-z\s]{2,}$/.test(v.trim()) ? "Only letters, min 2 characters"
      : "",
  age: v => !v ? "Age is required"
    : isNaN(v) || v < 5 || v > 100 ? "Age must be between 5 and 100"
      : "",
  mob: v => !v.trim() ? "Mobile number is required"
    : !/^\d{10}$/.test(v.trim()) ? "Enter a valid 10-digit mobile number"
      : "",
  qualification: v => !v.trim() ? "School / institution is required"
    : v.trim().length < 3 ? "Must be at least 3 characters"
      : "",
  email: v => !v.trim() ? "Email is required"
    : !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v) ? "Enter a valid email address"
      : "",
  password: v => !v ? "Password is required"
    : v.length < 6 ? "Password must be at least 6 characters"
      : "",
};

const SIGNUP_FIELDS = ["fname", "lname", "age", "mob", "qualification", "email", "password"];
const LOGIN_FIELDS = ["email", "password"];

const SignupLogin = ({ onLogin }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [showPw, setShowPw] = useState(false);
  const [loading, setLoading] = useState(false);
  const [shake, setShake] = useState(false);
  const [formData, setFormData] = useState({
    fname: "", lname: "", age: "", mob: "", email: "", password: "", qualification: "",
  });
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const [passwordStrength, setPasswordStrength] = useState(0);

  const { toast, show } = useToast();
  const navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem("userData")) navigate("/profile");
  }, [navigate]);

  const toggleForm = () => {
    setIsLogin(prev => !prev);
    setPasswordStrength(0);
    setFormData({ fname: "", lname: "", age: "", mob: "", email: "", password: "", qualification: "" });
    setErrors({});
    setTouched({});
    setShowPw(false);
  };

  const validateField = (name, value) => validators[name]?.(value) ?? "";

  const handleBlur = (e) => {
    const { name, value } = e.target;
    setTouched(prev => ({ ...prev, [name]: true }));
    setErrors(prev => ({ ...prev, [name]: validateField(name, value) }));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (name === "password") evalStrength(value);
    if (touched[name]) {
      setErrors(prev => ({ ...prev, [name]: validateField(name, value) }));
    }
  };

  const evalStrength = (pw) => {
    if (!pw) return setPasswordStrength(0);
    let score = 0;
    if (pw.length >= 6) score++;
    if (pw.length >= 10) score++;
    if (/[A-Z]/.test(pw)) score++;
    if (/\d/.test(pw)) score++;
    if (/[@$!%*?&]/.test(pw)) score++;
    setPasswordStrength(score);
  };

  const triggerShake = () => {
    setShake(true);
    setTimeout(() => setShake(false), 500);
  };

  const validateAll = () => {
    const fields = isLogin ? LOGIN_FIELDS : SIGNUP_FIELDS;
    const newErrors = {};
    fields.forEach(f => { newErrors[f] = validateField(f, formData[f]); });
    const newTouched = {};
    fields.forEach(f => { newTouched[f] = true; });
    setErrors(newErrors);
    setTouched(newTouched);
    return Object.values(newErrors).every(e => !e);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateAll()) {
      show("Please fix the errors before continuing.", "error");
      triggerShake();
      return;
    }

    setLoading(true);
    await new Promise(r => setTimeout(r, 900));
    setLoading(false);

    if (!isLogin) {
      const existing = JSON.parse(localStorage.getItem("studentAccount") || "null");
      if (existing && existing.email === formData.email) {
        setErrors(prev => ({ ...prev, email: "This email is already registered" }));
        setTouched(prev => ({ ...prev, email: true }));
        show("Email already registered. Please log in.", "error");
        triggerShake();
        return;
      }
      localStorage.setItem("studentAccount", JSON.stringify(formData));
      show("Account created! Please log in.", "success");
      setTimeout(() => toggleForm(), 1200);
    } else {
      const stored = JSON.parse(localStorage.getItem("studentAccount"));
      if (stored && stored.email === formData.email && stored.password === formData.password) {
        localStorage.setItem("userData", JSON.stringify(stored));
        if (onLogin) onLogin();
        show("Welcome back! Redirecting…", "success");
        setTimeout(() => navigate("/dashboard"), 800);
      } else {
        setErrors({
          email: "",
          password: "Invalid email or password",
        });
        setTouched({ email: true, password: true });
        show("Invalid email or password.", "error");
        triggerShake();
      }
    }
  };

  const strengthLabel = ["", "Weak", "Fair", "Good", "Strong", "Very Strong"];
  const strengthColor = ["", "#ef4444", "#f59e0b", "#eab308", "#22c55e", "#10b981"];

  const Field = ({ icon, name, type = "text", placeholder, extra }) => {
    const hasError = touched[name] && errors[name];
    const isValid = touched[name] && !errors[name] && formData[name];
    return (
      <div className="field-wrap">
        <div className={`input-group ${hasError ? "input-error" : ""} ${isValid ? "input-valid" : ""}`}>
          <span className="input-icon">{icon}</span>
          <input
            type={type}
            name={name}
            placeholder={placeholder}
            value={formData[name]}
            onChange={handleChange}
            onBlur={handleBlur}
            autoComplete="off"
          />
          {extra}
          {isValid && <span className="field-status valid"><FaCheckCircle /></span>}
          {hasError && <span className="field-status error"><FaExclamationCircle /></span>}
        </div>
        {hasError && <p className="field-error">{errors[name]}</p>}
      </div>
    );
  };

  return (
    <div className="login-page">
      <div className={`toast ${toast.msg ? "show" : ""} toast-${toast.type}`}>{toast.msg}</div>

      <div className={`login-card ${shake ? "shake" : ""}`}>
        <div className="login-header">
          <div className="login-logo">🎓</div>
          <h1 className="login-title">{isLogin ? "Welcome back" : "Create account"}</h1>
          <p className="login-sub">{isLogin ? "Sign in to your GLA account" : "Join GLA Learning today"}</p>
        </div>

        <form onSubmit={handleSubmit} className="login-form" noValidate>

          {!isLogin && (
            <>
              <div className="form-row">
                <Field icon={<FaUser />} name="fname" placeholder="First Name" />
                <Field icon={<FaUser />} name="lname" placeholder="Last Name" />
              </div>
              <div className="form-row">
                <Field icon={<FaBirthdayCake />} name="age" placeholder="Age" type="number" />
                <Field icon={<FaPhone />} name="mob" placeholder="Mobile (10 digits)" />
              </div>
              <Field icon={<FaSchool />} name="qualification" placeholder="School / Institution" />
            </>
          )}

          <Field icon={<FaEnvelope />} name="email" type="email" placeholder="Email address" />

          <Field
            icon={<FaLock />}
            name="password"
            type={showPw ? "text" : "password"}
            placeholder="Password"
            extra={
              <button type="button" className="pw-toggle" onClick={() => setShowPw(p => !p)}>
                {showPw ? <FaEyeSlash /> : <FaEye />}
              </button>
            }
          />

          {!isLogin && formData.password && (
            <div className="strength-bar">
              <div className="strength-track">
                <div
                  className="strength-fill"
                  style={{
                    width: `${(passwordStrength / 5) * 100}%`,
                    background: strengthColor[passwordStrength],
                  }}
                />
              </div>
              <span className="strength-label" style={{ color: strengthColor[passwordStrength] }}>
                {strengthLabel[passwordStrength]}
              </span>
            </div>
          )}

          <button type="submit" className="submit-btn" disabled={loading}>
            {loading ? <span className="spinner" /> : (isLogin ? "Sign In" : "Create Account")}
          </button>
        </form>

        <p className="toggle-text">
          {isLogin ? "Don't have an account?" : "Already have an account?"}{" "}
          <button onClick={toggleForm} className="toggle-btn">
            {isLogin ? "Sign Up" : "Sign In"}
          </button>
        </p>
      </div>
    </div>
  );
};

export default SignupLogin;
