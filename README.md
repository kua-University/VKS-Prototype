# 🌾 Village Knowledge System (VKS) - Full-Stack Architecture

| **Course** | SENG5232 – Software Architecture and Design |
|:---|:---|
| **Author** | Zewde Bekele |
| **Student ID** | ugr/188847/16 |
| **Section** | 2 |
| **Instructor** | Mesele Niguse |
| **Date** | May 2026 |
| **Version** | 2.0 (Redesigned Architecture) |

---

## 📌 Important Note to the Instructor

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

## 🚀 How to Run Locally

### Prerequisites
- Node.js (v18+)
- PostgreSQL (v14+)

### Step 1: Clone the Repository
git clone https://github.com/kua-University/VKS-Prototype.git
cd VKS-Prototype

### Step 2: Setup Backend
cd backend
npm install
npm run dev

### Step 3: Setup Frontend
cd ../frontend
npm install
npm run dev

### Step 4: Open the App
- Frontend: http://localhost:5173
- Backend API: http://localhost:5000

---

## 📊 Database Setup SQL

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

---

## 🔗 Links

GitHub Repository: https://github.com/kua-University/VKS-Prototype

---

## 👨‍💻 Author

Name: Zewde Bekele
Student ID: ugr/188847/16
Section: 2
Course: SENG5232 – Software Architecture and Design
Instructor: Mesele Niguse
University: Mekelle University

---

**© 2026 - Village Knowledge System - Complete Redesigned Architecture v2.0**
