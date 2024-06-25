import {useParams} from "react-router-dom";
import {useEffect} from "react";
import axios from "axios";
import useVacantes from "../Hooks/useVacantes.jsx";

const CandidatosVacante = () => {

    const {id} = useParams();
    const {postulaciones , setPostulaciones} = useVacantes();

    useEffect(() => {
        const listarPostulaciones = async () => {

            const token = localStorage.getItem("token");

            if(!token) return

            const config = {
                headers : {
                    "Content-Type" : "application/json" ,
                    Authorization : `Bearer ${token}`
                }
            };

            const {data} = await axios(`${import.meta.env.VITE_BACKEND_URL}/api/vacantes/listar-postulaciones/${id}` , config)
            setPostulaciones(data);
        }

        return () => {listarPostulaciones()}
    } , [])

    return (
        <>
            <div className={'min-h-screen w-screen bg-black px-10 py-5 md:px-44 md:py-10'}>
                <div>
                    <h1 className={'text-white font-black text-4xl'}>DevJops</h1>
                    <h2 className={'text-white font-black text-3xl mt-16 lg:mt-24'}>Candidatos Vacante - {postulaciones?.titulo}</h2>
                </div>

                <div className={'text-white font-black text-3xl mt-24 lg:mt-36'}>
                    <h2>Lista de Candidatos</h2>


                    <div className={'mt-16 '}>
                        {postulaciones?.postulaciones?.length > 0 ?
                            postulaciones?.postulaciones?.map(post => (

                            <div className={'flex flex-col gap-5 md:gap-0 md:flex-row md:justify-between md:items-center'}>
                                <div>
                                    <h2 className={'text-gray-700 font-black text-xl'}>Nombre</h2>
                                    <p className={'text-white text-lg font-black'}>{post.nombre}</p>
                                </div>

                                <div className={'flex flex-col md:flex-row md:items-center gap-10 mb-5'}>

                                    <div>
                                        <h2 className={'text-gray-700 font-black text-xl'}>Email</h2>
                                        <p className={'text-white text-lg font-black'}>{post.email}</p>
                                    </div>

                                    <div>
                                        <a href={post.curriculum}
                                           className={'bg-emerald-500 text-white font-black text-xl px-20 lg:px-8 py-1 rounded-md'}
                                           target="_blank">Ver
                                            CV</a>
                                    </div>
                                </div>

                            </div>
                        )) : <p className={'text-white font-black text-lg text-center'}>No hay postulaciones en esta vacante</p>}
                    </div>
                </div>
            </div>
        </>
    )
}

export default CandidatosVacante;
