# 🌾 Village Knowledge System (VKS) - Full-Stack Architecture

Course: SENG5232 – Software Architecture and Design  
Author: Zewde Bekele, ID:ugr/188847/16, Section:2  
Submitted to Instructor:Mesele Niguse  
Date:May 2026,  Version:2.0 (Redesigned Architecture)

---

## 📌 Important Note to the Instructor

This prototype implements the **complete redesigned architecture** as specified in the ASRS document. The following components are fully implemented:

| Component | Status | Location |
| :--- | :--- | :--- |
| Facade Pattern (VKSAppFacade) | ✅ Implemented | `src/patterns/VKSAppFacade.js` |
| Command Pattern (SyncQueueManager) | ✅ Implemented | `src/patterns/SyncQueueManager.js` |
| Factory Pattern (MediaCompressor) | ✅ Implemented | `src/patterns/MediaCompressor.js` |
| Proxy Pattern (ImageProxy) | ✅ Implemented | `src/patterns/ImageProxy.js` |
| State Pattern (SyncStateManager) | ✅ Implemented | `src/patterns/SyncStateManager.js` |
| Service Worker (Offline) | ✅ Implemented | `public/sw.js` |
| WebRTC for peer sync | ✅ Simulated | Sync tab in UI |
| AWS af-south-1 region | ✅ Documented | This README |

---

## 🏗️ Redesigned Architecture (Version 2.0)

### Architecture Style: Layered (N-Tier) + Client-Server with 5 Design Patterns

---

## 🎨 Five Added Design Patterns (Version 2.0)

| # | Pattern | Location | Purpose |
|:-:|:---|:---|:---|
| 1 | **Facade Pattern** | `patterns/VKSAppFacade.js` | Simplifies complex offline subsystems for UI |
| 2 | **Command Pattern** | `patterns/SyncQueueManager.js` | Encapsulates sync requests for retry/rollback |
| 3 | **Factory Pattern** | `patterns/MediaCompressor.js` | Creates voice vs image compressors dynamically |
| 4 | **Proxy Pattern** | `patterns/ImageProxy.js` | Lazy loads images from disk only when viewed |
| 5 | **State Pattern** | `patterns/SyncStateManager.js` | Manages sync states (IDLE/SYNCING/COMPLETED/FAILED) |

---

## 📁 Complete File Structure (Post-Redesign)

---

## 📡 Technology Stack (Version 2.0)

| Component | Version 1.0 | Version 2.0 (Redesigned) |
|:---|:---|:---|
| **Mobile App** | Flutter | React (browser-based) |
| **Edge Server** | Python/FastAPI | Node.js Server |
| **Cloud Database** | Generic PostgreSQL | PostgreSQL on AWS RDS |
| **Peer Sync** | Raw Bluetooth | WebRTC + Service Workers |
| **AWS Region** | Not specified | af-south-1 (Cape Town) |
| **Offline Support** | Basic IndexedDB | Service Workers + IndexedDB |
| **Design Patterns** | 3 patterns | 8 patterns (+5) |

---

## 🔄 Redesigned Context Diagram (Version 2.0)

### Key Changes:
- **Stack labels inside system box:** React + Node.js + PostgreSQL
- **Cloud communication path:** Only via USB data mule (no direct internet)
- **Admin access constraint:** Regional Admin accesses from regional hub only
- **Purpose:** Helps stakeholders understand technologies powering the system

### Visual Representation:
---

## 🔄 Redesigned Component Diagram (Version 2.0)

### Key Changes:
- **Added 5 new design patterns** (Facade, Command, Factory, Proxy, State)
- **Frontend:** React UI (not Flutter)
- **Backend:** Node.js (not Python)
- **Cloud Database:** PostgreSQL on AWS RDS

### Component Hierarchy:

---

## 🔄 Redesigned Deployment Diagram (Version 2.0)

### Key Changes:
- **Phone:** React app (browser-based) instead of Flutter
- **Pi:** Node.js server instead of Python/FastAPI
- **Cloud:** PostgreSQL on AWS RDS
- **Sync:** WebRTC for peer-to-peer (simulated)
- **AWS Region:** af-south-1 (Cape Town)

### Deployment Nodes:

---

## ✅ DevOps ASRs Implemented (D-01 to D-05)

| ASR | Requirement | Implementation |
|:---|:---|:---|
| **D-01** | System updates via USB without internet | USB Update button (simulated) |
| **D-02** | Disaster recovery drills <2 hours | DR Drill button with timer |
| **D-03** | Log retention (7d/10MB, 30d/100MB, 90d) | View Logs button with retention info |
| **D-04** | Backup hierarchy: Peer → Pi → USB → Cloud | Backup Hierarchy button |
| **D-05** | Offline monitoring (no Prometheus/Grafana) | Offline Monitoring button |

---

## 🔗 Logic/Business ASRs Implemented (L-01 to L-05)

| ASR | Requirement | Implementation |
|:---|:---|:---|
| **L-01** | Problems stored on 3+ peer phones | Peer Redundancy button |
| **L-02** | Bluetooth sync <3 min for 100 Q&As | Bluetooth Sync button with timing |
| **L-03** | Sync methods: Bluetooth, WiFi Direct, USB | Sync Methods button |
| **L-04** | Auto-delete: Phone (90d), Pi (180d) | Auto-Delete Policy button |
| **L-05** | Library articles expire after 6 months | Library Expiry button |

---

## 🚀 How to Run the Complete System

### Prerequisites
- Node.js (v18+)
- PostgreSQL (v14+)

### Step 1: Clone and Setup Backend
```bash
git clone https://github.com/kua-University/VKS-Prototype.git
cd VKS-Prototype/backend
npm install
cp .env.example .env  # Update database credentials
# Create PostgreSQL database (see SQL below)
npm run dev
