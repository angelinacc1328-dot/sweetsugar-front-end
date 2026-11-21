import { Routes, Route, Navigate } from "react-router-dom";
import ClientesLista from "./components/ClientesLista";
import ClientesForm from './components/ClientesForm'
import './App.css'
function App() {

    return (
        <div>
            <header>
            <h1>Sweet Sugar</h1>
            <p>Sistema de gestión de clientes</p>
            </header>

        <Routes>
            <Route path="/" element={<Navigate to= "/clientes"/>}/>
            <Route path="/clientes" element={<ClientesLista />} />
            <Route path="/clientes/formulario" element={<ClientesForm />} />
        </Routes>
        </div>
    )

}

export default App;
