import React, {useState}  from "react";

function Formulario() {

    const [datos, setDatos] = useState({
        nombre: "",
        edad: "",
        email: "",
    });


    const [error, setError] = useState(""); // valida la informacion
    const [submittedData, setSubmittedData] = useState(null);

    const manejarCambio = (evento) => {
        setDatos({
            ...datos,
            [evento.target.name]: evento.target.value, //captura el valor de input
        }); 
    };

    const validarEmail = (email) => {
        const re = /\S+@\S+\.\S+/;
        return re.test(email);
    }

    const manejarEnvio = (evento) => {
        evento.preventDefault();

        //validar campos vacios
        if(datos.nombre.trim() === "" || datos.edad.trim() === "")
        {
            setError("Todos los campos son obligatorios");
            setSubmittedData(null);
            return;
        }

        //validar email
        if (!validarEmail(datos.email)) {
            setError("Por favor ingresa un email válido (debe contener @ y dominio como .com)");
            setSubmittedData(null);
            return;
        }

        //validar edad
        if (isNaN(datos.edad)) {
            setError("La edad debe ser un número");
            setSubmittedData(null);
            return;
        }


        // si todo esta bien borra el error
        setError("");
        setSubmittedData({ ...datos });
    };

    return(
        <div style={{ maxWidth: "400px", margin: "0 auto" }}>
            <h2>Básico</h2>
            <form onSubmit={manejarEnvio}>
                <div style={{ marginBottom: "10px" }}>
                    <input
                        type="text"
                        name="nombre"
                        placeholder="Escribe tu nombre"
                        value={datos.nombre}
                        onChange={manejarCambio}
                        style={{ width: "100%", padding: "8px" }}
                    />
                </div>
        
                <div style={{ marginBottom: "10px" }}>
                    <input
                    type="number"
                    name="edad"
                    placeholder="Escribe tu edad"
                    value={datos.edad}
                    onChange={manejarCambio}
                    style={{ width: "100%", padding: "8px" }}
                    />
                </div>
        
                <div style={{ marginBottom: "10px" }}>
                    <input
                    type="text"
                    name="email"
                    placeholder="Escribe tu email"
                    value={datos.email}
                    onChange={manejarCambio}
                    style={{ width: "100%", padding: "8px" }}
                    />
                </div>
        
                <button type="submit" 
                    style={{
                    padding: "10px 15px",
                    backgroundColor: "#4CAF50",
                    color: "white",
                    border: "none",
                    borderRadius: "4px",
                    cursor: "pointer"
                    }}
                > Enviar </button>
        
                {error && <p style={{ color: "red", marginTop: "10px" }}>{error}</p>}
            </form>
    
            {submittedData && (
            <div style={{ marginTop: "20px", padding: "15px", border: "1px solid #ddd", borderRadius: "4px" }}>
                <h3>Datos enviados:</h3>
                <p> Nombre:{submittedData.nombre}</p>
                <p> Edad:{submittedData.edad}</p>
                <p> Email: {submittedData.email}</p>
            </div>
            )}
      </div>
    );
}

export default Formulario;
