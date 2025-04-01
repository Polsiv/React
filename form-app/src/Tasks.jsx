import React, { useState, useEffect } from "react";
import "./Tasks.css"; 

function Tasks() {
  const [task, setTask] = useState("");
  const [tasks, setTasks] = useState([]);
  const [editingIndex, setEditingIndex] = useState(null);

  useEffect(() => {
    const savedTasks = JSON.parse(localStorage.getItem("tasks"));
    if (savedTasks) {
      setTasks(savedTasks);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (task.trim() === "") return;

    if (editingIndex !== null) {
      const updatedTasks = [...tasks];
      updatedTasks[editingIndex] = task;
      setTasks(updatedTasks);
      setEditingIndex(null);
    } else {
      setTasks([...tasks, task]);
    }

    setTask("");
  };

  const deleteTask = (index) => {
    setTasks(tasks.filter((_, i) => i !== index));
  };

  const editTask = (index) => {
    setTask(tasks[index]);
    setEditingIndex(index);
  };

  const cleanTasks = () => {
    setTasks([]);
  };

  return (
    <div className="task-container">
      <h2>Lista de Tareas</h2>
      <form onSubmit={handleSubmit} className="task-form">
        <input
          type="text"
          placeholder="Escribe la tareita"
          value={task}
          onChange={(e) => setTask(e.target.value)}
        />
        <button type="submit">
          {editingIndex !== null ? "Actualizar" : "Agregar"}
        </button>
      </form>

      {tasks.length === 0 ? (
        <p className="no-tasks">No hay tareas pendientes</p>
      ) : (
        <ul className="task-list">
          {tasks.map((task, index) => (
            <li key={index} className="task-item">
              <span className="task-text">{task}</span>
              <div className="task-buttons">
                <button className="edit" onClick={() => editTask(index)}>Editar</button>
                <button className="delete" onClick={() => deleteTask(index)}>Eliminar</button>
              </div>
            </li>
          ))}
        </ul>
      )}
      {tasks.length > 0 && (
        <button className="clear-btn" onClick={cleanTasks}>
          Limpiar tareas
        </button>
      )}
    </div>
  );
}

export default Tasks;
