import React, { useState, useEffect } from "react";

import "./Users.css";

function Usuarios() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // toca ponerle timeout porque el tiempo de respuesta de la api es casi nulo.
    setTimeout(() => {
        fetch("https://jsonplaceholder.typicode.com/users")
        .then((response) => response.json())
        .then((data) => {
        setUsers(data);
        setLoading(false); 
        })
        .catch((error) => {
        console.error("Error al obtener los usuarios:", error);
        setLoading(false); 
        });
    }, 3000)
    
  }, []);

  return (
    <div className="usuarios-container">
    <h2 className="usuarios-title">Lista de Usuarios</h2>

    {loading ? ( 
      <p className="loading-text">Cargando...</p> 
    ) : (
      <ul className="usuarios-list">
        {users.map((user) => (
          <li key={user.id} className="usuarios-item">
            <strong className="usuarios-name">{user.name}</strong>
            <p className="usuarios-info">
              <strong>Usuario:</strong> {user.username}
            </p>
          </li>
        ))}
      </ul>
    )}
  </div>
 );
}

export default Usuarios;