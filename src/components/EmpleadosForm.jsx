import { useState, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useEmpleados } from "../context/EmpleadosContext";

import {obtenerEmpleadoPorId,} from "../services/empleadosService";

function EmpleadosForm() {

    const [formulario, setFormulario] = useState({
        nombre: "",
        cargo: "",
        area: ""
    });

    const [error, setError] = useState("");
    const [cargando, setCargando] = useState(false);

    const navigate = useNavigate();
    const [searchParams] = useSearchParams();

    const id = searchParams.get("id");
    const {
    registrarEmpleadoContext,
    actualizarEmpleadoContext
} = useEmpleados();

    // Cargar datos cuando se edita un cliente
    useEffect(() => {
        const cargarEmpleados = async () => {
            if (!id) return;

            try {
                const datos = await obtenerEmpleadoPorId(id);
                setFormulario(datos);
            } catch (error) {
                console.error("Error al consultar empleado", error);
                setError("No se pudieron cargar los datos del empleado");
            }
        };

        cargarEmpleados();
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
        const cargo = formulario.cargo.trim();
        const area = formulario.area.trim();

        // Validar nombre
        if (!nombre) {
            return "El nombre es obligatorio";
        }

        if (!/^[\p{L}\p{M}\s'-]+$/u.test(nombre)) {
            return "El nombre solo debe contener letras y espacios";
        }

        // Validar cargo
        if (!cargo) {
            return "El cargo es obligatorio";
        }

        // Validar area
        if (!area) {
            return "la area es obligatoria";
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

        const datosEmpleado = {
            nombre: formulario.nombre.trim(),
            cargo: formulario.cargo.trim(),
            area: formulario.area.trim()
        };

        try {
            let resultado;
            if (id) {
               resultado = await actualizarEmpleadoContext(id, datosEmpleado);
            } else {
                resultado = await registrarEmpleadoContext(datosEmpleado);
            }

            if (resultado) {
    navigate("/empleados");
}

}
            finally {
            setCargando(false);
        }
    };

    return (
        <div className="formulario-contenedor">

            <h2 className="formulario-titulo">
                {id ? "Editar empleado" : "Registrar empleado"}
            </h2>

            {error && <p className="mensaje-error">{error}</p>}

            <form
                className="formulario-empleados"
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
                    <label>cargo:</label>
                    <input
                        type="text"
                        name="cargo"
                        value={formulario.cargo || ""}
                        onChange={handleChange}
                        required
                        placeholder="ingrese el cargo"
                    />
                </div>

                <div className="campo-formulario">
                    <label>Area:</label>
                    <input
                        type="text"
                        name="area"
                        value={formulario.area || ""}
                        onChange={handleChange}
                        required
                        placeholder="Ingrese el area"
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
                            : id ? "Actualizar empleado" : "Registrar empleado"}
                    </button>

                    <button
                        type="button"
                        className="btn-volver"
                        onClick={() => navigate("/empleados")}
                    >
                        Volver
                    </button>

                </div>

            </form>

        </div>
    );
}

export default EmpleadosForm;