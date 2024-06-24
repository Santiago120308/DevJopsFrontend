import OfertaPreview from "../Components/OfertaPreview.jsx";
import {useNavigate} from "react-router-dom";
import {useEffect, useState} from "react";
import axios from "axios";
import useVacantes from "../Hooks/useVacantes.jsx";
import {toast} from "react-toastify";

const Ofertas = () => {

    const navigate = useNavigate();
    const [token , setToken] = useState('');
    const [filtro , setFiltro] = useState(false);
    const [textoFiltro , setTextoFiltro] = useState('');
    const {usuarioLogueado , setUsuarioLogueado , ofertas , setOfertas , setVacanteEditada , setEditar} = useVacantes();
    const [optenerTodas , setOptenerTodas] = useState(false);

    useEffect(() => {
        const storedToken = localStorage.getItem("token");
        setVacanteEditada({})
        setEditar(false)
        if (storedToken !== null && storedToken !== undefined) {
            setToken(storedToken);
        }

    }, []);

    useEffect(() => {
        if(textoFiltro === '') setOptenerTodas(!optenerTodas);
        setFiltro(false)
    } , [textoFiltro])


    useEffect(() => {
        const usuarioLogueado = async () => {
            const id = localStorage.getItem("id");
            if(id !== null && id !== undefined) {
                const idUsuario = parseInt(id);
                const response = await axios(`${import.meta.env.VITE_BACKEND_URL}/api/usuarios/buscar-usuario/${idUsuario}`);
                setUsuarioLogueado(response.data)
            }

        }
        return () => {usuarioLogueado()}
    }, []);

    useEffect(() => {
        const obtenerOfertas = async () => {
            const {data} = await axios(`${import.meta.env.VITE_BACKEND_URL}/api/vacantes/listar-vacantes`)
            setOfertas(data)
        }

        return () => {obtenerOfertas()}
    } , [optenerTodas])


    const Authentication =  () => {

        if (token) {
            navigate('/publicar-vacante')
        }else{
            navigate('/iniciar-sesion')
        }
    }

    const filtrarVacantes = async () => {
        if(textoFiltro === '') {
            setFiltro(false);
            toast.error('¡No puedes dejar el campo de filtros vacio!', {
                style: {
                    backgroundColor: "#000",
                    color: "#fff",
                    border: "2px solid #FF0000",
                    fontWeight: "700"
                }
            });
            return;
        }
        const filtro = {
            textoFiltro: textoFiltro.trim(),
        }

        setFiltro(true);
        const {data} = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/vacantes/filtrar-vacantes` , filtro)
        setOfertas(data)
    }

    return (
        <div className={"min-h-screen bg-black w-screen flex justify-center py-5 lg:py-0"}>
            <div className={"flex flex-col px-5 sm::justify-start sm:px-30 sm:w-[80%] sm:py-5 sm:container"}>
                <div className={'flex flex-col lg:flex-row lg:justify-between text-lg items-center'}>
                    <h1 className={"text-white font-black text-5xl "}>DevJops</h1>

                    <div className="relative flex items-center mt-10 lg:mt-0 ">
                        <input type="text" placeholder="Buscar Vacante"
                               className="bg-white px-4 py-2 rounded-md pr-10 border border-gray-300 shadow-md focus:outline-none focus:border-blue-500 lg:w-[400px]"
                               onChange={e => {setTextoFiltro(e.target.value)}}/>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5"
                             stroke="currentColor" className="w-6 h-6 absolute right-0 mr-2 cursor-pointer"
                             onClick={filtrarVacantes}>
                            <path strokeLinecap="round" strokeLinejoin="round"
                                  d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"/>
                        </svg>
                    </div>


                    <div className={'mt-10 lg:mt-0'}>
                        {token ?
                            <div className={'flex flex-col items-center lg:flex-row gap-5'}>
                                <button
                                    onClick={() => {
                                        navigate('/mi-cuenta')
                                    }}
                                    className={"text-white font-black"}>Mi cuenta
                                </button>
                                <img src={usuarioLogueado?.imagen} alt="imagen de usuario"
                                     className={'h-16 w-16 object-cover rounded-full'}/>
                            </div> :
                            <button className={"text-white font-black"}>Iniciar Sesion</button>}
                    </div>
                </div>

                <div className={"mt-16"}>
                    <h2 className={"text-white font-black text-2xl"}>DevJops</h2>
                    <p className={"text-white mt-2"}>Encuentra y publica trabajos para desarrolladores web</p>
                    <button
                        className=
                            {"text-white mt-5 bg-cyan-600 font-black px-8 py-2 rounded-md uppercase text-sm"}
                        onClick={Authentication}>
                        Publicar Nueva Vacante
                    </button>
                </div>

                <div>
                    <h2 className={"text-white uppercase font-black text-3xl mt-24"}>Lista de vacantes</h2>

                    {filtro ? <div>
                        <h3 className={'text-white uppercase font-black text-2xl mt-24'}>Resultados de la busqueda : {textoFiltro}</h3>
                    </div> : ''}

                    {ofertas?.map(oferta => (
                        <div key={oferta.id}>
                            <OfertaPreview oferta={oferta}/>
                        </div>
                    ))}


                </div>
            </div>
        </div>
    );
}

export default Ofertas;