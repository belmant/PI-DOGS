import React from "react"
import {useState, useEffect} from "react"
import {useDispatch, useSelector} from "react-redux"
import {filterTemperaments, getDogs, getTemperaments, filterCreated, orderByName} from "../../actions"
import {Link} from "react-router-dom"
import Card from "../Card/Card"
import Paginado from "../Paginado/Paginado"
import SearchBar from "../SearchBar/SearchBar"



export default function Home(){
const dispatch = useDispatch()
    const allTemperaments = useSelector((state) => state.temperaments)
    const allDogs = useSelector((state)=> state.dogs)

    const [orden, setOrden] = useState("") //estado local vacio, que se usa para que cuando seteo la pagina me modifique el estado local y se rederice  
    const [currentPage, setCurrentPage] = useState(1) //Aca guardo en un estado local la pagina actual (q arranca en 1)
    const [dogsPerPage, setDogsPerPage] = useState(8) // Este estado local guarda cuantos perros quiero por pagina (arrancan en 8)
    const indexDLastDog = currentPage * dogsPerPage // Es mi pagina x los perros x pagina(son 8)
    const indexOfFirstDog = indexDLastDog - dogsPerPage // Indice del 1er perro - la cantidad de perros por pagina (nos da 0)
    const currentDogs = allDogs.slice(indexOfFirstDog,indexDLastDog) //Aca solo selecciono el indice del 1er y ultimo perro


    const paginado =(pagNumber) =>{
        setCurrentPage(pagNumber)
    };

    useEffect(()=>{ //---> llena el estado cuando se monta el componente
        dispatch(getDogs());
    },[dispatch])

    useEffect(()=>{ //---> llena el estado cuando se monta el componente
        dispatch(getTemperaments()); // es lo mismo que hacer el map dispatch to props;
    },[dispatch])


    function handleClick(e){
        e.preventDefault();
        dispatch((getDogs()));
        document.getElementById('refreshAllTemp').reset();
    };

    function handleTempFilter(e){
        dispatch(filterTemperaments(e.target.value));
};

    function handleFilterCreated(e){
        dispatch(filterCreated(e.target.value));
    };

    function handleSort(e){
        e.preventDefault();
        dispatch(orderByName(e.target.value));
        setCurrentPage(1); //Lo seteo desde la pagina 1 para que arranque a ordenar alfabeticamente
        setOrden(`Ordenado ${e.target.value}`)
    }

    return(

        <div>
                <Link to = "/dogs"> Create Dog </Link>
                <h1>DOGS</h1>
                <button onClick ={(e)=>{handleClick(e)}}>
                    Refresh              
                </button>
            <div>
            <form id= "refreshAllTemp">
            <select onChange ={(e) => {handleFilterCreated(e)}} >
                    <option value = "all"> All </option>
                    <option value = "existent"> Existents </option>
                    <option value = "from"> Created </option>
                </select>

                <select  onChange ={(e) =>{handleSort(e)}}>
                    <option value = 'asc'> A - Z </option>
                    <option value = 'desc'> Z - A </option>
                    </select>

                    <select >
                    <option value = 'weignt_min'> Weight min </option>
                    <option value = 'weignt_max'> Weight max </option>
                </select>


                <select onChange ={(e)=> handleTempFilter(e)}>
                    <option value = "temperaments" > All Temperaments </option>
                    {allTemperaments?.map((t)=>{
                        return(
                        <option value ={`${t.name}`} key={t.id}>
                            {t.name}
                        </option>
                        );
                    })}
                </select>
                </form>

            <Paginado // Son las props que necesita el paginado para renderizarse
                dogsPerPage = {dogsPerPage}
                allDogs = {allDogs.length} // se le pasa asi porque necesito un valor numerico
                paginado = {paginado}
            />

            <SearchBar/>

            {currentDogs?.map((el)=>{
                return(
                    <div key = {el.id}>
                    <Link to = {"/home"+el.id} >
                            <Card name={el.name} image={el.image} temperament={el.temperament}
                            weight={el.weight}/>
                    </Link>
                    </div>
                );
            })}
            </div>
            </div>
            
        )
};