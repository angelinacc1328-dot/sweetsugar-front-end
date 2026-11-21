import axios from "axios";//importamos la biblioteca q se instalo con npm para hacer peticiones http

//GET PARA OBTENER TODOS LOS CLIENTES
export const obtenerClientes = async ()=>//export nos permite usar la funcion desde otros archivos
    {
const respuesta = await axios.get(
        "http://localhost:8080/api/clientes"
    );
   return respuesta.data;
};
//axios devuelve un objeto de respuesta q tiene una variedad de propiedades, la propiedad data
//contiene los datos q nos devuelve el backend




export const eliminarCliente = async (id) =>{
    const respuesta = await axios.delete(`http://localhost:8080/api/clientes/${id}`);//agrega el identificador a la url y spring boot lo lee
    //y ejecuta el metodo correspondiente en el controller
    return respuesta;
};



//GET OBTENER POR ID
export const obtenerClientePorId = async (id) =>{
    const respuesta = await axios.get(`http://localhost:8080/api/clientes/${id}`);
    return respuesta.data;
};



//POST REGISTRAR UN NUEVO CLIENTE
export const crearCliente = async(cliente) =>{
    const respuesta = await axios.post( "http://localhost:8080/api/clientes", cliente);
    return respuesta.data;
};



//PUT ACTUALIZAR UN CLIENTE EXISTENTE
export const actualizarCliente = async (id, cliente) =>{
    const respuesta = await axios.put(`http://localhost:8080/api/clientes/${id}`,cliente);
    return respuesta.data;
}
//EN PUT Y POST ENVIAMOS CLIENTE COMO SEGUNDO ARGUMENTO DE AXIOS QUE CONTENDRA LOS DATOS DEL FORMULARIO