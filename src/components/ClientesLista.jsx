import { useEffect } from "react";
import { useClientes } from "../context/ClientesContext";
import { useNavigate } from "react-router-dom";



function ClientesLista()
{
const navigate = useNavigate();
const {
    clientes,//obtiene lista compartida de clientescontext
    error,//obtiene el mensaje de error compartido
    cargarClientes,//funcion q consulta al backend
    eliminarClienteContext//elimina cliente y actualiza la lista
} = useClientes();

//DELETE
const handleEliminar = async (id) =>{
    const confirmar = window.confirm("¿Desea eliminar al cliente?");

    if (!confirmar) {
        return;
    }

    await eliminarClienteContext(id);
};

//GET

useEffect (() =>{//se ejecuta cuando se monta un componente
    
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



//Cuando se carga el componente ClientesLista, se ejecuta el useEffect.
//Este llama a cargarClientes, que viene del contexto.
//El contexto consulta los clientes al backend.


//Cuando recibe los datos, actualiza el estado compartido.
//React vuelve a renderizar la lista con los datos actualizados.