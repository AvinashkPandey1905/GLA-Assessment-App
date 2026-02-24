import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Chart as ChartJS, RadialLinearScale, PointElement, LineElement,
  Filler, Tooltip, Legend
} from "chart.js";
import { Radar } from "react-chartjs-2";
import { FaArrowLeft, FaRedo, FaBrain, FaEye, FaUsers, FaChartLine } from "react-icons/fa";
import "../style/result.css";

ChartJS.register(RadialLinearScale, PointElement, LineElement, Filler, Tooltip, Legend);

const quadrantMapping = {
  "Quadrant I": {
    type: "Active Learner", icon: <FaChartLine />, color: "#22c55e",
    description: "You are a goal-oriented learner who focuses on practical applications and solving real-world problems. You excel at turning ideas into actionable tasks and achieving results efficiently."
  },
  "Quadrant II": {
    type: "Visual Learner", icon: <FaEye />, color: "#06b6d4",
    description: "You are an introspective learner who takes time to analyze information and reflect deeply on experiences before drawing conclusions."
  },
  "Quadrant III": {
    type: "Logical Learner", icon: <FaBrain />, color: "#f59e0b",
    description: "You thrive in team settings, enjoy structured reasoning, and love finding patterns in data and information."
  },
  "Quadrant IV": {
    type: "Collaborative Learner", icon: <FaUsers />, color: "#818cf8",
    description: "You are an imaginative learner who enjoys exploring new ideas, creative thinking, and working together with others."
  },
};

const Result = () => {
  const navigate = useNavigate();
  const [userData, setUserData] = useState(null);
  const [mapping, setMapping] = useState(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const raw = localStorage.getItem("userData");
    if (!raw) return;
    try {
      const parsed = JSON.parse(raw);
      setUserData(parsed);
      if (parsed.XVal != null && parsed.YVal != null) {
        const q = determineQuadrant(parsed.XVal, parsed.YVal);
        setMapping(quadrantMapping[q] || null);
      }
      setTimeout(() => setVisible(true), 100);
    } catch (e) {
      console.error(e);
    }
  }, []);

  const determineQuadrant = (x, y) => {
    if (x >= 3 && y >= 3) return "Quadrant I";
    if (x < 3 && y >= 3) return "Quadrant II";
    if (x < 3 && y < 3) return "Quadrant III";
    return "Quadrant IV";
  };

  if (!userData) {
    return (
      <div className="result-page page-enter">
        <div className="result-empty">
          <p>No quiz data found. Take the quiz first!</p>
          <button className="result-btn primary" onClick={() => navigate("/choice")}>Take Quiz</button>
        </div>
      </div>
    );
  }

  const radarData = {
    labels: ["Focus", "Time Mgmt", "Engagement", "Consistency", "Efficiency", "Adaptability"],
    datasets: [{
      label: "Your Profile",
      data: [
        Math.round(userData.XVal * 15),
        70,
        Math.round(userData.YVal * 15),
        60,
        Math.round((Number(userData.XVal) + Number(userData.YVal)) * 7),
        55,
      ],
      backgroundColor: "rgba(79,70,229,0.15)",
      borderColor: "rgba(129,140,248,0.8)",
      pointBackgroundColor: "#818cf8",
      borderWidth: 2,
    }],
  };

  const radarOptions = {
    responsive: true,
    scales: {
      r: {
        min: 0, max: 100,
        ticks: { color: "#64748b", stepSize: 25, backdropColor: "transparent" },
        grid: { color: "rgba(255,255,255,0.07)" },
        pointLabels: { color: "#94a3b8", font: { size: 11 } },
      },
    },
    plugins: {
      legend: { labels: { color: "#94a3b8" } },
    },
  };

  return (
    <div className={`result-page page-enter ${visible ? "result-visible" : ""}`}>
      <div className="result-header">
        <h1 className="result-title">Your Learning Style</h1>
        <p className="result-sub">Based on your quiz responses</p>
      </div>

      {mapping && (
        <div className="result-badge-card" style={{ "--badge-color": mapping.color }}>
          <div className="result-badge-icon" style={{ color: mapping.color, background: `${mapping.color}20` }}>
            {mapping.icon}
          </div>
          <div>
            <p className="result-badge-label">You are a</p>
            <h2 className="result-badge-type" style={{ color: mapping.color }}>{mapping.type}</h2>
            <p className="result-badge-desc">{mapping.description}</p>
          </div>
        </div>
      )}

      <div className="result-stats">
        <div className="result-stat">
          <span className="result-stat-label">X Score</span>
          <span className="result-stat-value">{userData.XVal}</span>
        </div>
        <div className="result-stat">
          <span className="result-stat-label">Y Score</span>
          <span className="result-stat-value">{userData.YVal}</span>
        </div>
        {userData.quadrant && (
          <div className="result-stat">
            <span className="result-stat-label">Quadrant</span>
            <span className="result-stat-value" style={{ fontSize: "0.85rem" }}>{userData.quadrant}</span>
          </div>
        )}
      </div>

      <div className="result-chart-card">
        <h3 className="result-chart-title">Performance Analysis</h3>
        <div className="result-chart-wrap">
          <Radar data={radarData} options={radarOptions} />
        </div>
      </div>

      <div className="result-actions">
        <button className="result-btn secondary" onClick={() => navigate(-1)}>
          <FaArrowLeft /> Go Back
        </button>
        <button className="result-btn primary" onClick={() => navigate("/choice")}>
          <FaRedo /> Retake Quiz
        </button>
      </div>
    </div>
  );
};

export default Result;
