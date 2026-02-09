import { useState } from "react";
import "./TaskForm.css";

function TaskForm({ tasks, setTasks }) {
  const [title, setTitle] = useState("");
  const [priority, setPriority] = useState("medium");

  const addTask = () => {
    if (title.trim() === "") return;

    const newTask = {
      id: Date.now(),
      title: title,
      status: "todo",
      priority: priority,
    };

    setTasks([...tasks, newTask]);
    setTitle("");
    setPriority("medium");
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      addTask();
    }
  };

  return (
    <div className="task-form">
      <input
        type="text"
        placeholder="Enter task..."
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        onKeyPress={handleKeyPress}
        className="task-input"
      />

      <select
        value={priority}
        onChange={(e) => setPriority(e.target.value)}
        className="priority-select"
      >
        <option value="high">High</option>
        <option value="medium">Medium</option>
        <option value="low">Low</option>
      </select>

      <button onClick={addTask} className="add-task-btn">
        ➕ Add Task
      </button>
    </div>
  );
}

export default TaskForm;
