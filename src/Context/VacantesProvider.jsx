import {createContext, useEffect, useState} from 'react'
import axios from "axios";

const vacantesContext = createContext();

const VacantesProvider = ({children}) => {

    const [dataVacante , setDataVacante] = useState(
        {
            titulo : '' ,
            empresa : '' ,
            ubicacion : '' ,
            salario : '' ,
            contrato : 0 ,
            descripcion : '' ,
            habilidades : []
        }
    );

    const [dataUsuario , setDataUsuario] = useState(
        {
        nombre : '' ,
        email : '' ,
        password : '' ,
        repetirPassword : ''
    }) ;

    const [dataSesion , setDataSesion] = useState({
        email : '' ,
        password : ''
    })

    const [usuarioLogueado , setUsuarioLogueado]  = useState({});

    const [ofertas , setOfertas] = useState([]);

    const [postulaciones , setPostulaciones] = useState([]);

    const [vacanteEditada , setVacanteEditada] = useState({});
    const [editar , setEditar] = useState(false);


    return (
        <vacantesContext.Provider
            value={{
                dataVacante ,
                setDataVacante ,
                dataUsuario ,
                setDataUsuario ,
                dataSesion ,
                setDataSesion ,
                usuarioLogueado ,
                setUsuarioLogueado ,
                ofertas ,
                setOfertas ,
                postulaciones ,
                setPostulaciones ,
                vacanteEditada ,
                setVacanteEditada ,
                editar ,
                setEditar ,
            }}>
            {children}
        </vacantesContext.Provider>
    );

}

export {
    VacantesProvider
}

export default vacantesContext;