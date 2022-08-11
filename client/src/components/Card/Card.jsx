import React from "react"

export default function DogCard({name,image,temperament,weight}){
    return(

        <div>
            <h3>{name}</h3>
            <img src={`${image}`} alt = "Img Not Found" width="350px" height="250px"/>
            <h4>weight:{weight}</h4>
            <h4>temperament:{temperament}</h4>
        </div>
        
    );

};
