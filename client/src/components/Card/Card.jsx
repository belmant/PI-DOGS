import React from "react"

export default function DogCard({name,image,temperament,weight,id}){
    return(

        <div>
            <h3>{name}</h3>
            <img src={image} alt = "Img Not Found" width="200px" height="250px"/>
            <h4>{id}</h4>
            <h4>{weight}</h4>
            <h4>{temperament}</h4>
        </div>
        
    );

};
