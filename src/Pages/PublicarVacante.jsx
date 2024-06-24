import EditorTxt from "../Components/EditorTxt.jsx";
import {useEffect, useState} from "react";
import HabilidadesPreview from "../Components/HabilidadesPreview.jsx";
import useVacantes from "../Hooks/useVacantes.jsx";
import axios from "axios";
import { toast } from 'react-toastify';
import Alerta from "../Components/Alerta.jsx";
import {data} from "autoprefixer";

const PublicarVacante = () => {

    const [contratos , setContratos] = useState([]);
    const {dataVacante , setDataVacante} = useVacantes();
    const { vacanteEditada , setVacanteEditada , editar , setEditar ,} = useVacantes()
    const [id , setId] = useState(0);

    console.log(editar)
    console.log(vacanteEditada.id)

    useEffect(() => {
        const listarContratos = async () => {
            const dataContratos = await axios(`${import.meta.env.VITE_BACKEND_URL}/api/contratos/listar-contratos`)
            setContratos(dataContratos.data);

       }

        return () => {listarContratos()}
    }, []);


    useEffect(() => {

        setEditar(Object.keys(vacanteEditada).length > 0)

        if(editar){
            setId(vacanteEditada.id)
            setDataVacante({
                titulo :  vacanteEditada.titulo,
                empresa : vacanteEditada.empresa ,
                ubicacion : vacanteEditada.ubicacion ,
                salario : vacanteEditada.salario ,
                contrato : (vacanteEditada?.contratos && vacanteEditada?.contratos.length > 0) ? vacanteEditada?.contratos[0].id : 0 ,
                descripcion : vacanteEditada.descripcion ,
                habilidades : [...vacanteEditada.habilidades],
            });

        } else{
            setDataVacante(
                {
                    titulo : '' ,
                    empresa : '' ,
                    ubicacion : '' ,
                    salario : '' ,
                    contrato : 0 ,
                    descripcion : '' ,
                    habilidades : []
                }
            )
        }
    } , [])

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (Object.values(dataVacante).includes('') || Object.values(dataVacante).includes(0)) {
            toast.error('¡Todos los campos son obligatorios!', {
                style: {
                    backgroundColor: "#000",
                    color: "#fff",
                    border: "2px solid #FF0000",
                    fontWeight: "700"
                }
            });
            return;
        } else if (dataVacante.habilidades.length === 0) {
            toast.error('¡Selecciona al menos una habilidad!', {
                style: {
                    backgroundColor: "#000",
                    color: "#fff",
                    border: "2px solid #FF0000",
                    fontWeight: "700"
                }
            });
            return;
        }

        let data = {...dataVacante};

        const dataDto = data.habilidades.map(skil => {
            delete skil.seleccionado
            return skil;
        })

        data.habilidades = [...dataDto];

        //configuracion
        const token = localStorage.getItem('token');
        if(!token) return;
        const config = {
            headers : {
                "Content-Type" : "application/json" ,
                Authorization : `Bearer ${token}`
            }
        };

        if(editar){

                 await axios
                .post(`${import.meta.env.VITE_BACKEND_URL}/api/vacantes//editar-vacante/${id}` , data , config)

            toast.success('¡Vacante editada con exito!', {
                style: {
                    backgroundColor: "#000",
                    color: "#fff",
                    border: "2px solid #10B981",
                    fontWeight: "700"

                }
            });
        }else{
            const prueba = await axios
                .post(`${import.meta.env.VITE_BACKEND_URL}/api/vacantes/agregar-vacante` , data , config)

            toast.success('¡Vacante publicada con exito!', {
                style: {
                    backgroundColor: "#000",
                    color: "#fff",
                    border: "2px solid #10B981",
                    fontWeight: "700"

                }
            });
        }


    }


    return (
        <div className={"bg-black w-screen min-h-screen py-10 lg:px-44 lg:py-20 "}>
            <div className={"flex justify-center lg:justify-start"}>
                <div>
                    <h1 className={"text-white text-4xl font-black"}>Nueva Vacante</h1>
                    <h3 className={"text-white font-bold mt-2"}>Llena el formulario y publica tu vacante</h3>
                </div>
            </div>



            <div className={"flex flex-col gap-5 px-14 mt-16  lg:px-48 lg:mt-20 w-full"}>
                <h1 className={"text-gray-500 font-black text-lg"}>INFORMACION GENERAL</h1>

                <form onSubmit={handleSubmit}>

                    <div className={"flex flex-col gap-8 lg:flex-row lg:gap-20 my-5"}>
                        <label htmlFor="titulo" className={"text-white font-black w-[40px]"}>
                            TITULO
                        </label>

                        <input type="text"
                               placeholder={"Ej : React Developer"}
                               className={"w-full rounded-md p-1"}
                               value={dataVacante.titulo}
                               id = {"titulo"}
                                onChange={ e => setDataVacante(
                                    {
                                        ...dataVacante,
                                        titulo: e.target.value
                                    }

                                )}/>
                    </div>

                    <div className={"flex flex-col gap-8 lg:flex-row lg:gap-20 my-5"}>
                        <label htmlFor="empresa" className={"text-white font-black w-[40px]"}>
                            EMPRESA
                        </label>

                        <input type="text"
                               placeholder={"Empresa que contrata"}
                               className={"w-full rounded-md p-1"}
                               value={dataVacante.empresa}
                               id = {"empresa"}
                               onChange={ e => setDataVacante(
                                   {
                                       ...dataVacante,
                                       empresa: e.target.value
                                   }

                               )}/>
                    </div>

                    <div className={"flex flex-col gap-8 lg:flex-row lg:gap-20 my-5"}>
                        <label htmlFor="ubicacion" className={"text-white font-black w-[40px]"}>
                            UBICACION
                        </label>

                        <input type="text"
                               placeholder={"Ubicacion de la empresa"}
                               className={"w-full rounded-md p-1"}
                               value={dataVacante.ubicacion}
                               id={"ubicacion"}
                               onChange={ e => setDataVacante(
                                   {
                                       ...dataVacante,
                                       ubicacion: e.target.value
                                   }

                               )}
                        />
                    </div>

                    <div className={"flex flex-col gap-8 lg:flex-row lg:gap-20 my-5"}>
                        <label htmlFor="salario" className={"text-white font-black w-[40px]"}>
                            SALARIO (USD)
                        </label>

                        <input type="text"
                               placeholder={"Salario"}
                               className={"w-full rounded-md p-1"}
                               value={dataVacante.salario}
                               id={"salario"}
                               onChange={ e => setDataVacante(
                                   {
                                       ...dataVacante,
                                       salario: e.target.value
                                   }

                               )}/>
                    </div>

                    <div className={"flex flex-col gap-8 lg:flex-row lg:gap-20 my-5"}>
                        <label className={"text-white font-black w-[40px]"}>
                           CONTRATO
                        </label>

                        <select type="text"
                                onChange={ e => setDataVacante(
                                    {
                                        ...dataVacante,
                                        contrato: parseInt(e.target.value )
                                    }

                                )}
                                value={dataVacante.contrato}
                                className={"w-full rounded-md p-1 text-center uppercase"}>
                            <option value={0}>Tipo de contrato</option>
                            {contratos?.map(contrato =>
                                (<option key={contrato.id} value={contrato.id}>{contrato.nombre}</option>))}
                        </select>
                    </div>

                  <div>
                      <h1 className={"text-gray-500 font-black text-lg uppercase mb-5"}>Descripcion del puesto</h1>
                      <EditorTxt />
                  </div>

                    <div>
                        <HabilidadesPreview />
                    </div>

                    <div className={"flex justify-center my-10 "}>
                        <button className={"text-white px-4 py-2 bg-cyan-600 rounded-md uppercase font-black"}>
                            {editar ? 'Editar Vacante' : 'Publicar Vacante'}
                        </button>
                    </div>

                </form>
            </div>
        </div>
        
    )
}


export default PublicarVacante;