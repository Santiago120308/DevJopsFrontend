import {useNavigate} from "react-router-dom";

const OfertaPreview = ({oferta}) => {

    const naviagte = useNavigate();

    return (
        <div className={"mt-10 flex flex-col lg:flex lg:flex-row lg:gap-5 lg:items-center"}>
            <div className={"lg:w-[30%]"}>
                <p className={"text-white font-black text-xl uppercase"}>{oferta.empresa}</p>
                <p className={"text-gray-500 font-black"}>{oferta.titulo}</p>
            </div>

            <div className={"flex flex-col mt-5 gap-5 lg:mt-0 lg:flex-row lg:gap-14 lg:justify-end w-full"}>
                <div className={'lg:w-[25%]'}>
                    <p className={"text-gray-500 font-black text-xl"}>Ubicacion</p>
                    <p className={"text-white font-black"}>{oferta.ubicacion}</p>
                </div>

                <div className={'lg:w-[30%]'}>
                    <p className={"text-gray-500 font-black text-xl"}>Contrato</p>
                    <p className={"text-white font-black"}>{oferta.contratos[0].nombre}</p>
                </div>

                <button
                    className={"bg-emerald-500 text-white font-black px-16 rounded-md py-2 lg:py-0 text-sm"}
                    onClick={() => {naviagte(`/ver-vacante/${oferta.id}`)}}>
                    Mas info
                </button>
            </div>

        </div>
    );
}

export default OfertaPreview;