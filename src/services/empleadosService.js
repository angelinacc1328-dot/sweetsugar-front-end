import axios from "axios";//importamos la biblioteca q se instalo con npm para hacer peticiones http

//GET PARA OBTENER TODOS LOS EMPLEADOS
export const obtenerEmpleados = async ()=>//export nos permite usar la funcion desde otros archivos
    {
const respuesta = await axios.get(
        "http://localhost:8080/api/empleado"
    );
   return respuesta.data;
};
//axios devuelve un objeto de respuesta q tiene una variedad de propiedades, la propiedad data
//contiene los datos q nos devuelve el backend




export const eliminarEmpleado = async (id) =>{
    const respuesta = await axios.delete(`http://localhost:8080/api/empleado/${id}`);//agrega el identificador a la url y spring boot lo lee
    //y ejecuta el metodo correspondiente en el controller
    return respuesta;
};



//GET OBTENER POR ID
export const obtenerEmpleadoPorId = async (id) =>{
    const respuesta = await axios.get(`http://localhost:8080/api/empleado/${id}`);
    return respuesta.data;
};



//POST REGISTRAR UN NUEVO CLIENTE
export const crearEmpleado = async(empleado) =>{
    const respuesta = await axios.post( "http://localhost:8080/api/empleado", empleado);
    return respuesta.data;
};



//PUT ACTUALIZAR UN CLIENTE EXISTENTE
export const actualizarEmpleado = async (id, empleado) =>{
    const respuesta = await axios.put(`http://localhost:8080/api/empleado/${id}`,empleado);
    return respuesta.data;
}
//EN PUT Y POST ENVIAMOS EMPLEADO COMO SEGUNDO ARGUMENTO DE AXIOS QUE CONTENDRA LOS DATOS DEL FORMULARIO