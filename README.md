
| **Course** | SENG5232 – Software Architecture and Design |
|:---|:---|
| **Author** | Zewde Bekele |
| **Student ID** | ugr/188847/16 |
| **Section** | 2 |
| **Instructor** | Mesele Niguse |
| **Date** | May 2026 |
| **Version** | 2.0 (Redesigned Architecture) |

---

## 📌 Important Note

This prototype implements the **complete redesigned architecture** as specified in the ASRS document. The following components are fully implemented:

| Component | Status | Location |
|:---|:---|:---|
| Facade Pattern | ✅ Implemented | src/patterns/VKSAppFacade.js |
| Command Pattern | ✅ Implemented | src/patterns/SyncQueueManager.js |
| Factory Pattern | ✅ Implemented | src/patterns/MediaCompressor.js |
| Proxy Pattern | ✅ Implemented | src/patterns/ImageProxy.js |
| State Pattern | ✅ Implemented | src/patterns/SyncStateManager.js |
| Service Worker | ✅ Implemented | public/sw.js |
| WebRTC for peer sync | ✅ Simulated | Sync tab in UI |
| AWS af-south-1 region | ✅ Documented | This README |

---

## 🎯 What This my Prototype Represents

The **Village Knowledge System (VKS)** is an **offline-first community platform** designed for rural villages in **Ethiopia**.

| Capability | How It Works |
|:---|:---|
| **Report Problems** | Voice (2 min) or text, select category, submit in 3 taps |
| **Share Knowledge** | Community answers, Champions verify with trust badge |
| **Access Information** | Offline library with voice search and TTS in 3 languages |
| **Sync Offline** | Bluetooth (10-50m), WiFi Direct (50-100m), USB data mule |

---

## 🏗️ Architecture: Layered (N-Tier) + Client-Server
PRESENTATION LAYER (React)
│ HTTP/REST
APPLICATION LAYER (Node.js + Express)

Facade Pattern | Command Pattern | Factory Pattern

Proxy Pattern | State Pattern
│ SQL
DATA ACCESS LAYER (PostgreSQL)

Problems Table | Answers Table | Users Table

text

---

## 🎨 Five Design Patterns those i have Implemented

| # | Pattern | Purpose |
|:-:|:---|:---|
| 1 | **Facade Pattern** | Simplifies complex offline subsystems for UI |
| 2 | **Command Pattern** | Encapsulates sync requests for retry/rollback |
| 3 | **Factory Pattern** | Creates voice vs image compressors dynamically |
| 4 | **Proxy Pattern** | Lazy loads images from disk only when viewed |
| 5 | **State Pattern** | Manages sync states (IDLE/SYNCING/COMPLETED/FAILED) |

---

## 📁 Complete File Structure
vks-fullstack/
├── backend/
│ ├── db/database.js
│ ├── models/Problem.js
│ ├── routes/api.js
│ └── server.js
├── frontend/
│ ├── public/sw.js
│ ├── src/
│ │ ├── patterns/
│ │ │ ├── VKSAppFacade.js
│ │ │ ├── SyncQueueManager.js
│ │ │ ├── MediaCompressor.js
│ │ │ ├── ImageProxy.js
│ │ │ └── SyncStateManager.js
│ │ ├── App.jsx
│ │ ├── App.css
│ │ └── main.jsx
│ └── index.html
└── README.md

text

---

## 📡 Technology Stack that i use (Version 2.0)

| Component | Version 1.0 | Version 2.0 (Redesigned) |
|:---|:---|:---|
| Mobile App | Flutter | React (browser-based) |
| Edge Server | Python/FastAPI | Node.js Server |
| Cloud Database | Generic PostgreSQL | PostgreSQL on AWS RDS |
| Peer Sync | Raw Bluetooth | WebRTC + Service Workers |
| AWS Region | Not specified | af-south-1 (Cape Town) |
| Offline Support | Basic IndexedDB | Service Workers + IndexedDB |

---

## 🌐 WebRTC Peer Sync (Redesigned v2.0)

- Browser-to-browser real-time communication
- No plugins required - works in Chrome/Firefox
- Range: 10-50 meters
- Speed: 100-500 Kbps

---

## ✅ All ASRs that i have Implemented

- **Frontend (F-01 to F-05)** - Voice reporting, 3 languages, 500MB limit
- **Backend (B-01 to B-05)** - Solar Pi, add-only policy, champion badge
- **DevOps (D-01 to D-05)** - USB updates, DR drills, log retention
- **Logic (L-01 to L-05)** - Peer redundancy, Bluetooth sync, auto-delete

All 20 ASRs are demonstrated in the Sync tab.

---

## 📊 Quality Report Summary

| Quality | Score |
|:---|:---|
| Scalability | 4/5 |
| Maintainability | 5/5 |
| Performance | 4/5 |
| Availability | 5/5 |
| Usability | 5/5 |
| Security | 3/5 |

### Trade-off Analysis

| Trade-off | Decision |
|:---|:---|
| Real-time cloud vs USB sync | USB weekly sync |
| ML vs Champion verification | Champion verification |
| Video vs voice/photo | Voice + photo only |

---

## 🚀 How to Run Locally

### Prerequisites: Node.js (v18+) + PostgreSQL (v14+)

```bash
# Clone
git clone https://github.com/kua-University/VKS-Prototype.git
cd VKS-Prototype

# Backend
cd backend && npm install && npm run dev

# Frontend (new terminal)
cd frontend && npm install && npm run dev
Frontend: http://localhost:5173

Backend API: http://localhost:5000

📊 Database Setup SQL
sql
CREATE DATABASE vks_db;
\c vks_db;

CREATE TABLE problems (
    id SERIAL PRIMARY KEY,
    problem_id VARCHAR(100) UNIQUE NOT NULL,
    user_phone_hash VARCHAR(255),
    category VARCHAR(50),
    text TEXT,
    voice_base64 TEXT,
    timestamp BIGINT,
    is_synced BOOLEAN DEFAULT FALSE,
    upvotes INTEGER DEFAULT 0
);

CREATE TABLE answers (
    id SERIAL PRIMARY KEY,
    answer_id VARCHAR(100) UNIQUE NOT NULL,
    problem_id VARCHAR(100),
    text TEXT,
    is_champion_verified BOOLEAN DEFAULT FALSE,
    timestamp BIGINT,
    upvotes INTEGER DEFAULT 0
);
🔗 Links
GitHub Repository: https://github.com/kua-University/VKS-Prototype

👨‍💻 Author
Zewde Bekele | ugr/188847/16 | Section 2
Course: SENG5232 – Software Architecture and Design
Instructor: Mesele Niguse
University: Mekelle University

© 2026 - Village Knowledge System - Complete Redesigned Architecture v2.0

text

---

## STEP 4: Save and exit nano

- Press `Ctrl + O` (save)
- Press `Enter` (confirm)
- Press `Ctrl + X` (exit)

---

## STEP 5: Verify the file

```bash
head -10 README.md
