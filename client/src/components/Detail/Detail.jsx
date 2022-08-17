import React from "react";
import { Link, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getDetail } from "../../actions";
import { useEffect } from "react";
import "./detail.css"

export default function Detail() {
  const dispatch = useDispatch();
  const { id } = useParams();
  useEffect(() => {
    dispatch(getDetail(id));
  }, [id, dispatch]);

  const myDog = useSelector((state) => state.dogDetail);
  console.log(myDog.name);
  return (
    <div>
      {myDog ? (
        <div key={myDog.id} className= "cardDetail">
          <Link to="/home">
        <button className="goBack">Go Back</button>
      </Link>
          <div className = "container">
          <div className="img">
          <img className ="imgDetail "src={myDog.image} />
          </div>
          <div className="infoDet">
          <h2>{myDog.name}</h2>
          <span>Weight:{myDog.weight}</span>
          <span>Height:{myDog.height}</span>
          <p>Temperament:{myDog.temperament}</p>
          <span>Life Span:{myDog.lifeSpan}</span>
        </div>
        </div>
        </div>
      ) : (
        <p>Loading..</p>
      )}
    </div>
  );
}



