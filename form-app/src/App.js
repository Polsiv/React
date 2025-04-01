import React from 'react';
import Formulario from './Form';
import Tasks from './Tasks';
import Usuarios from './Users'

function App() {
  return (
    <div className="App">
      <Usuarios/>
      <Tasks/>
      <Formulario/>
    </div>
  );
}

export default App;