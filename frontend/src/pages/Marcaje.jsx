import { useState } from "react";
import { marcarEmpleado } from "../services/marcajeService";

function Marcaje() {

    const [codigo, setCodigo] = useState("");
    const [mensaje, setMensaje] = useState("");
    const [hora, setHora] = useState("");

    const registrar = async () => {

        if (!codigo.trim()) {

            alert("Ingrese el código del empleado.");

            return;

        }

        try {

            const data = await marcarEmpleado(codigo);

            setMensaje(`${data.empleado} - ${data.estado}`);

            setHora(
                new Date(data.hora).toLocaleTimeString()
            );

            setCodigo("");

        } catch (error) {

            setMensaje("Empleado no encontrado");

            setHora("");

        }

    };

    return (

        <div>

            <h1>🕒 Marcaje de Asistencia</h1>

            <div className="marcaje-box">

                <input
                    type="text"
                    placeholder="Ingrese el código del empleado"
                    value={codigo}
                    onChange={(e) => setCodigo(e.target.value.toUpperCase())}
                    onKeyDown={(e) => {
                        if (e.key === "Enter") {
                            registrar();
                        }
                    }}
                    autoFocus
                />

                <button onClick={registrar}>
                    Registrar
                </button>

            </div>

            {mensaje && (

                <div className="resultado">

                    <h2>{mensaje}</h2>

                    <h3>{hora}</h3>

                </div>

            )}

        </div>

    );

}

export default Marcaje;