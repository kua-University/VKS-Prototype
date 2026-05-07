# 🌾 Village Knowledge System (VKS) - Full-Stack Architecture

**Course:** SENG5232 – Software Architecture and Design  
**Author:** Zewde Bekele  
**Date:** May 2026  
**Architecture Version:** 3.1.0 (Prototype Implementation)

---

## 📌 Important Note to the Instructor

This prototype implements a **functional subset** of the redesigned architecture documented in the ASRS. The focus of this prototype is to demonstrate:

1. **Working end-to-end functionality** (voice reporting, API communication, database persistence)
2. **Core architectural patterns** (Layered Architecture, Client-Server, Repository, Singleton)
3. **Offline-first capabilities** (IndexedDB + sync simulation)
4. **Full-stack integration** (React + Node.js + PostgreSQL)

### Patterns from Redesigned Document NOT in This Prototype

| Pattern | Reason for Exclusion |
| :--- | :--- |
| **Facade Pattern** | Prototype complexity kept low; UI directly calls API layer |
| **Command Pattern** | Sync is simulated; production version would need queued commands |
| **Factory Pattern (Full)** | ID generation implemented; media compressor factory omitted for simplicity |
| **Proxy Pattern** | Images not heavily used in prototype |
| **State Pattern** | Sync states simplified to boolean flag for demo clarity |

### Why These Decisions Were Made

> *"The goal of this prototype is to demonstrate a **working system** that validates the core architectural decisions. The missing patterns are **theoretical refinements** intended for a production-grade implementation. They are fully specified in the ASRS document and can be integrated without changing the core architecture."*

---

## 🏗️ Implemented Architecture

### Architecture Style: Layered (N-Tier) + Client-Server

The prototype implements **4 functional layers**:

| Layer | Responsibility | Technologies |
| :--- | :--- | :--- |
| **Presentation Layer** | User interface, voice recording, language selection | React, Vite, Web Speech API |
| **Application Layer** | Business logic, API endpoints | Node.js, Express.js |
| **Data Access Layer** | Database queries | PostgreSQL `pg` driver |
| **Database Layer** | Raw data storage | PostgreSQL |

### Visual Architecture:


---

## 🎨 Implemented Design Patterns

| Pattern | Location | Purpose | Status |
| :--- | :--- | :--- | :--- |
| **Layered Architecture** | Entire system | Separation of concerns | ✅ Fully Implemented |
| **Client-Server** | Frontend ↔ Backend | Distributed processing | ✅ Fully Implemented |
| **REST API** | Backend endpoints | Stateless communication | ✅ Fully Implemented |
| **Repository Pattern** | `backend/models/Problem.js` | Abstracts database logic | ✅ Fully Implemented |
| **Singleton Pattern** | `backend/db/database.js` | Single connection pool | ✅ Fully Implemented |
| **Observer Pattern** | React `useState/useEffect` | UI responds to state | ✅ Fully Implemented |
| **Factory Pattern (Partial)** | ID generation in `server.js` | Creates unique identifiers | ⚠️ Partial Implementation |

### Patterns Defined in Redesigned Doc (Not in Prototype)

| Pattern | Intended Location | Reason for Exclusion |
| :--- | :--- | :--- |
| **Facade Pattern** | `VKSAppFacade` class | UI directly calls API; facade would add complexity without benefit for prototype |
| **Command Pattern** | `SyncQueueManager` | Sync is simulated; real queuing needed only for production |
| **Factory Pattern (Full)** | `MediaCompressorFactory` | Voice/image compression handled by browser APIs directly |
| **Proxy Pattern** | `ImageProxy` | Images not heavily used in this prototype |
| **State Pattern** | `SyncStateManager` | Sync states simplified to boolean for demo clarity |

---

## 📁 File Structure with Responsibilities


---

## 🔄 Component Communication

---

## 📡 REST API Endpoints (Fully Implemented)

| Method | Endpoint | Description |
| :--- | :--- | :--- |
| `GET` | `/api/problems` | Fetch all problems with answers |
| `POST` | `/api/problems` | Create new problem (voice or text) |
| `POST` | `/api/answers` | Add answer to problem |
| `GET` | `/api/stats` | Get system statistics |
| `GET` | `/health` | Server health check |

---

## 🔀 Data Flow (End-to-End)

---

## 📊 Database Schema

### problems table
| Column | Type | Description |
| :--- | :--- | :--- |
| `id` | SERIAL | Primary key |
| `problem_id` | VARCHAR(100) | Unique identifier (Factory Pattern) |
| `user_phone_hash` | VARCHAR(255) | Hashed for privacy |
| `category` | VARCHAR(50) | crop/animal/health/water/market/weather |
| `text` | TEXT | Problem description |
| `voice_base64` | TEXT | Base64 audio |
| `timestamp` | BIGINT | Unix timestamp |
| `is_synced` | BOOLEAN | Sync status |

---

## 🚀 How to Run

### Prerequisites
- Node.js (v18+)
- PostgreSQL (v14+)

### Step 1: Clone and Setup Backend
```bash
git clone https://github.com/zewdebekele/vks-fullstack.git
cd vks-fullstack/backend
npm install
cp .env.example .env  # Update database credentials
# Create PostgreSQL database (see SQL in documentation)
npm run dev
## 🚀 How to Run the Project

### Prerequisites
- Node.js (v18+)
- PostgreSQL (v14+)

### Step 1: Clone the Repository
```bash
git clone https://github.com/zewdebekele/vks-fullstack.git
cd vks-fullstack
