import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaCheck } from "react-icons/fa";
import "../style/choice.css";

const useToast = () => {
  const [toast, setToast] = useState({ msg: "", type: "" });
  const show = (msg, type = "warn") => {
    setToast({ msg, type });
    setTimeout(() => setToast({ msg: "", type: "" }), 2500);
  };
  return { toast, show };
};

const ActionsAndReasons = () => {
  const navigate = useNavigate();
  const { toast, show } = useToast();

  const actions = [
    "Taking Elaborate Notes", "Short Notes", "Engage In Discussion", "Help From Peers",
    "Summary Writing", "Solving Exercise", "Past year Paper's", "Instructional Videos",
    "Engaging Quizzes", "Making Projects", "Workshops", "Usage Of Maps", "Visual Arts/Music",
    "Presentation", "Flowcharts", "Approaching SME"
  ];

  const reasons = [
    "Nice Visuals/Audio", "Supplement to Class", "Revise Old Topics", "Relearn Class Topics",
    "Learn Diverse Subjects", "Get Expert Knowledge", "Prepare for Test", "Practice Questions",
    "Watch Practical Demo", "Connect with Community"
  ];

  const PDA = [
    [5, 1], [2, 1], [3, 4], [4, 5], [2, 2], [4, 1], [1, 1], [2, 4],
    [4, 5], [4, 4], [4, 3], [2, 4], [1, 4], [2, 5], [1, 5], [5, 2],
    [0, 0], [0, 0], [0, 0], [0, 0], [3, 5], [4, 1], [3, 2], [3, 3],
    [5, 2], [5, 1], [3, 1], [2, 2], [4, 4], [3, 5]
  ];

  const [selectedActions, setSelectedActions] = useState([]);
  const [selectedReasons, setSelectedReasons] = useState([]);
  const [additionalResources, setAdditionalResources] = useState("");

  const toggle = (item, max, arr, setArr) => {
    if (arr.includes(item)) {
      setArr(arr.filter(i => i !== item));
    } else if (arr.length < max) {
      setArr([...arr, item]);
    } else {
      show(`You can only select ${max} items.`, "warn");
    }
  };

  const determineQuadrant = (x, y) => {
    if (x >= 3 && y >= 3) return "Quadrant I";
    if (x < 3 && y >= 3) return "Quadrant II";
    if (x < 3 && y < 3) return "Quadrant III";
    return "Quadrant IV";
  };

  const handleSubmit = () => {
    if (selectedActions.length !== 5) {
      show("Please select exactly 5 study methods.", "error"); return;
    }
    if (selectedReasons.length !== 3) {
      show("Please select exactly 3 reasons.", "error"); return;
    }
    let XVal = 0, YVal = 0;
    selectedActions.forEach(a => {
      const i = actions.indexOf(a);
      XVal += PDA[i][0] * 0.12;
      YVal += PDA[i][1] * 0.12;
    });
    selectedReasons.forEach(r => {
      const i = reasons.indexOf(r);
      XVal += PDA[i + 19][0] * 0.13;
      YVal += PDA[i + 19][1] * 0.13;
    });
    const quadrant = determineQuadrant(XVal, YVal);
    const existing = JSON.parse(localStorage.getItem("studentAccount") || "{}");
    localStorage.setItem("userData", JSON.stringify({
      ...existing,
      selectedActions, selectedReasons, additionalResources,
      XVal: XVal.toFixed(2), YVal: YVal.toFixed(2), quadrant
    }));
    navigate("/result");
  };

  const Chip = ({ item, selected, onToggle }) => (
    <button
      className={`chip ${selected ? "chip-selected" : ""}`}
      onClick={() => onToggle(item)}
      type="button"
    >
      {selected && <span className="chip-check"><FaCheck /></span>}
      {item}
    </button>
  );

  return (
    <div className="choice-page page-enter">
      <div className={`toast ${toast.msg ? "show" : ""} toast-${toast.type}`}>{toast.msg}</div>
      <div className="choice-section">
        <div className="choice-section-header">
          <div>
            <h2 className="choice-section-title">Study Methods</h2>
            <p className="choice-section-sub">What methods help you the most for study?</p>
          </div>
          <div className="selection-counter">
            <span className={selectedActions.length === 5 ? "counter-done" : ""}>
              {selectedActions.length} / 5
            </span>
            <span className="counter-label">selected</span>
          </div>
        </div>
        <div className="chips-grid">
          {actions.map(a => (
            <Chip
              key={a}
              item={a}
              selected={selectedActions.includes(a)}
              onToggle={item => toggle(item, 5, selectedActions, setSelectedActions)}
            />
          ))}
        </div>
      </div>

      <div className="choice-section">
        <div className="choice-section-header">
          <div>
            <h2 className="choice-section-title">Learning Reasons</h2>
            <p className="choice-section-sub">Why do you like learning from YouTube?</p>
          </div>
          <div className="selection-counter">
            <span className={selectedReasons.length === 3 ? "counter-done" : ""}>
              {selectedReasons.length} / 3
            </span>
            <span className="counter-label">selected</span>
          </div>
        </div>
        <div className="chips-grid">
          {reasons.map(r => (
            <Chip
              key={r}
              item={r}
              selected={selectedReasons.includes(r)}
              onToggle={item => toggle(item, 3, selectedReasons, setSelectedReasons)}
            />
          ))}
        </div>
      </div>

      <div className="choice-section">
        <h2 className="choice-section-title">Other Resources</h2>
        <p className="choice-section-sub">What other sites help you study? And why?</p>
        <textarea
          className="choice-textarea"
          value={additionalResources}
          onChange={e => setAdditionalResources(e.target.value)}
          maxLength={2000}
          placeholder="Write your answer here… (max 2000 characters)"
          rows={5}
        />
        <p className="char-count">{additionalResources.length} / 2000</p>
      </div>

      <button className="choice-submit-btn" onClick={handleSubmit}>
        See My Results →
      </button>
    </div>
  );
};

export default ActionsAndReasons;
