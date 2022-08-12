import React from 'react'
import { Link } from 'react-router-dom'
import DogCard from '../Card/Card'
import "./Dog.css"


function Dog({id, name, image, temperament, weight}) {
  return (
    <>
<div>
<div key = {id} >
<Link to = {"/home"+id} >
        <DogCard name={name} image={image} temperament={temperament}
        weight={weight}/>
</Link>
</div>
</div>
</>
  )}

export default Dog