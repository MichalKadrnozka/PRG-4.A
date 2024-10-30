import React from "react";

// Typ pro task a funkce
interface TaskItemProps {
  task: {
    id: number;
    title: string;
    done: boolean;
  };
  toggleTaskStatus: (id: number) => void;
  deleteTask: (id: number) => void;
}

const TaskItem: React.FC<TaskItemProps> = ({ task, toggleTaskStatus, deleteTask }) => {
  return (
    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "10px" }}>
      <span>{task.title}</span>
      <div>
        <button onClick={() => toggleTaskStatus(task.id)}>
          {task.done ? "Undo" : "Done"}
        </button>
        <button onClick={() => deleteTask(task.id)}>Delete</button>
      </div>
    </div>
  );
};

export default TaskItem;