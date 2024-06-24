const NoAutenticado = () => {

    return (
        <>
            <div className={"bg-white w-screen min-h-screen"}>
                <h1 className={"text-black text-5xl font-black text-center pt-10"}>Error de Autenticacion</h1>
                <h2 className={"text-black text-2xl font-black text-center pt-5"}>Inicia sesion para acceder a este apartado</h2>
                <div className={'flex justify-center'}>
                    <img
                        src="https://res.cloudinary.com/dnsgfd9lf/image/upload/v1718130112/warning_oq9bq9.gif"
                        alt="imagen"
                    className={''}/>
                </div>
            </div>

        </>
    );

}

export default NoAutenticado;
