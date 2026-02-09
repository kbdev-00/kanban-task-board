import { useState, useEffect } from "react";
import Board from "./components/Board";
import "./index.css";

function App() {
  // 🔄 Load from localStorage on initialization (Lazy State)
  const [tasks, setTasks] = useState(() => {
    const savedTasks = localStorage.getItem("kanban_tasks");
    if (savedTasks) {
      try {
        const parsedTasks = JSON.parse(savedTasks);
        if (Array.isArray(parsedTasks)) {
          return parsedTasks;
        }
      } catch (error) {
        console.error("Failed to load tasks from localStorage:", error);
      }
    }
    return [];
  });

  const [searchTerm, setSearchTerm] = useState("");

  // 💾 Save to localStorage whenever tasks change
  useEffect(() => {
    localStorage.setItem("kanban_tasks", JSON.stringify(tasks));
  }, [tasks]);

  return (
    <div className="app">
      <div style={{ textAlign: "center", marginBottom: "2rem" }}>
        <h1>Kanban Task Board</h1>
        <p style={{
          color: "rgba(255, 255, 255, 0.7)",
          fontSize: "1.1em",
          marginTop: "-0.5rem"
        }}>
          Organize your tasks with style ✨
        </p>
      </div>

      <Board
        tasks={tasks}
        setTasks={setTasks}
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
      />
    </div>
  );
}

export default App;
