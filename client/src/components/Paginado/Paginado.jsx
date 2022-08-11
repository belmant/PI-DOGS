import React from "react";

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
                    <lu className = "number" key = {number}>
                    <href onClick={()=> paginado(number)}>{number}</href>
                    </lu>
                ))}
            </ul>
        </nav>
    )
}