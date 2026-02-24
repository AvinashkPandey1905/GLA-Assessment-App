<div align="center">

<h1>🧬 LearnDNA</h1>
<p><strong>Decode your unique way of learning.</strong></p>

<p>
  <img src="https://img.shields.io/badge/React-18.3-61DAFB?style=for-the-badge&logo=react&logoColor=white" />
  <img src="https://img.shields.io/badge/JavaScript-ES6+-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black" />
  <img src="https://img.shields.io/badge/Chart.js-Radar-FF6384?style=for-the-badge&logo=chartdotjs&logoColor=white" />

</p>

<p>A personalized <strong>Learning Style Assessment Web App</strong> built for GLA University students.<br/>
Answer a short quiz and discover whether you're an <em>Active, Visual, Logical</em>, or <em>Collaborative</em> learner — powered by a weighted PDA algorithm and visualized with a radar chart.</p>

</div>

---

## ✨ Features

| Feature | Description |
|---|---|
| 🔐 **Auth System** | Signup with full validation + Login with credential check (localStorage) |
| 📋 **Smart Quiz** | Select study methods & YouTube learning reasons via pill chip UI |
| 🧠 **PDA Algorithm** | Weighted X/Y scoring places you in 1 of 4 learner quadrants |
| 📊 **Radar Chart** | Visual performance breakdown powered by Chart.js |
| 🎨 **Dark UI** | Modern dark-theme design with glassmorphism, animations & transitions |
| ✅ **Form Validation** | Real-time field-level validation with inline error messages & strength bar |
| 📱 **Responsive** | Works across desktop and tablet screen sizes |

---

## 🗂️ Pages

```
/login      → Sign In / Sign Up (with real-time validation)
/dashboard  → Welcome banner, stats, quick actions & progress tracker
/profile    → Student profile card with avatar & info
/choice     → Quiz — select study methods & learning reasons
/result     → Learner type badge + radar chart analysis
/logout     → Animated confirmation + countdown redirect
```

---

## 🧪 How the Algorithm Works

The quiz uses a **PDA (Personal Development Assessment) matrix**:

1. Each of the **16 study methods** and **10 YouTube reasons** maps to a `[X, Y]` score pair
2. Your 5 method picks add `score × 0.12` to both X and Y totals
3. Your 3 reason picks add `score × 0.13` to both X and Y totals
4. Final X/Y coordinates determine your **quadrant**:

```
         High Y
            │
 Quadrant II│ Quadrant I
 Visual     │ Active
 Learner    │ Learner
────────────┼──────────── High X
 Quadrant   │ Quadrant IV
 III Logical│ Collaborative
 Learner    │ Learner
            │
```

---

## 🚀 Getting Started

### Prerequisites
- **Node.js** v16+ and **npm**

### Installation

```bash
# Clone the repository
git clone https://github.com/YOUR_USERNAME/gla.git

# Navigate into the project
cd gla

# Install dependencies
npm install

# Start the development server
npm start
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 🛠️ Tech Stack

| Layer | Technology |
|---|---|
| Framework | React 18 (Create React App) |
| Routing | React Router DOM v6 |
| Charts | Chart.js + react-chartjs-2 |
| Icons | react-icons (FontAwesome) |
| UI | Custom CSS with CSS Variables |
| Font | Inter (Google Fonts) |
| Storage | localStorage (no backend) |

---

## 📁 Project Structure

```
src/
├── components/
│   ├── Navbar.js          # Glassmorphism nav with active route highlight
│   └── Sidebar.js         # Icon sidebar with active pill state
├── pages/
│   ├── login.js           # Login + Signup with full field validations
│   ├── dashboard.js       # Stats, quick actions, progress checklist
│   ├── profile.js         # Animated profile card
│   ├── choice.js          # Quiz — pill chips + selection counters
│   ├── result.js          # Learner type + radar chart
│   └── logout.js          # Countdown redirect logout
├── style/                 # Per-page CSS files
├── App.js                 # Routes + layout shell
└── index.css              # Global design tokens (CSS variables + Inter font)
```

---

## 🎯 Learner Types

| Quadrant | Type | Description |
|---|---|---|
| I | 🟢 Active Learner | Goal-oriented, practical, action-driven |
| II | 🔵 Visual Learner | Reflective, analytical, introspective |
| III | 🟡 Logical Learner | Pattern-driven, structured, data-focused |
| IV | 🟣 Collaborative Learner | Creative, imaginative, people-oriented |

---

## 📸 Screenshots

> _Run the app locally to explore the interactive UI._

---

## 🤝 Contributing

Pull requests are welcome! For major changes, please open an issue first.

---

---

<div align="center">
  <p>Built with ❤️ for <strong>GLA University</strong></p>
  <p><em>"Know how you learn — learn how you grow."</em></p>
</div>
