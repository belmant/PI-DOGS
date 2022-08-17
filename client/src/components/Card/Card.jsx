import React from "react";
import "./card.css";

export default function DogCard({ name, image, temperament, weight, id }) {
  return (
      <div key={id} className="card">
        <div className="img">
          <img className="imgCard" src={`${image}`} alt="Img Not Found" />
        </div>
        <div className="info" >
            <h3>{name}</h3>
          <span>Weight:{weight}</span>
          <p>Temperament:{temperament}</p>
        </div>
      </div>
    
  );
}

