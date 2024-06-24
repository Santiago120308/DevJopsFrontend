
import AsignarImagen from "../Components/AsignarImagen.jsx";
import React, {useCallback, useEffect, useState} from "react";
import {useDropzone} from "react-dropzone";
import useVacantes from "../Hooks/useVacantes.jsx";
import {toast} from "react-toastify";
import axios from 'axios'

const CrearCuenta = () => {


    const [noImg , setNoImg] = useState('');
    const [img , setImg] = useState(null);
    const {dataUsuario , setDataUsuario} = useVacantes();

    const onDrop = useCallback(acceptedFiles => {
        const file = acceptedFiles[0];
        // Verificar si el archivo no es una imagen
        if (!file.type.startsWith('image')) {
            setNoImg('solo se aceptan Imagenes!!')
            return;
        }
        setNoImg('')
        const previewUrl = URL.createObjectURL(file);
        setImg(previewUrl);
    }, []);

    const {getRootProps, getInputProps, isDragActive , acceptedFiles} = useDropzone({
        accept: 'image/jpeg, image/png, image/gif',
        onDrop: onDrop,
    });


    const handleSubmit = async (e) => {
        e.preventDefault();

        if(!acceptedFiles[0] || Object.values(dataUsuario).includes('')){
            toast.error('¡Todos los campos son obligatorios!', {
                style: {
                    backgroundColor: "#000",
                    color: "#fff",
                    border: "2px solid #FF0000",
                    fontWeight: "700"
                }
            });
            return;
        }


        //almacenamos la foto en claudinary
        const formData = new FormData();
        formData.append('file' , acceptedFiles[0]);
        formData.append('upload_preset' , 'ab5qxt1f');
        formData.append('api_key' , '143278874332428');
        const res = await fetch("https://api.cloudinary.com/v1_1/dnsgfd9lf/image/upload" , {
            method : 'POST' ,
            body : formData
        });
        const respuesta = await res.json();
        const url = respuesta.secure_url;

        dataUsuario.imagen = url;

        //alamacenamos al usuario

        const {data} = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/usuarios/agregar-usuario` , dataUsuario)

        toast.success(`${data.msg}`, {
            style: {
                backgroundColor: "#000",
                color: "#fff",
                border: "2px solid #10B981",
                fontWeight: "700"

            }
        });


    };

    return (
        <div className={"bg-black w-screen min-h-screen py-10  lg:px-44 lg:py-20 "}>
            <div className={"flex justify-center lg:justify-start"}>
                <div>
                    <h1 className={"text-white text-4xl font-black px-5 lg:px-0"}>Crea tu cuenta en DevJops</h1>
                    <h3 className={"text-white font-bold mt-2 px-5 lg:px-0"}>Comienza a publicar tus vacantes gratis , solo tienes que crear una cuenta</h3>
                </div>
            </div>


            <div className={"flex flex-col gap-5 px-14 mt-16  lg:px-48 lg:mt-20 w-full"}>
                <h1 className={"text-gray-500 font-black text-lg"}>INFORMACION GENERAL</h1>

                <form onSubmit={handleSubmit}>

                    <div className={"flex flex-col gap-8 lg:flex-row lg:gap-20 my-5"}>
                        <label htmlFor="nombre" className={"text-white font-black w-[40px]"}>
                            NOMBRE
                        </label>

                        <input type="text"
                               placeholder={"Introduce tu nombre"}
                               className={"w-full rounded-md p-1"}
                               id={"nombre"}
                               onChange={e =>
                                   setDataUsuario(
                                       {
                                           ...dataUsuario ,
                                           nombre : e.target.value
                                       }
                                   )}
                        />
                    </div>

                    <div className={"flex flex-col gap-8 lg:flex-row lg:gap-20 my-5"}>
                        <label htmlFor="email" className={"text-white font-black w-[40px]"}>
                            EMAIL
                        </label>

                        <input type="text"
                               placeholder={"Introduce tu email"}
                               className={"w-full rounded-md p-1"}
                               id={"email"}
                               onChange={e =>
                                   setDataUsuario(
                                       {
                                           ...dataUsuario ,
                                           email : e.target.value
                                       }
                                   )}
                        />
                    </div>

                    <div className={"flex flex-col gap-8 lg:flex-row lg:gap-20 my-5"}>
                        <label htmlFor="password" className={"text-white font-black w-[40px]"}>
                            PASSWORD
                        </label>

                        <input type="text"
                               placeholder={"Introduce tu password"}
                               className={"w-full rounded-md p-1"}
                               id={"repetir"}
                               onChange={e =>
                                   setDataUsuario(
                                       {
                                           ...dataUsuario ,
                                           password : e.target.value
                                       }
                                   )}

                        />
                    </div>

                    <div className={"flex flex-col gap-8 lg:flex-row lg:gap-20 my-5"}>
                        <label htmlFor="salario" className={"text-white font-black w-[40px]"}>
                            REPETIR PASSWORD
                        </label>

                        <input type="text"
                               placeholder={"Repite tu password"}
                               className={"w-full rounded-md p-1"}
                               id={"repetir"}
                               onChange={e =>
                                   setDataUsuario(
                                       {
                                           ...dataUsuario ,
                                           repetirPassword : e.target.value
                                       }
                                   )}
                        />
                    </div>


                    <div className='md:w-2/4 mx-auto'>

                        <div {...getRootProps()}
                             className="border-2 mt-10 border-gray-300 border-dashed h-96 w-full p-4 rounded-lg cursor-pointer">
                            <input {...getInputProps()} />
                            {
                                isDragActive ?
                                    <p className='text-center text-white uppercase font-black'>Coloca tus imágenes aquí
                                        ...</p> :
                                    <div className='flex flex-col items-center h-80 mt-2'>
                                        <p className={"text-white uppercase font-black"}>Coloca una imagen para tu
                                            perfil</p>
                                        <p className='w-full bg-red-600 text-white text-center uppercase rounded-md font-bold'>{noImg}</p>
                                        <div className='flex justify-center h-full w-full object-cover mt-2 rounded-md'>
                                            <img
                                                src={`${img ? `${img}` : 'https://res.cloudinary.com/dnsgfd9lf/image/upload/v1712263595/zpkpeqoumn4ebmgisl9g.png'}`}
                                                alt="imagen"/>
                                        </div>
                                    </div>
                            }
                        </div>


                    </div>

                    <div className={"flex justify-center my-10 "}>
                        <button className={"text-white px-4 py-2 bg-cyan-600 rounded-md uppercase font-black"}>Crear
                            Cuenta
                        </button>
                    </div>


                </form>
            </div>
        </div>

    )
}


export default CrearCuenta;