import { useState,useEffect} from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

import{
    obtenerClientePorId,
    crearCliente,
    actualizarCliente
} from "../services/clientesService";

function ClientesForm(){
    //estados del form
    const [formulario,setFormulario] = useState({
        nombre :"",
        telefono:"",
        direccion:""
    });

    const [error,setError] = useState("");
    const [cargando,setCargando] = useState(false);

    const navigate = useNavigate();
    const [searchParams] = useSearchParams();//permite leer los parametros de la url


//obtener el id de la url
const id = searchParams.get("id");

//consulta de datos cuando se este editando
useEffect(() =>{//consulta el cliente por medio de obtener cliente por id y coloca sus datos con el set formulario(datos)
    const cargarCliente = async () =>{
        if(!id) return;

        try{
            const datos = await obtenerClientePorId(id);
            setFormulario(datos);
        }catch (error){
            console.error("Error al consultar cliente", error);
            setError("No se pudieron cargar los datos del cliente");

        }
    };

cargarCliente();
}, [id]);



//actualiza los estado cuando escribimos
const handleChange = (evento)=>{//se actualiza el estado al escribir en los campos
    const {name,value} = evento.target;
    setFormulario((actual)=>({//representa datos actuales
        ...actual,//conserva los demas campos
        [name]: value//actualiza el campo q se modifico
    }));
};


//registrar o actualizar
const handleSubmit = async (evento) =>{
    evento.preventDefault();
    setError("");
    setCargando(true)

    try{
        if(id){
            await actualizarCliente(id,formulario);
        }else{
            await crearCliente(formulario);
        }
        navigate ("/clientes");
    
}

catch (error) {
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