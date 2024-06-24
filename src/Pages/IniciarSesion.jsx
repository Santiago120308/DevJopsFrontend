import React, {useCallback, useEffect, useState} from "react";
import useVacantes from "../Hooks/useVacantes.jsx";
import {toast} from "react-toastify";
import axios from 'axios'
import {useNavigate} from "react-router-dom";

const IniciarSesion = () => {
    const navigate = useNavigate();
    const { dataSesion , setDataSesion } = useVacantes();

    const handleSubmit = async e => {
        e.preventDefault();

       if(Object.values(dataSesion).includes('')){
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

     try {
         const{data} = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/usuarios/iniciar-sesion` , dataSesion);
         console.log(data);

         //almacenamos el jwt en el local storage
         localStorage.setItem("id", data.id);
         localStorage.setItem("token", data.token);

         toast.success(`Sesion Iniciada`, {
             style: {
                 backgroundColor: "#000",
                 color: "#fff",
                 border: "2px solid #10B981",
                 fontWeight: "700"

             }
         });

         setTimeout(()=>{
             navigate('/')
         } , 3000)
     }catch (err) {
           console.log(err)
         toast.error(`${err.response?.data?.msg}`, {
             style: {
                 backgroundColor: "#000",
                 color: "#fff",
                 border: "2px solid #FF0000",
                 fontWeight: "700"
             }
         });
     }

    }


    return (
        <div className={"bg-black w-screen min-h-screen py-10  lg:px-44 lg:py-20 "}>
            <div className={"flex justify-center lg:justify-start"}>
                <div>
                    <h1 className={"text-white text-4xl font-black px-5 lg:px-0"}>Iniciar Sesion DevJops</h1>
                    <h3 className={"text-white font-bold mt-2 px-5 lg:px-0"}>Inicia sesion y comienza a publicar tus vacantes</h3>
                </div>
            </div>


            <div className={"flex flex-col gap-5 px-14 mt-16  lg:px-48 lg:mt-20 w-full"}>
                <h1 className={"text-gray-500 font-black text-lg"}>Inicia Sesion</h1>

                <form onSubmit={handleSubmit}>


                    <div className={"flex flex-col gap-8 lg:flex-row lg:gap-20 my-5"}>
                        <label htmlFor="email" className={"text-white font-black w-[40px]"}>
                            EMAIL
                        </label>

                        <input type="text"
                               placeholder={"Introduce tu email"}
                               className={"w-full rounded-md p-1"}
                               id={"email"}
                               onChange={e => {
                                   setDataSesion(
                                       {
                                           ...dataSesion ,
                                           email : e.target.value
                                       }
                                   )
                               }}
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
                               onChange={e => {
                                    setDataSesion(
                                        {
                                            ...dataSesion ,
                                            password : e.target.value
                                        }
                            )
                        }}

                        />
                    </div>

                    <div>
                        <p className={"text-gray-500 uppercase font-black my-5 cursor-pointer"}
                        onClick={() => {navigate('/crear-cuenta')}}>crear cuenta</p>
                    </div>


                    <div className={" my-10 "}>
                        <button className={"text-white px-4 py-2 bg-cyan-600 rounded-md uppercase font-black"}>
                            Iniciar Sesion
                        </button>
                    </div>


                </form>
            </div>
        </div>

    )
}


export default IniciarSesion;