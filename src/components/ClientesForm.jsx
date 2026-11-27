
import { useState, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useClientes } from "../context/ClientesContext";
import { obtenerClientePorId } from "../services/clientesService";

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

    const {
        registrarClienteContext,
        actualizarClienteContext
    } = useClientes();

    // Cargar datos cuando se edita un cliente
    useEffect(() => {
        const cargarCliente = async () => {
            if (!id) return;

            try {
                const datos = await obtenerClientePorId(id);
                setFormulario(datos);
            } catch (error) {
                console.error("Error al consultar cliente:", error);
                setError("No se pudieron cargar los datos del cliente");
            }
        };

        cargarCliente();
    }, [id]);

    // Actualizar estados cuando escribimos
    const handleChange = (evento) => {
        const { name, value } = evento.target;

        setFormulario((actual) => ({
            ...actual,
            [name]: value
        }));
    };

    // Validar formulario
    const validarFormulario = () => {
        const { nombre, telefono, direccion } = formulario;

        if (!nombre.trim()) {
            return "El nombre es obligatorio";
        }

        if (!/^[\p{L}\p{M}\s'-]+$/u.test(nombre)) {
            return "El nombre solo debe contener letras y espacios";
        }

        if (!telefono.trim()) {
            return "El teléfono es obligatorio";
        }

        if (!/^\d{10}$/.test(telefono.trim())) {
            return "El teléfono debe contener exactamente 10 números";
        }

        if (!direccion.trim()) {
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
            let resultado;

            if (id) {
                resultado = await actualizarClienteContext(id, datosCliente);
            } else {
                resultado = await registrarClienteContext(datosCliente);
            }

            if (resultado !== false) {
                navigate("/clientes");
            }

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

            <form className="formulario-clientes" onSubmit={handleSubmit}>

                <div className="campo-formulario">
                    <label>Nombre:</label>
                    <input
                        type="text"
                        name="nombre"
                        value={formulario.nombre || ""}
                        onChange={handleChange}
                        required
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
