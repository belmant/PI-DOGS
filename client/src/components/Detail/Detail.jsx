import React from 'react';
import {Link, useParams} from 'react-router-dom';
import {useDispatch, useSelector} from "react-redux";
import { getDetail } from '../../actions';
import {useEffect} from "react";


export default function Detail(){

const dispatch = useDispatch();
const {id}= useParams();
useEffect(()=>{
    dispatch(getDetail(id));
},[id,dispatch])


const myDog = useSelector((state)=> state.dogDetail)
console.log(myDog.name)
return(
    <div>
        {
            myDog?
            <div key ={myDog.id}>
                <h1>{myDog.name}</h1>
                <img src={myDog.image}/>
                <h2>Weight:{myDog.weight}</h2>
                <h2>Height:{myDog.height}</h2>
                <h2>Temperament:{myDog.temperament}</h2>
                <h2>Life Span:{myDog.lifeSpan}</h2>
            </div> : <p>Loading..</p>
        } 
        <Link to ='/home'>
            <button>Go Back</button>
        </Link>  
    </div>
)
};




// export default function dogsDetails(){
// const dispatch = useDispatch();
// const {id} = useParams();

// useEffect(()=>{
//     dispatch(getDogsById(id))
// },[id,dispatch])


// const{name, 
//     image,
//     temperament,
//     weight,
//     height,
//     life_span} = useSelector((state)=> state.dogsDetails);
    
//     return(
//         <>
        
//         </>
//     )
// };