import { createContext, useContext,useState } from "react";
import { obtenerClientes,eliminarCliente,crearCliente,actualizarCliente } from "../services/clientesService";

//create context crea el contexto donde se compartira la informacion
//useContext permite acceder a esa info desde otros componentes
//usestate permite crear y actualizar estados

//creacion del contexto q es el espacio compartido donde se acceden a los componentes que esten conectado a su provedor
const clientesContext = createContext();

//creacion del proveedor
export function ClientesProvider({children})//children representan los componentes que estarn adentro del proveedor y podran acceder a la info compartida
{
const [clientes, setClientes] = useState([]);//compartimos la información y las funciones que utilizan esos componentes.
const[error, setError] =useState("");
const[cargando ,setCargando]= useState(false);


//ClientesContext: es el contexto que creamos para compartir información entre componentes.
//ClientesProvider: es el componente que proporciona esa información a todos los componentes que se encuentran dentro de él.

const cargarClientes = async () => {//consulta el backend y guarda en estado global
        try {
            setCargando(true);
            setError("");

            const datos = await obtenerClientes();
            setClientes(datos);

        } catch (error) {
            console.error("Error al obtener clientes", error);
            setError("No se pudieron cargar los clientes");

        } finally {
            setCargando(false);
        }
    };

    // Eliminar un cliente
    const eliminarClienteContext = async (id) => {//elimina y actualiza la lista compartida
        try {
            setError("");

            await eliminarCliente(id);

            setClientes((clientesActuales) =>
                clientesActuales.filter(//conserva los q no se eliminan
                    (cliente) => cliente.id_cliente !== id
                )
            );

        } catch (error) {
            console.error("Error al eliminar el cliente", error);
            setError("No se pudo eliminar el cliente");
        }
    };


   // Registrar un nuevo cliente
const registrarClienteContext = async (cliente) => {
    try {
        setError("");

        const nuevoCliente = await crearCliente(cliente);

        setClientes((clientesActuales) => [
            ...clientesActuales,
            nuevoCliente
        ]);

        return true;

    } catch (error) {
        console.error("Error al registrar cliente", error);
        setError("No se pudo registrar el cliente");
        return false;
    }
};


// Actualizar un cliente existente
const actualizarClienteContext = async (id, cliente) => {
    try {
        setError("");

        const clienteActualizado = await actualizarCliente(id, cliente);

        setClientes((clientesActuales) =>
            clientesActuales.map((actual) =>
                actual.id_cliente === Number(id)
                    ? clienteActualizado
                    : actual
            )
        );

        return true;

    } catch (error) {
        console.error("Error al actualizar cliente", error);
        setError("No se pudo actualizar el cliente");
        return false;
    }
}; 
    //map()recorre los clientes y, cuando encuentra el ID correspondiente, reemplaza ese elemento por clienteActualizado.

return(
    <clientesContext.Provider
    value={{
        clientes,
        error,
        cargando,
        cargarClientes,
        eliminarClienteContext,
        registrarClienteContext,
        actualizarClienteContext
    }}
    >
    {children}
    </clientesContext.Provider>
);
}
//utlilza el contexto
export function useClientes(){
return useContext(clientesContext);
}
