import React from "react";
import "./Paginado.css"


export default function paginado({dogsPerPage, allDogs, paginado}){
    const pageNumbers = []

    for(let i=0; i<Math.ceil(allDogs/dogsPerPage); i++){
        pageNumbers.push(i+1)
    }

    return( // este componente es el que renderiza los numeros en si 
        <nav>
            <ul className="paginado">
                { pageNumbers && 
                pageNumbers.map(number =>(
                    <li className = "number" key = {number}>
                    <href onClick={()=> paginado(number)}>{number}</href>
                    </li>
                ))}
            </ul>
        </nav>
    )
}