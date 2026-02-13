# 🧩 React Kanban Task Board – Level 3 (Mission 5)

A fully functional Trello-like Kanban Task Management Application built using **React + Vite** as part of the Prodesk IT Internship – Mission 5.

This project demonstrates modern frontend engineering practices including component architecture, state management, drag-and-drop interaction, and persistent storage.

---

# 🚀 Live Demo

🔗 [try once](https://kanban-task-board-cufs.vercel.app/)

---

# 📌 Project Overview

The React Kanban Task Board is a task management application that allows users to:

- Create tasks
- Categorize tasks into workflow stages
- Assign priority levels
- Move tasks dynamically
- Search and filter tasks
- Persist tasks after refresh

The application follows the **React state-driven UI model**, where UI automatically updates when state changes.

---

# 🏗 Application Workflow

The application consists of three primary workflow stages:

1. 📝 To Do  
2. ⏳ In Progress  
3. ✅ Done  

Each task moves between these columns based on its `status` value.

---

# 🧠 Core Architecture

All tasks are stored in a single centralized React state:

```js
{
  id: Date.now(),
  title: "Complete Internship Project",
  status: "todo",
  priority: "high"
}
