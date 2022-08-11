// import React, {useState, useEffect} from "react";
// import {Link,useHistory} from "react-router-dom";
// import {postDogs, getTemps} from "../actions/index.js";
// import {useDispatch, useSelector} from "react-redux";


// export function DogCreate(){
//     const dispatch = useDispatch();
//     const temperamentos = useSelector((state)=> state.temperament)

//     const [imput,SetImput] = useState({
//         name: "",
//         image: "",
//         height: "",
//         weight: "",
//         lifeSpan: "",
//         temperament: []
//     })

//     useEffect(()=>{
//         dispatch(getTemps());
//     },[dispatch])

//     return(
//         <div>
//             <Link to = "/home"><button>Back to Home</button></Link>
//             <h1>Create your Dog</h1>
//             <form></form>
//                 <div>
//                     <label>Nombre:</label>
//                     <input
//                     type = "text"
//                     value = {input.name}
//                     name = "name"
//                     />
//                 </div>
//         </div>
//     )
// };
