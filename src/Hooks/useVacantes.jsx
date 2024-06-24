import {useContext} from 'react'
import vacantesContext from "../Context/VacantesProvider.jsx";

const useVacantes = () => {
    return useContext(vacantesContext)
}

export default  useVacantes;