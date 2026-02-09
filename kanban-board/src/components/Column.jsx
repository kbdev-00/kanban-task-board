import { useDroppable } from "@dnd-kit/core";
import TaskCard from "./TaskCard";
import "./Column.css";

function Column({ title, status, tasks, setTasks }) {
  const { setNodeRef, isOver } = useDroppable({
    id: status, // 🔑 VERY IMPORTANT
  });

  const columnTasks = tasks.filter(
    (task) => task && task.status === status
  );

  return (
    <div
      ref={setNodeRef}
      className={`column ${isOver ? 'drag-over' : ''}`}
    >
      <h2 className="column-title">
        {title}
        <span className="task-count">{columnTasks.length}</span>
      </h2>

      <div className="column-tasks">
        {columnTasks.map((task) => (
          <TaskCard key={task.id} task={task} setTasks={setTasks} />
        ))}
      </div>
    </div>
  );
}

export default Column;
