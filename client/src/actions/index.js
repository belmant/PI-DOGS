/* eslint-disable no-unreachable */
import axios from "axios"


export function getDogs(){
    return async function(dispatch){
        var json = await axios.get(`http://localhost:3001/dog`);
        return dispatch({
            type: 'GET_DOGS',
            payload: json.data
        })
    }
};

export function getNameDogs(name){
    return async function(dispatch){
        try{
            var json = await axios.get(`http://localhost:3001/dogsName?name=` + name)
            return dispatch({
                type: "GET_NAME_DOGS",
                payload: json.data
            })
        }catch(error){
            console.log(error)
        }
    }
};

export function getTemperaments(){
    return async function(dispatch){
        var json = await axios.get(`http://localhost:3001/temperamento`);
        return dispatch({
            type: 'GET_TEMPERAMENTS',
            payload: json.data
        })
    }
};


export function filterTemperaments(payload){
    return{
        type:'FILTER_TEMPERAMENT',
        payload,
    }
};

export function filterCreated(payload){
    return{
        type:'FILTER_BY_CREATED',
        payload
    }
};

export function orderByName(payload){
    return{
        type: 'ORDER_BY_NAME',
        payload
    }
};

export function orderByWeight(payload){
    return{
        type: 'ORDER_BY_WEIGHT',
        payload
    }
};

export function getDogsById(id){
    console.log(id);
    try{
        return async function(dispatch){
            var json = await axios.get(`http://localhost:3001/dogs/${id}`);
            return dispatch({
                type: 'GET_DOGS_BY_ID', 
                payload: json.data})
        };
    }catch(e){
        console.log(e);
    }
}
