
import React, { useEffect, useState , useCallback} from 'react';


import { useDropzone } from 'react-dropzone';

const AsignarImagen = () => {

    const [alerta , setAlerta] = useState({});
    const [noImg , setNoImg] = useState('');
    const [img , setImg] = useState(null);


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

        if(!acceptedFiles[0]){

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
        console.log(url)

    };



    return (

          <>
                <div className='md:w-2/4 mx-auto'>

                        <div {...getRootProps()} className="border-2 mt-10 border-gray-300 border-dashed h-96 w-full p-4 rounded-lg cursor-pointer">
                            <input {...getInputProps()} />
                            {
                                isDragActive ?
                                    <p className='text-center text-white uppercase font-black'>Coloca tus imágenes aquí ...</p> :
                                    <div className='flex flex-col items-center h-80 mt-2'>
                                        <p className={"text-white uppercase font-black"}>Coloca una imagen para tu perfil</p>
                                        <p className='w-full bg-red-600 text-white text-center uppercase rounded-md font-bold'>{noImg}</p>
                                        <div className='flex justify-center h-full w-full object-cover mt-2 rounded-md'>
                                            <img src={`${img ? `${img}` : 'https://res.cloudinary.com/dnsgfd9lf/image/upload/v1712263595/zpkpeqoumn4ebmgisl9g.png' }`} alt="imagen" />
                                        </div>
                                    </div>
                            }
                        </div>


                </div>

            </>

    );
};

export default AsignarImagen;
