import { createContext,useContext,useState } from "react";
import { obtenerEmpleados,eliminarEmpleado,crearEmpleado,actualizarEmpleado} from "../services/empleadosService";

//import{
   //obtenerEmpleados,
   // eliminarEmpleado,
   // crearEmpleado,
    //actualizarEmpleado
//}from ".../services/empleadosService";

const empleadosContext = createContext();

export function EmpleadosProvider({children})//children representan los componentes que estarn adentro del proveedor y podran acceder a la info compartida
{
const [empleados, setEmpleados] = useState([]);//compartimos la información y las funciones que utilizan esos componentes.
const[error, setError] =useState("");
const[cargando ,setCargando]= useState(false);


const cargarEmpleados = async () => {
        try {
            setCargando(true);
            setError("");

            const datos = await obtenerEmpleados();
            setEmpleados(datos);

        } catch (error) {
            console.error("Error al obtener empleados", error);
            setError("No se pudieron cargar los empleados");

        } finally {
            setCargando(false);
        }
    };

    // Eliminar un empleado
    const eliminarEmpleadoContext = async (id) => {
        try {
            setError("");

            await eliminarEmpleado(id);

            setEmpleados((empleadosActuales) =>
                empleadosActuales.filter(
                    (empleado) => empleado.id_empleado !== Number (id)
                )
            );

        } catch (error) {
            console.error("Error al eliminar el empleado", error);
            setError("No se pudo eliminar el empleado");
        }
    };

// Registrar un nuevo cliente
const registrarEmpleadoContext = async (empleado) => {
    try {
        setError("");

        const nuevoEmpleado = await crearEmpleado(empleado);

        setEmpleados((empleadosActuales) => [
            ...empleadosActuales,
            nuevoEmpleado
        ]);

        return true;

    } catch (error) {
        console.error("Error al registrar empleado", error);
        setError("No se pudo registrar el empleado");
        return false;
    }
};


// Actualizar un empleado existente
const actualizarEmpleadoContext = async (id, empleado) => {
    try {
        setError("");

        const empleadoActualizado = await actualizarEmpleado(id, empleado);

        setEmpleados((empleadosActuales) =>
            empleadosActuales.map((actual) =>
                actual.id_empleado === Number(id)
                    ? empleadoActualizado
                    : actual
            )
        );

        return true;

    } catch (error) {
        console.error("Error al actualizar empleado", error);
        setError("No se pudo actualizar el empleado");
        return false;
    }
}; 
    //map()recorre los empleados y, cuando encuentra el ID correspondiente, reemplaza ese elemento por clienteActualizado.

return(
    <empleadosContext.Provider
    value={{
        empleados,
        error,
        cargando,
        cargarEmpleados,
        eliminarEmpleadoContext,
        registrarEmpleadoContext,
        actualizarEmpleadoContext
    }}
    >
    {children}
    </empleadosContext.Provider>
);
}
//utlilza el contexto
export function useEmpleados(){
return useContext(empleadosContext);
}
