import { useState } from "react";
import { useDraggable } from "@dnd-kit/core";
import "./TaskCard.css";

function TaskCard(props) {
  const { task, setTasks } = props;
  const [isEditing, setIsEditing] = useState(false);
  const [editedTitle, setEditedTitle] = useState(task.title);

  if (!task) return null;

  const { attributes, listeners, setNodeRef, transform, isDragging } = useDraggable({
    id: task.id,
    disabled: isEditing, // Disable drag while editing
  });

  const style = {
    transform: transform
      ? `translate(${transform.x}px, ${transform.y}px)`
      : undefined,
  };

  const priority = task.priority ?? "medium";

  const deleteTask = () => {
    setTasks((prev) => prev.filter((t) => t.id !== task.id));
  };

  const moveTask = (direction) => {
    const statuses = ['todo', 'progress', 'done'];
    const currentIndex = statuses.indexOf(task.status);
    let newIndex = currentIndex;

    if (direction === 'left') {
      newIndex = Math.max(0, currentIndex - 1);
    } else {
      newIndex = Math.min(statuses.length - 1, currentIndex + 1);
    }

    if (newIndex !== currentIndex) {
      setTasks((prev) =>
        prev.map((t) =>
          t.id === task.id ? { ...t, status: statuses[newIndex] } : t
        )
      );
    }
  };

  const handleEdit = () => {
    if (editedTitle.trim() !== "") {
      setTasks((prev) =>
        prev.map((t) => (t.id === task.id ? { ...t, title: editedTitle } : t))
      );
    } else {
      setEditedTitle(task.title); // Revert if empty
    }
    setIsEditing(false);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleEdit();
    }
  };

  return (
    <div
      ref={setNodeRef}
      className={`task-card priority-${priority} ${isDragging ? 'dragging' : ''}`}
      style={style}
    >
      <div className="task-content">
        {isEditing ? (
          <input
            className="task-input-edit"
            value={editedTitle}
            onChange={(e) => setEditedTitle(e.target.value)}
            onBlur={handleEdit}
            onKeyDown={handleKeyDown}
            autoFocus
          />
        ) : (
          <p
            className="task-title"
            onClick={() => setIsEditing(true)}
            {...listeners}
            {...attributes}
          >
            {task.title}
          </p>
        )}
        <div className="task-actions">
          {task.status !== 'todo' && (
            <button className="task-move-btn" onClick={() => moveTask('left')} title="Move Left">
              ←
            </button>
          )}
          {task.status !== 'done' && (
            <button className="task-move-btn" onClick={() => moveTask('right')} title="Move Right">
              →
            </button>
          )}
          <button
            className="task-delete-btn"
            onClick={deleteTask}
            type="button"
            title="Delete"
          >
            ❌
          </button>
        </div>
      </div>
      <div className={`priority-badge ${priority}`}>
        {priority}
      </div>
    </div>
  );
}

export default TaskCard;
