import { useState,useEffect } from "react";
import { obtenerClientes,eliminarCliente } from "../services/clientesService";
import { useNavigate } from "react-router-dom";



function ClientesLista()
{
const navigate = useNavigate();
const [clientes, setClientes] = useState([]);//guarda la lista clientes y el mensaje de error
const[error, setError] = useState("");



//DELETE
const handleEliminar = async (id) =>{
    const confirmar = window.confirm("¿Desea eliminar al cliente?");

    if(!confirmar){
        return;
    }

    try{
       await eliminarCliente(id);//actualiza el estado
       setClientes((clienteActuales)=>
        clienteActuales.filter(//se compara el id de cada cliente con el q se quiere eliminar
           (cliente) => cliente.id_cliente !== id
        )
    );
    }catch(error){
        console.error("error al eliminar el cliente",error);
        setError("no se puedo eliminar el cliente");
    }
};


//GET

useEffect (() =>{//se ejecuta cuando se monta un componente

    const cargarClientes = async () =>{
        try{
            const datos = await obtenerClientes();
            setClientes(datos);
        }catch(error)
        {
        console.error("Error al obtener clientes",error);
        setError("No se pudieron cargar los clientes");
        }
    };

    cargarClientes();


},[]);//use effect  ejecuta la consulta al montarce el componente


return (
        <div className="clientes-contenedor">

            <h2 className="clientes-titulo">Lista de clientes</h2>

            {error && <p className="mensaje-error">{error}</p>}

            <div className="clientes-encabezado">
                <p>Total de clientes: {clientes.length}</p>

                <button
                    className="btn-registrar"
                    onClick={() => navigate("/clientes/formulario")}
                >
                    + Registrar cliente
                </button>
            </div>

            <div className="tabla-contenedor">
                <table className="tabla-clientes">

                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Nombre</th>
                            <th>Teléfono</th>
                            <th>Dirección</th>
                            <th>Acciones</th>
                        </tr>
                    </thead>

                    <tbody>
                        {clientes.map((cliente) => (
                            <tr key={cliente.id_cliente}>
                                <td>{cliente.id_cliente}</td>
                                <td>{cliente.nombre}</td>
                                <td>{cliente.telefono}</td>
                                <td>{cliente.direccion}</td>

                                <td className="acciones">

                                    <button
                                        className="btn-editar"
                                        onClick={() => navigate(`/clientes/formulario?id=${cliente.id_cliente}`)}
                                    >
                                        ✏️
                                    </button>

                                    <button
                                        className="btn-eliminar"
                                        onClick={() => handleEliminar(cliente.id_cliente)}
                                    >
                                        🗑️
                                    </button>

                                </td>
                            </tr>
                        ))}
                    </tbody>

                </table>
            </div>

        </div>
    );
}

export default ClientesLista;








////key ayuda al dom virtual identificar elementos añadidos o modificados,eliminados
//keycliente.id_cliente permite a react identificar cada fila por su id