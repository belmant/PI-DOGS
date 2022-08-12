import React from "react"
import "./Card.css"

export default function DogCard({name,image,temperament,weight}){
    return(
        <div className = "card">
            <div>
            <h3>{name}</h3>
            <img className = "imgCard" src={`${image}`} alt = "Img Not Found"/>
            <h4>weight:{weight}</h4>
            <h4>temperament:{temperament}</h4>
            </div>
        </div>
        
    );

};
