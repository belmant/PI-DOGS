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

export function getDetail(id){
    console.log(id);
    try{
        return async function(dispatch){
            var json = await axios.get(`http://localhost:3001/dogs/${id}`);
            return dispatch({
                type: 'GET_DETAIL', 
                payload: json.data})
        };
    }catch(error){
        console.log(error);
    }
};


export function postDogs(payload){
    console.log(payload)
    return async function(dispatch){
        const response = await axios.post(`http://localhost:3001/dogs`, payload);
        console.log(response)
        return response;
    }
};

