
import { useState, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

import {
    obtenerClientePorId,
    crearCliente,
    actualizarCliente
} from "../services/clientesService";

function ClientesForm() {

    const [formulario, setFormulario] = useState({
        nombre: "",
        telefono: "",
        direccion: ""
    });

    const [error, setError] = useState("");
    const [cargando, setCargando] = useState(false);

    const navigate = useNavigate();
    const [searchParams] = useSearchParams();

    const id = searchParams.get("id");

    // Cargar datos cuando se edita un cliente
    useEffect(() => {
        const cargarCliente = async () => {
            if (!id) return;

            try {
                const datos = await obtenerClientePorId(id);
                setFormulario(datos);
            } catch (error) {
                console.error("Error al consultar cliente", error);
                setError("No se pudieron cargar los datos del cliente");
            }
        };

        cargarCliente();
    }, [id]);

    // Actualizar los campos del formulario
    const handleChange = (evento) => {
        const { name, value } = evento.target;

        setFormulario((actual) => ({
            ...actual,
            [name]: value
        }));
    };

    // Validar los datos antes de guardar
    const validarFormulario = () => {

        const nombre = formulario.nombre.trim();
        const telefono = formulario.telefono.trim();
        const direccion = formulario.direccion.trim();

        // Validar nombre
        if (!nombre) {
            return "El nombre es obligatorio";
        }

        if (!/^[\p{L}\p{M}\s'-]+$/u.test(nombre)) {
            return "El nombre solo debe contener letras y espacios";
        }

        // Validar teléfono
        if (!telefono) {
            return "El teléfono es obligatorio";
        }

        if (!/^\d{10}$/.test(telefono)) {
            return "El teléfono debe contener exactamente 10 números";
        }

        // Validar dirección
        if (!direccion) {
            return "La dirección es obligatoria";
        }

        if (direccion.length > 100) {
            return "La dirección no puede superar los 100 caracteres";
        }

        return "";
    };

    // Registrar o actualizar cliente
    const handleSubmit = async (evento) => {
        evento.preventDefault();
        setError("");

        const mensajeValidacion = validarFormulario();

        if (mensajeValidacion) {
            setError(mensajeValidacion);
            return;
        }

        setCargando(true);

        const datosCliente = {
            nombre: formulario.nombre.trim(),
            telefono: formulario.telefono.trim(),
            direccion: formulario.direccion.trim()
        };

        try {
            if (id) {
                await actualizarCliente(id, datosCliente);
            } else {
                await crearCliente(datosCliente);
            }

            navigate("/clientes");

        } catch (error) {
            console.error("Error al guardar cliente:", error);
            setError("No se pudo guardar la información del cliente");

        } finally {
            setCargando(false);
        }
    };

    return (
        <div className="formulario-contenedor">

            <h2 className="formulario-titulo">
                {id ? "Editar cliente" : "Registrar cliente"}
            </h2>

            {error && <p className="mensaje-error">{error}</p>}

            <form
                className="formulario-clientes"
                onSubmit={handleSubmit}
                noValidate
            >

                <div className="campo-formulario">
                    <label>Nombre:</label>
                    <input
                        type="text"
                        name="nombre"
                        value={formulario.nombre || ""}
                        onChange={handleChange}
                        required
                        placeholder="Ingrese el nombre"
                    />
                </div>

                <div className="campo-formulario">
                    <label>Teléfono:</label>
                    <input
                        type="text"
                        name="telefono"
                        value={formulario.telefono || ""}
                        onChange={handleChange}
                        required
                        inputMode="numeric"
                        placeholder="Ejemplo: 3001234567"
                    />
                </div>

                <div className="campo-formulario">
                    <label>Dirección:</label>
                    <input
                        type="text"
                        name="direccion"
                        value={formulario.direccion || ""}
                        onChange={handleChange}
                        required
                        placeholder="Ingrese la dirección"
                    />
                </div>

                <div className="botones-formulario">

                    <button
                        type="submit"
                        className="btn-guardar"
                        disabled={cargando}
                    >
                        {cargando
                            ? "Guardando..."
                            : id ? "Actualizar cliente" : "Registrar cliente"}
                    </button>

                    <button
                        type="button"
                        className="btn-volver"
                        onClick={() => navigate("/clientes")}
                    >
                        Volver
                    </button>

                </div>

            </form>

        </div>
    );
}

export default ClientesForm;
