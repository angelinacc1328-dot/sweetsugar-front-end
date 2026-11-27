import { useEffect } from "react";
import { useEmpleados } from "../context/EmpleadosContext";
import { useNavigate } from "react-router-dom";



function EmpleadosLista()
{
const navigate = useNavigate();
const {
    empleados,//obtiene lista compartida de empleadoscontext
    error,//obtiene el mensaje de error compartido
    cargarEmpleados,//funcion q consulta al backend
    eliminarEmpleadoContext//elimina empleado y actualiza la lista
} = useEmpleados();

//DELETE
const handleEliminar = async (id) =>{
    const confirmar = window.confirm("¿Desea eliminar al empleado?");

    if (!confirmar) {
        return;
    }

    await eliminarEmpleadoContext(id);
};

//GET

useEffect (() =>{//se ejecuta cuando se monta un componente y cargar empleados consulta back
    
    cargarEmpleados();

},[]);//use effect  ejecuta la consulta al montarce el componente


return (
        <div className="empleados-contenedor">

            <h2 className="empleados-titulo">Lista de empleados</h2>

            {error && <p className="mensaje-error">{error}</p>}

            <div className="empleados-encabezado">
                <p>Total de empleados: {empleados.length}</p>

                <button
                    className="btn-registrar"
                    onClick={() => navigate("/empleados/formulario")}
                >
                    + Registrar empleado
                </button>
            </div>

            <div className="tabla-contenedor">
                <table className="tabla-empleados">

                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Nombre</th>
                            <th>Cargo</th>
                            <th>Area</th>
                            <th>Acciones</th>
                        </tr>
                    </thead>

                    <tbody>
                        {empleados.map((empleado) => (//recorre el arreglo y agrega una fila a la tabla por cada registro
                            <tr key={empleado.id_empleado}>
                                <td>{empleado.id_empleado}</td>
                                <td>{empleado.nombre}</td>
                                <td>{empleado.cargo}</td>
                                <td>{empleado.area}</td>
                            
                                <td className="acciones">

                                    <button
                                        className="btn-editar"
                                        onClick={() => navigate(`/empleados/formulario?id=${empleado.id_empleado}`)}
                                    >
                                        ✏️
                                    </button>

                                    <button
                                        className="btn-eliminar"
                                        onClick={() => handleEliminar(empleado.id_empleado)}
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

export default EmpleadosLista;



//Envía el ID del empleado mediante un parámetro de consulta en la URL.
//  Después nuestro formulario podrá leer ese ID para saber si debe registrar o editar.