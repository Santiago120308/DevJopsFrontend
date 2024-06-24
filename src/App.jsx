import React, {useState , useEffect} from "react";
import {BrowserRouter, Route, Routes , redirect} from "react-router-dom";
import Ofertas from "./Pages/Ofertas.jsx";
import Ejemplo from "./PrivatePages/ejemplo.jsx";
import NoAutenticado from "./PagesError/NoAutenticado.jsx";
import PublicarVacante from "./Pages/PublicarVacante.jsx";
import {VacantesProvider} from "./Context/VacantesProvider.jsx";
import {ToastContainer} from "react-toastify";
import CrearCuenta from "./Pages/CrearCuenta.jsx";
import IniciarSesion from "./Pages/IniciarSesion.jsx";
import VacantePreview from "./Pages/VacantePreview.jsx";
import MiCuenta from "./Pages/MiCuenta.jsx";
import CandidatosVacante from "./Pages/CandidatosVacante.jsx";

function App() {
   // const {usuarioLogueado} = useVacantes();
    const [token , setToken] = useState('')

    useEffect(() => {
        setToken(localStorage.getItem("token"))
    } , [])



  return (

<div>
        <BrowserRouter>
            <VacantesProvider>
            <Routes>
                <Route path={"/"} element={<Ofertas />}/>
                <Route path={"/iniciar-sesion"} element={<IniciarSesion />}/>
                <Route path={"/crear-cuenta"} element={<CrearCuenta />}/>
                <Route path={"/publicar-vacante"} element={token ? <PublicarVacante /> : <NoAutenticado/>}/>
                <Route path={"/ver-vacante/:id"} element={<VacantePreview />}/>
                <Route path = {"/mi-cuenta" } element={token ? <MiCuenta /> : <NoAutenticado />}/>
                <Route path = {"/mis-candidatos/:id" } element={token ? <CandidatosVacante /> : <NoAutenticado />}/>
            </Routes>
            </VacantesProvider>
        </BrowserRouter>

    <ToastContainer />
</div>

  )
}

export default App
