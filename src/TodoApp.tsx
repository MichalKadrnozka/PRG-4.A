// src/TodoApp.tsx
import React, { useState } from 'react';
import { FaCheck, FaTrash, FaUndo } from 'react-icons/fa'; // Import ikon
import './index.css';

interface Task {
  id: number;
  title: string;
  done: boolean;
  priority: number; // Přidáme priority
}

const TodoApp: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [newTask, setNewTask] = useState('');
  const [priority, setPriority] = useState(1); // Výchozí priorita

  const addTask = () => {
    if (newTask.trim() === '') return;
    const task: Task = { id: Date.now(), title: newTask, done: false, priority };
    setTasks([...tasks, task]);
    setNewTask('');
  };

  const toggleTask = (id: number) => {
    setTasks(tasks.map(task => 
      task.id === id ? { ...task, done: !task.done } : task
    ));
  };

  const deleteTask = (id: number) => {
    setTasks(tasks.filter(task => task.id !== id));
  };

  // Funkce pro renderování kolečka s barvou podle priority
  const renderPriorityColor = (priority: number) => {
    let color;
    switch (priority) {
      case 3: color = 'red'; break;    // Vysoká priorita
      case 2: color = 'orange'; break; // Střední priorita
      default: color = 'green';        // Nízká priorita
    }
    return <span className="priority-indicator" style={{ backgroundColor: color }} />;
  };

  // Funkce pro seřazení úkolů podle priority
  const sortTasks = (tasks: Task[]) => {
    return tasks.sort((a, b) => b.priority - a.priority);
  };

  return (
    <div className="todo-container">
      <h1>To-Do List</h1>
      <div className="add-task">
        <input
          type="text"
          className="input"
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
          placeholder="Add a new task"
        />
        <select value={priority} onChange={(e) => setPriority(Number(e.target.value))} className="priority-select">
          <option value={1}>{renderPriorityColor(1)}🟢 Low</option>
          <option value={2}>{renderPriorityColor(2)}🟡 Medium</option>
          <option value={3}>{renderPriorityColor(3)}🔴 High</option>
        </select>
        <button className="add-button" onClick={addTask}>Add</button>
      </div>
      <div className="task-columns">
        <div className="todo-column">
          <h2>Pending Tasks</h2>
          <ul className="task-list">
            {sortTasks(tasks.filter(task => !task.done)).map(task => (
              <li key={task.id} className="task-item">
                <div className="task-indicator" style={{ backgroundColor: task.priority === 3 ? 'red' : task.priority === 2 ? 'orange' : 'green' }}></div>
                <span className="task-title">{task.title}</span>
                <div style={{ marginLeft: 'auto' }}>
                  <button className="done-button" onClick={() => toggleTask(task.id)}>
                    <FaCheck />
                  </button>
                  <button className="delete-button" onClick={() => deleteTask(task.id)}>
                    <FaTrash />
                  </button>
                </div>
              </li>
            ))}
          </ul>
        </div>
        <div className="done-column">
          <h2>Completed Tasks</h2>
          <ul className="task-list">
            {sortTasks(tasks.filter(task => task.done)).map(task => (
              <li key={task.id} className="task-item done">
                <div className="task-indicator" style={{ backgroundColor: task.priority === 3 ? 'red' : task.priority === 2 ? 'orange' : 'green' }}></div>
                <span className="task-title">{task.title}</span>
                <div style={{ marginLeft: 'auto' }}>
                  <button className="undo-button" onClick={() => toggleTask(task.id)}>
                    <FaUndo />
                  </button>
                  <button className="delete-button" onClick={() => deleteTask(task.id)}>
                    <FaTrash />
                  </button>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default TodoApp;
