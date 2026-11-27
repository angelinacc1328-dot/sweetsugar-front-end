import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import './index.css'
import App from './App.jsx'
import { ClientesProvider } from './context/ClientesContext.jsx'
import { EmpleadosProvider } from './context/EmpleadosContext.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
    <ClientesProvider>
      <EmpleadosProvider>
        <App />
      </EmpleadosProvider>
    </ClientesProvider>
    </BrowserRouter>
  </StrictMode>,
)
//browserrouter es el componente que habilita las rutas  de navegacion entre nuestra app
//los componentes que esten dentro de la app podran acceder a datos y funciones q se comparten en clientescontext
//proporcionan los contextos