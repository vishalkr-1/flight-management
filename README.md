# ✈️ Flight Management System

A modern Flight Management web application built using **React (Vite)**, **Tailwind CSS**, **Material UI**, and **JSON Server** for mock backend APIs. The project supports flight listing, filtering, CRUD operations, and optimized rendering using virtualization.

---

## 🚀 Features

- 📋 Flight listing with dynamic data
- 🔍 Search and filtering (status, date, etc.)
- ✏️ Add, edit, and delete flights
- ⚡ Optimized rendering using `react-window`
- 🎨 Responsive UI with Tailwind CSS + Material UI
- 🔗 API integration using Axios
- 🗄️ Mock backend using JSON Server

---

## 🧰 Tech Stack

- React 19 (Vite)
- Tailwind CSS
- Material UI (MUI)
- Axios
- React Router DOM
- React Window
- JSON Server

---

## 📁 Project Setup Instructions (All Steps)

### 1. Clone the Repository

```bash
git clone https://github.com/your-username/flight-management.git
cd flight-management
```

### 2. Install Dependencies

Install all required packages:

```bash
npm install
```

Install JSON Server globally:

```bash
npm install -g json-server
```

### 3. Start JSON Server (Mock Backend)

Make sure `db.json` exists in the root folder. Run JSON server:

```bash
npx json-server --watch db.json --port 5000
```

👉 API will run at:

```
http://localhost:5000
```

### 4. Start Frontend (React App)

```bash
npm run dev
```

👉 App will run at:

```
http://localhost:5173
```

### 5. Build for Production (Optional)

```bash
npm run build
```

### 6. Preview Production Build

```bash
npm run preview
```
