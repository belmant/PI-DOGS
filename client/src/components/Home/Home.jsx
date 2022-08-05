import React from "react"
import {useState, useEffect} from "react"
import {useDispatch, useSelector} from "react-redux"
import {getDogs} from "../../actions"
import {Link} from "react-router-dom"
import Card from "../Card/Card"


export default function Home(){
    const dispatch = useDispatch()
    const allDogs = useSelector((state)=> state.dogs)
        useEffect(()=>{
            dispatch(getDogs()); // es lo mismo que hacer el map dispatch to props;
        },[dispatch])
    function handleClick(e){
        e.preventDefault();
        dispatch((getDogs));
    }
        return(

        <div>
                <Link to = "/dogs"> Crear Perro </Link>
                <h1>DOGS</h1>
                <button onClick ={(e)=>{handleClick(e)}}>
                    Volver a cargar todos los perros
                </button>
            <div>
            <select>
                <option value = "x" > Dogs... </option>
                    <option value = "All"> All </option>
                    <option value = "false"> Real </option>
                    <option value = "true"> Created </option>
                </select>

                <select>
                    <option value = "order" > Order... </option>
                    <option value = 'asc'> A-Z </option>
                    <option value = 'desc'> Z-A </option>
                    <option value = 'weignt_min'> Weight min </option>
                    <option value = 'weignt_max'> Weight max </option>
                </select>

                <select>
                    <option value = "x" >Temperaments... </option>
                    <option value = "temperaments"> Temperaments </option>
                </select>
            {allDogs?.map((el)=>{
                return(
                    <fragment>
                        <Link to = {"/home"+el.id}>
                            <Card name={el.name} image={el.img} temperament={el.temperament}
                            weight={el.weight} id={el.id}/>
                        </Link>
                    </fragment>
                );
            })}
            </div>
            </div>
        )
};