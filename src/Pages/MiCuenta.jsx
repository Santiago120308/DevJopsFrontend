import {useEffect, useState} from 'react'
import axios from "axios";
import TusVacantesPreview from "../Components/TusVacantesPreview.jsx";
import useVacantes from "../Hooks/useVacantes.jsx";

const MiCuenta = () => {

    const [vacantesUsuario , setVacantesUsuario] = useState([]);
    const {setVacanteEditada , setEditar} = useVacantes();

    useEffect(() => {
        const listarVacantesUsuario = async () => {

            const id = localStorage.getItem("id");
            const token = localStorage.getItem("token");
            setVacanteEditada({})
            setEditar(false)

            if(!id || !token) return

            const config = {
                headers : {
                    "Content-Type" : "application/json" ,
                    Authorization : `Bearer ${token}`
                }
            };

            const {data} = await axios(`${import.meta.env.VITE_BACKEND_URL}/api/vacantes/listar-vacantes-por-usuario/${id}` , config)
            setVacantesUsuario(data);
            console.log(data)
        }

        return () => {listarVacantesUsuario()}
    } , [])


    return (


        <>
            <div className={'min-h-screen w-screen bg-black px-10 py-4 lg:px-44 lg:py-10'}>

               <div>
                   <h1 className={'text-white text-3xl font-black'}>Panel de Administracion</h1>
                   <h2 className={'text-white mt-2'}>Crea y Administra tus vacantes desde aqui</h2>
               </div>

                <div>
                    <h2 className={'mt-16 lg:mt-24 text-white text-2xl font-black mb-5 lg:mb-0'}>Navegación</h2>

                    <div className={'flex flex-col lg:flex-row gap-5 mt-3'}>
                        <button
                        className={'text-white uppercase font-bold bg-cyan-600 px-4 py-1 rounded-md'}>
                                Editar Perfil
                        </button>

                        <button className={'text-white uppercase font-bold bg-emerald-500 px-4 py-1 rounded-md'}>
                            Nueva Vacante
                        </button>
                    </div>
                </div>


                <div className={'text-white font-black text-2xl mt-16 lg:mt-24'}>
                    <h1>Tus Vacantes</h1>

                    <div>
                        {vacantesUsuario?.vacantes && vacantesUsuario.vacantes.length > 0 ?

                        vacantesUsuario.vacantes.map(vacante => (
                            <div key={vacante.id} >

                                <TusVacantesPreview vacante={vacante}/>
                            </div>
                        )) : <p className={'text-white'}>no hay</p>}
                    </div>
                </div>

            </div>

        </>
    )
}

export default MiCuenta;