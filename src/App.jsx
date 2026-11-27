import { Routes, Route, Navigate } from "react-router-dom";
import ClientesLista from "./components/ClientesLista";
import ClientesForm from './components/ClientesForm'
import EmpleadosLista from "./components/EmpleadosLista";
import EmpleadosForm from './components/EmpleadosForm'
import MenuNavegacion from "./components/MenuNavegacion";
import './App.css'
function App() {

    return (
        <div>
            <header>
            <h1>Sweet Sugar</h1>
            <p>Sistema de gestión de clientes</p>
            </header>
       < MenuNavegacion/>
        <Routes>
            <Route path="/" element={<Navigate to= "/clientes"/>}/>
            <Route path="/clientes" element={<ClientesLista />} />
            <Route path="/clientes/formulario" element={<ClientesForm />} />

            <Route path="/empleados" element={<EmpleadosLista />} />
            <Route path="/empleados/formulario" element={<EmpleadosForm />} />
        </Routes>
        </div>
    )

}

export default App;
