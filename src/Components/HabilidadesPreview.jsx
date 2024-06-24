import {useState , useEffect} from 'react'
import axios from "axios";
import useVacantes from "../Hooks/useVacantes.jsx";

const HabilidadesPreview = () => {

    const [habilidades , setHabilidades] = useState([]);
    const [skills , setSkills] = useState([]);
    const {dataVacante, setDataVacante , editar} = useVacantes();


    useEffect( () => {
        const listarHabilidades = async () => {
            const habi = await axios(`${import.meta.env.VITE_BACKEND_URL}/api/habilidades/listar-habilidades`);
            setHabilidades(habi.data);
        }

        return () => {listarHabilidades()}
    }, []);

    useEffect(() => {
        const habi = [...habilidades];

            const skil = habi?.map(skil => {

                for (const skilElement of dataVacante.habilidades) {
                    if(skilElement.id === skil.id) {
                        skil.seleccionado = true;
                        return skil;
                    }
                }
                skil.seleccionado = false;

                return skil;
            })

            setSkills(skil);

    }, [habilidades]);

    const handlerClick  = (skil) => {
        const skl = skills.map( prop => {
            if(skil.id === prop.id){
                prop.seleccionado = !prop.seleccionado;
            }
            return prop;
        })

        setSkills(skl);


        const habilidad = habilidades.find(hab => hab.id === skil.id);
        const existe = dataVacante.habilidades.find(hab => hab.id === habilidad.id);

        if(existe){

            const habilidadesSinRepetir = dataVacante
                  .habilidades
                  .filter(habi => habi.id !== habilidad.id);

            setDataVacante({
                ...dataVacante ,
                habilidades : [...habilidadesSinRepetir]
            })

            return
        }

        setDataVacante({
            ...dataVacante ,
           habilidades : [...dataVacante.habilidades , habilidad]
        })

    }

    return (
        <div>

            <h1 className={"text-gray-500 text-lg my-5 font-black uppercase"}>Conocimientos</h1>

            <div className={"grid grid-cols-2 xl:grid-cols-4 gap-4 text-center"}>
                {skills?.map(skil =>
                    <div
                        onClick={() => handlerClick(skil)}
                        className=
                        {`text-white border-2 border-emerald-500 rounded-md p-2 font-black cursor-pointer uppercase
                         ${ skil.seleccionado && "bg-emerald-500"}`}
                        key={skil.id}> {skil.nombre} </div>)}
            </div>
        </div>

    )

}

export default  HabilidadesPreview;