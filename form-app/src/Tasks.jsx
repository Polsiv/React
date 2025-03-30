import React, { useState, useEffect } from "react";

function Tasks() {
  const [task, setTask] = useState("");
  const [tasks, setTasks] = useState([]);
  const [editingIndex, setEditingIndex] = useState(null); // Estado para la edición

  // Cargar tareas desde el localStorage
  useEffect(() => {
    const savedTasks = JSON.parse(localStorage.getItem("tasks"));
    if (savedTasks) {
      setTasks(savedTasks);
    }
  }, []);

  // Guardar tareas en el localStorage
  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (task.trim() === "") return;

    if (editingIndex !== null) {
      // Editar tarea existente
      const updatedTasks = [...tasks];
      updatedTasks[editingIndex] = task;
      setTasks(updatedTasks);
      setEditingIndex(null);
    } else {
      // Agregar nueva tarea
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
    <div>
      <h2>LISTA TAREAS</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Escribe tu tarea"
          value={task}
          onChange={(e) => setTask(e.target.value)}
        />
        <button type="submit">
          {editingIndex !== null ? "Actualizar" : "Agregar"}
        </button>
      </form>

      {tasks.length === 0 ? (
        <p>No hay tareas</p>
      ) : (
        <ul>
          {tasks.map((task, index) => (
            <li key={index}>
              <p>{task}</p>
              <button onClick={() => editTask(index)}>✏️ Editar</button>
              <button onClick={() => deleteTask(index)}>❌ Eliminar</button>
            </li>
          ))}
        </ul>
      )}
      <button onClick={cleanTasks}>Limpiar tareas</button>
    </div>
  );
}

export default Tasks;
