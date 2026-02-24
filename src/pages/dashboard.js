import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaPlay, FaChartBar, FaUser, FaGraduationCap, FaCheckCircle, FaClock } from "react-icons/fa";
import "../style/dashboard.css";

const Dashboard = () => {
    const navigate = useNavigate();
    const [userData, setUserData] = useState(null);
    const [quizData, setQuizData] = useState(null);

    useEffect(() => {
        const account = JSON.parse(localStorage.getItem("studentAccount") || "{}");
        const quiz = JSON.parse(localStorage.getItem("userData") || "{}");
        setUserData(account);
        setQuizData(quiz.quadrant ? quiz : null);
    }, []);

    const name = userData?.fname || "Student";

    const stats = [
        {
            icon: <FaGraduationCap />,
            label: "Status",
            value: quizData ? "Complete" : "Pending",
            color: quizData ? "#22c55e" : "#f59e0b",
            bg: quizData ? "rgba(34,197,94,0.12)" : "rgba(245,158,11,0.12)",
        },
        {
            icon: <FaChartBar />,
            label: "Learner Type",
            value: quizData?.quadrant
                ? { "Quadrant I": "Active", "Quadrant II": "Visual", "Quadrant III": "Logical", "Quadrant IV": "Collaborative" }[quizData.quadrant] || "—"
                : "—",
            color: "#818cf8",
            bg: "rgba(129,140,248,0.12)",
        },
        {
            icon: <FaChartBar />,
            label: "X Score",
            value: quizData?.XVal ?? "—",
            color: "#06b6d4",
            bg: "rgba(6,182,212,0.12)",
        },
        {
            icon: <FaChartBar />,
            label: "Y Score",
            value: quizData?.YVal ?? "—",
            color: "#a78bfa",
            bg: "rgba(167,139,250,0.12)",
        },
    ];

    return (
        <div className="dashboard-page page-enter">
            <div className="dashboard-banner">
                <div className="banner-text">
                    <h1 className="banner-title">Welcome back, {name}! 👋</h1>
                    <p className="banner-sub">
                        {quizData
                            ? "You've completed the learning style quiz. Check your results below."
                            : "Complete the quiz to discover your personalized learning style."}
                    </p>
                </div>
                <div className="banner-icon-wrap">
                    <span className="banner-icon">🎓</span>
                </div>
            </div>

            <div className="dashboard-stats">
                {stats.map((s, i) => (
                    <div
                        key={i}
                        className="stat-card"
                        style={{ "--stat-color": s.color, "--stat-bg": s.bg, animationDelay: `${i * 0.08}s` }}
                    >
                        <div className="stat-icon">{s.icon}</div>
                        <div className="stat-info">
                            <span className="stat-label">{s.label}</span>
                            <span className="stat-value">{s.value}</span>
                        </div>
                    </div>
                ))}
            </div>

            <div className="dashboard-section">
                <h2 className="dashboard-section-title">Quick Actions</h2>
                <div className="quick-actions">
                    <button className="qa-card" onClick={() => navigate("/choice")}>
                        <span className="qa-icon" style={{ background: "rgba(79,70,229,0.15)", color: "#818cf8" }}><FaPlay /></span>
                        <div>
                            <p className="qa-title">{quizData ? "Retake Quiz" : "Start Quiz"}</p>
                            <p className="qa-sub">Discover your learning style</p>
                        </div>
                    </button>
                    <button className="qa-card" onClick={() => navigate("/result")}>
                        <span className="qa-icon" style={{ background: "rgba(6,182,212,0.15)", color: "#06b6d4" }}><FaChartBar /></span>
                        <div>
                            <p className="qa-title">View Results</p>
                            <p className="qa-sub">See your performance analysis</p>
                        </div>
                    </button>
                    <button className="qa-card" onClick={() => navigate("/profile")}>
                        <span className="qa-icon" style={{ background: "rgba(245,158,11,0.15)", color: "#f59e0b" }}><FaUser /></span>
                        <div>
                            <p className="qa-title">My Profile</p>
                            <p className="qa-sub">View and manage your info</p>
                        </div>
                    </button>
                </div>
            </div>

            <div className="dashboard-section">
                <h2 className="dashboard-section-title">Progress</h2>
                <div className="progress-card">
                    <div className="progress-step" data-done={true}>
                        <span className="progress-step-icon done"><FaCheckCircle /></span>
                        <div>
                            <p className="progress-step-title">Account Created</p>
                            <p className="progress-step-sub">You're registered in GLA Learning</p>
                        </div>
                    </div>
                    <div className="progress-step" data-done={!!quizData}>
                        <span className={`progress-step-icon ${quizData ? "done" : ""}`}>
                            {quizData ? <FaCheckCircle /> : <FaClock />}
                        </span>
                        <div>
                            <p className="progress-step-title">Complete Quiz</p>
                            <p className="progress-step-sub">{quizData ? "Done! Quiz completed." : "Select study methods and reasons"}</p>
                        </div>
                    </div>
                    <div className="progress-step" data-done={!!quizData}>
                        <span className={`progress-step-icon ${quizData ? "done" : ""}`}>
                            {quizData ? <FaCheckCircle /> : <FaClock />}
                        </span>
                        <div>
                            <p className="progress-step-title">View Results</p>
                            <p className="progress-step-sub">{quizData ? "Results ready to view." : "Complete the quiz first"}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
