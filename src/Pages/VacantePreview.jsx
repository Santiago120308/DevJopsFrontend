import {useParams , useNavigate} from "react-router-dom";
import {useEffect, useState} from "react";
import axios from "axios";
import {toast} from "react-toastify";

const VacantePreview = () => {

    const navigate = useNavigate();
    const {id } = useParams()
    const [dataVacante , setDataVacante] = useState({});
    const [postulado , setPostulado] = useState({
        name: '' ,
        email : '' ,

    })
    const [file, setFile] = useState(null);


    useEffect(() => {
       const listarVacante = async () => {
           const {data} = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/vacantes/listar-vacante/${id}`);
           setDataVacante(data)
           const idU = localStorage.getItem('id');

       }

       return () => {listarVacante()}
    }, []);


    const handleFileChange = async (e) => {
        e.preventDefault();
        console.log(postulado)
        if(Object.values(postulado).includes('') || !file){

            toast.error('¡Los datos son obligatorios!', {
                style: {
                    backgroundColor: "#000",
                    color: "#fff",
                    border: "2px solid #FF0000",
                    fontWeight: "700"
                }
            });
            return
        }


        const token = localStorage.getItem('token');

        if(!token) {
            toast.error('¡Inicia sesion para poder postularte!', {
                style: {
                    backgroundColor: "#000",
                    color: "#fff",
                    border: "2px solid #FF0000",
                    fontWeight: "700"
                }
            });

            navigate('/iniciar-sesion')
            return
        }

        const formData = new FormData();
        formData.append('file' , file);


        Object.keys(postulado).forEach(key => {
            formData.append(key, postulado[key]);
        });

        for (let pair of formData.entries()) {
            console.log(pair[0] + ': ' + pair[1]);
        }


        try {
            const {data} = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/postulaciones/agregar-postulacion/${id}`
                , formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'  ,
                    Authorization: `Bearer ${token}`
                }
            });

            toast.success(`${data.msg}`, {
                style: {
                    backgroundColor: "#000",
                    color: "#fff",
                    border: "2px solid #10B981",
                    fontWeight: "700"

                }
        });

        } catch (error) {

            toast.error(`${error.response.data.msg}`, {
                style: {
                    backgroundColor: "#000",
                    color: "#fff",
                    border: "2px solid #FF0000",
                    fontWeight: "700"
                }
            });
        }

    };


    return (
        <>
            <div className={'min-h-screen bg-black w-screen lg:px-32 lg:py-5'}>
                <div >
                    <h1
                        className={'text-white text-3xl font-black border-b-2 border-b-gray-700 h-40 p-2 lg:p-0+'}>
                        {dataVacante.titulo}</h1>
                </div>


                <div className={'mt-16 lg:mt-24 flex flex-col items-center gap-5 lg:flex-row lg:justify-between lg:gap-0'}>

                    <div className={'w-[25%] flex flex-col items-center lg:items-start  lg:w-[40%]'}>
                        <p className={'text-gray-500 font-black text-2xl'}>Empresa</p>
                        <p className={'text-white text-center font-bold lg:text-start'}>{dataVacante.empresa}</p>
                    </div>

                    <div className={'w-[25%] flex flex-col items-center lg:items-start  lg:w-auto'}>
                        <p className={'text-gray-500 font-black text-2xl'}>Ubicacion</p>
                        <p className={'text-center text-white font-bold'}>{dataVacante.ubicacion}</p>
                    </div>

                    <div className={'w-[25%] flex flex-col items-center lg:items-start lg:w-auto'}>
                        <p className={'text-gray-500 font-black text-2xl'}>Contrato</p>
                        <p className={'text-white text-center font-bold'}>
                            {dataVacante.contratos && dataVacante.contratos.length > 0 ?
                            dataVacante.contratos[0].nombre : 'No disponible'}
                        </p>
                    </div>

                    <div className={'w-[25%] flex flex-col items-center lg:items-start lg:w-auto'}>
                        <p className={'text-gray-500 font-black text-2xl'}>Salario</p>
                        <p className={'text-white text-center font-bold'}>$ {dataVacante.salario}</p>
                    </div>
                </div>


                <div className={'mt-16 lg:mt-24 flex flex-col px-5 lg:px-0 lg:flex-row lg:justify-between'}>

                    <div>
                        <p className={'text-gray-500 font-black text-2xl'}>Descripcion del Puesto</p>
                        <p className={'text-white font-bold mt-5'}
                           dangerouslySetInnerHTML={{__html : dataVacante.descripcion}}/>

                    </div>

                    <div>
                        <p className={'text-gray-500 font-black text-2xl'}>Conocimientos Deseados</p>
                        <ul className={'text-white font-bold mt-5'}>
                            {dataVacante.habilidades && dataVacante.habilidades.length > 0 ?
                                dataVacante.habilidades.map( habilidad => (
                                    <li
                                    key={habilidad.id}>{habilidad.nombre}</li>
                                )) : ''}
                        </ul>
                    </div>

                </div>


                <div className={'flex flex-col px-5 lg:flex-row lg:justify-between items-center border-t-2 border-t-gray-700 mt-10'}>
                    <div>
                    <h1 className={'text-white font-black text-2xl mt-10'}>Contactar Recultador</h1>
                        <h2
                        className={'text-white text-lg'}
                        >Llena el siguiente formulario , sube tu curriculum y pronto te contactaremos</h2>

                        <form className={'mt-5'}
                              onSubmit={handleFileChange}>
                            <div
                                className={'flex flex-col items-start gap-5 px-2 lg:px-0 lg:flex-row lg:items-center lg:gap-14 '}>
                                <label
                                    className={'text-white font-black w-[10%]'}
                                    htmlFor="">Nombre</label>
                                <input
                                    className={'w-full lg:w-[50%] rounded-md p-1'}
                                    placeholder={'Escribe tu Nombre'}
                                    type="text"
                                    onChange={e => {
                                        setPostulado({
                                            ...postulado,
                                            name: e.target.value
                                        })
                                    }}/>
                            </div>

                            <div
                                className={'flex flex-col items-start gap-5 px-2 mt-5  lg:px-0 lg:flex-row lg:items-center lg:gap-14 '}>
                                <label
                                    className={'text-white font-black w-[10%]'}
                                    htmlFor="">Email</label>
                                <input
                                    className={'w-full lg:w-[50%] rounded-md p-1'}
                                    placeholder={'Escribe tu Email'}
                                    type="email"
                                    onChange={e => {
                                        setPostulado({
                                            ...postulado,
                                            email: e.target.value
                                        })
                                    }}/>
                            </div>

                            <div
                                className={'flex flex-col items-start gap-5 px-2 mt-5 lg:px-0 lg:flex-row lg:items-center lg:gap-14'}>
                                <label
                                    className={'text-white font-black w-[10%]'}
                                    htmlFor="">CV(PDF)</label>
                                <input
                                    className={'w-full lg:w-[50%] rounded-md p-1'}
                                    type="file"
                                    onChange={e => {
                                        setFile(e.target.files[0])
                                    }}/>

                            </div>

                            <p className={'text-white mt-5'}>{file?.name}</p>

                            <div className={'px-2 mt-5'}>
                                <button
                                    className={'bg-emerald-500 mt-5 text-white font-black px-6 py-1 rounded-md w-full lg:w-auto'}>
                                    Enviar
                                </button>
                            </div>

                        </form>

                    </div>


                    <div className={'mt-5 px-2 pb-4 lg:pb-0 lg:px-0'}>

                        <h1
                            className={'text-gray-700 font-black text-2xl'}
                        >Informacion del Reclutador</h1>


                          <div>
                              {dataVacante.usuarios && dataVacante.usuarios.length > 0 ?
                                  <h2
                                      className={'text-white font-black mt-5'}
                                  >{dataVacante?.usuarios[0].nombre}</h2>

                                  : ''
                              }

                              {dataVacante.usuarios && dataVacante.usuarios.length > 0 ?
                                  <img src={`${dataVacante?.usuarios[0].imagen}`} alt="Imagen del reclutador"
                                       className={'w-[300px] h-[300px] object-cover mt-5'}/>
                                  : ''
                              }
                          </div>

                    </div>

                </div>

            </div>
        </>
    )
}

export default VacantePreview;