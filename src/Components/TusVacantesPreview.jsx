import {useNavigate} from "react-router-dom";
import useVacantes from "../Hooks/useVacantes.jsx";
import Swal from "sweetalert2";
import axios from "axios";
import {useState} from "react";

const TusVacantesPreview = ({vacante}) => {

    const navigate = useNavigate();
    const {setVacanteEditada , setEditar} = useVacantes();
    //const [id , setId] = useState(0);

    const handlerEliminar = (id) => {
        Swal.fire({
            title: "Estas seguro?",
            text: "No podras recuperar la vacante!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Si, eliminar!" ,
            cancelButtonText: "Cancelar"
        }).then( async (result) => {
            if (result.isConfirmed) {

                const token = localStorage.getItem('token');
                if(!token) return;
                const config = {
                    headers : {
                        "Content-Type" : "application/json" ,
                        Authorization : `Bearer ${token}`
                    }
                };

                const {data} = await axios.delete(`${import.meta.env.VITE_BACKEND_URL}/api/vacantes/eliminar-vacante/${id}` ,
                    config);
                Swal.fire({
                    title: "Eliminada!",
                    text: `${data.msg}`,
                    icon: "success"
                });
            }
        });
    }


    return (
        <>
            <div className={'flex flex-col gap-5 lg:flex-row lg:justify-between lg:items-center mt-16'}>
                <div>
                    <h1 className={'text-white font-black'}>{vacante.empresa}</h1>
                    <h2 className={'text-gray-700 font-black'}>{vacante.titulo}</h2>
                    <p className={'text-emerald-500 text-sm mt-2'}>{vacante?.postulaciones?.length} Candidato{
                        vacante?.postulaciones?.length === 1 ? '' : 's'
                    }</p>
                </div>

                <div className={'flex flex-col lg:flex-row gap-5'}>
                    <button className={'text-white text-sm uppercase font-black bg-orange-400 px-5 py-1 rounded-md'}
                            onClick={() => {navigate(`/mis-candidatos/${vacante.id}`)}}>
                        Candidatos
                    </button>

                    <button className={'text-white text-sm uppercase font-black bg-emerald-500 px-5 py-1 rounded-md'}
                            onClick={() => {
                                setVacanteEditada(vacante)
                                setEditar(true)
                                navigate('/publicar-vacante')
                            }}>
                        Editar
                    </button>

                    <button className={'text-white text-sm uppercase font-black bg-red-700 px-5 py-1 rounded-md'}
                            onClick={() => {handlerEliminar(vacante.id)}}>
                        Eliminar
                    </button>
                </div>
            </div>
        </>
    )
}

export default TusVacantesPreview;