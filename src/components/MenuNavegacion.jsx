import { NavLink } from "react-router-dom";

function MenuNavegacion(){
    return(

        <nav className="menu-navegacion">
            <NavLink to ="/clientes">
             Clientes
            </NavLink>

        <NavLink to ="/empleados">
         Empleados
        </NavLink>

        <NavLink to ="/productos">
        Productos
        </NavLink>

        <NavLink to ="/materias-primas">
       Materias Primas
        </NavLink>

        <NavLink to ="/lotes">
        Lotes de produccion
        </NavLink>

        <NavLink to ="/proveedores">
        Proveedores

        </NavLink>
        </nav>
    );
}
export default MenuNavegacion;