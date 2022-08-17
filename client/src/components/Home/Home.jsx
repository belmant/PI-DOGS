import React from "react"
import {useState, useEffect} from "react"
import {useDispatch, useSelector} from "react-redux"
import {getDogs,
        filterTemperaments, 
        getTemperaments, 
        filterCreated, 
        orderByName,
        orderByWeight} from "../../actions"
import {Link} from "react-router-dom"
import Paginado from "../Paginado/Paginado"
import SearchBar from "../SearchBar/SearchBar"
import "./home.css"
import Dog from "../Dog/Dog"


export default function Home(){
    const dispatch = useDispatch()
    const allTemperaments = useSelector((state) => state.temperaments)
    const allDogs = useSelector((state)=> state.dogs)

    const [currentPage, setCurrentPage] = useState(1)//Aca guardo en un estado local la pagina actual (q arranca en 1)
    const [orden, setOrden] = useState("") //estado local vacio, que se usa para que cuando seteo la pagina me modifique el estado local y se rederice  

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
        if(e === 0){
            return ("Perro no encontrado")
        };
        dispatch(filterCreated(e.target.value));
    };

    function handleSort(e){
        e.preventDefault();
        dispatch(orderByName(e.target.value));
        setCurrentPage(1); //Lo seteo desde la pagina 1 para que arranque a ordenar alfabeticamente
        setOrden(`Ordenado ${e.target.value}`)
    }

    function handleSortWeight(e){
        e.preventDefault();
        dispatch(orderByWeight(e.target.value));
        setCurrentPage(1); //Lo seteo desde la pagina 1 para que arranque a ordenar alfabeticamente
        setOrden(`Ordenado ${e.target.value}`)
    }

    return(

        <div>
        <div className="header">
                <Link className="linkCreate" to = "/dogs"> Create Dog </Link>
                <h2>DOGS</h2>
                <button className="btnRefresh" onClick ={(e)=>{handleClick(e)}}>
                    Refresh              
                </button>
        </div>
        <div className = "formHome">
            <form id= "refreshAllTemp">
                <select onChange ={(e) => {handleFilterCreated(e)}} >
                    <option value = "all"> All </option>
                    <option value = "existent"> Existents </option>
                    <option value = "from"> Created </option>
                </select>

                <select onChange ={(e) =>{handleSort(e)}}>
                    <option value = 'asc'> A - Z </option>
                    <option value = 'desc'> Z - A </option>
                </select>

                <select onChange ={(e) =>{handleSortWeight(e)}}>
                    <option value = 'min'> Weight Min </option>
                    <option value = 'max'> Weight Max </option>
                </select>

                <select onChange ={(e) => {handleTempFilter(e)}}>
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

            <Paginado 
                dogsPerPage = {dogsPerPage}
                allDogs = {allDogs.length} // se le pasa asi porque necesito un valor numerico
                paginado = {paginado} 
            />

            <SearchBar/>

    </div>
            <div className = "containerCard">
            {
            currentDogs?.map((el)=>{
                return(
                <Dog 
                id = {el.id} name ={el.name} image ={el.image} 
                temperament={el.temperament} weight = {el.weight}
                />
                )})}
    </div>
    </div>
)};
