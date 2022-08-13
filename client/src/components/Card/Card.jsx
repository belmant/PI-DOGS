import React from "react"
import "./card.css"

export default function DogCard({name,image,temperament,weight,id}){
    return(
        <div key ={id} className = "card">
            <div>
            <h3>{name}</h3>
            <img className = "imgCard" src={`${image}`} alt = "Img Not Found"/>
            <h4>weight:{weight}</h4>
            <h4>temperament:{temperament}</h4>
            </div>
        </div>
        
    );

};
