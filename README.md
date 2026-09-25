# 🚆 RAILOPT-X

### AI-Driven Railway Maintenance Block Optimization

> **Coordinating Maintenance • Maximizing Asset Availability • Minimizing Train Disruption**
---

## 💡 Overview

**RAILOPT-X** is an AI-powered decision-support platform for optimizing railway maintenance blocks.

It integrates **Engineering, S&T, and Traction** maintenance requirements with **asset risk, train schedules, freight demand, resources, and available block windows** to generate coordinated maintenance plans.

### 🎯 Core Idea

Instead of planning maintenance independently, RAILOPT-X identifies **compatible cross-department maintenance activities** and bundles them into a single optimized block whenever constraints allow.

**Example:**

`Engineering + S&T + Traction → One Coordinated Maintenance Block`

---

## ⚙️ How It Works

```text
Maintenance + Assets + Trains + Freight + Resources + Blocks
                         ↓
                AI Criticality Engine
                         ↓
             Maintenance Opportunities
                         ↓
                Train Impact Analysis
                         ↓
               Constraint Validation
                         ↓
                CP-SAT Optimization
                         ↓
             Optimized Block Schedule
                         ↓
          Digital Twin / What-If Simulation
                         ↓
             Dynamic Re-optimization
```

### ⭐ Key Features
🧠 AI Maintenance Criticality & Risk Analysis
🔗 Cross-Department Maintenance Bundling
🚦 Train & Freight Impact Analysis
⚙️ CP-SAT Constraint-Based Optimization
📅 Weekly & Monthly Block Planning
🚨 Emergency Maintenance Mode
🔄 Dynamic Re-optimization
🔮 Digital Twin / What-If Simulation
🔍 Explainable Scheduling Decisions
👥 Human-in-the-Loop Approval


### 🖥️ Prototype
The prototype demonstrates a synthetic railway corridor with:

36 Stations
35 Sections
Maintenance Tasks
Railway Assets
Train Movements
Freight Forecasts
Block Windows
Maintenance Resources

Note: Prototype data is synthetic and does not represent live or confidential Indian Railways data.

### 🛠️ Tech Stack
Layer	Technologies
Frontend	React, TypeScript, Tailwind CSS
Backend	Python, FastAPI
AI/ML	Scikit-learn, XGBoost
Optimization	Google OR-Tools, CP-SAT
Data	Pandas, NumPy
Database	PostgreSQL / SQLite
Visualization	Recharts / Interactive Gantt


## 🛠️ Tech Stack

| Layer           | Technologies                    |
|-----------------|---------------------------------|
| Frontend        | React, TypeScript, Tailwind CSS |
| Backend         | Python, FastAPI                 |
| AI/ML           | Scikit-learn, XGBoost           |
| Optimization    | Google OR-Tools, CP-SAT         |
| Data            | Pandas, NumPy                   |
| Database        | PostgreSQL / SQLite             |
| Visualization   | Recharts / Interactive Gantt    |

---

## 🚀 Prototype Flow

```text
Network
   ↓
Asset Risk
   ↓
Criticality
   ↓
Maintenance Opportunities
   ↓
Train Impact
   ↓
Resources
   ↓
Block Optimization
   ↓
Weekly Plan
   ↓
Digital Twin
   ↓
Re-optimization
   ↓
Emergency Mode
   ↓
Explainability

```
## 🏆 Smart India Hackathon 2026

**Problem Statement:** SIH26027

**Theme:** Transportation & Logistics

**Category:** Software

### Vision

> **Transform independent railway maintenance planning into coordinated, intelligent, and adaptive block planning.**

---

## ⚠️ Disclaimer

RAILOPT-X is an academic research/prototype decision-support system using synthetic data. It is not connected to live railway operational systems and is not intended for real-world railway control. Real deployment would require validated operational data, railway-domain validation, approved safety procedures, authorized integration, testing, and human operational approval.
