import { DndContext, useSensor, useSensors, PointerSensor } from "@dnd-kit/core";
import Column from "./Column";
import TaskForm from "./taskform";
import SearchBar from "./searchbar";
import "./Board.css";

function Board({ tasks, setTasks, searchTerm, setSearchTerm }) {
  const filteredTasks = tasks.filter((task) =>
    task.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 5,
      },
    })
  );

  // 🔁 When drag ends
  const handleDragEnd = (event) => {
    const { active, over } = event;

    if (!over) return;

    const taskId = active.id;
    const newStatus = over.id;

    setTasks((prev) =>
      prev.map((task) =>
        task.id === taskId ? { ...task, status: newStatus } : task
      )
    );
  };

  return (
    <>
      <h1 className="board-title">✨ My Kanban Board</h1>
      <div className="board-container">
        <div className="board-header">
          <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
          <TaskForm tasks={tasks} setTasks={setTasks} />
        </div>

        <DndContext sensors={sensors} onDragEnd={handleDragEnd}>
          <div className="columns-container">
            <Column title="To Do" status="todo" tasks={filteredTasks} setTasks={setTasks} />
            <Column title="In Progress" status="progress" tasks={filteredTasks} setTasks={setTasks} />
            <Column title="Done" status="done" tasks={filteredTasks} setTasks={setTasks} />
          </div>
        </DndContext>
      </div>
    </>
  );
}

export default Board;
