import { React, useEffect } from "react";

const initialState = {
    dogs : [],
    allDogs: [],
    temperaments: [],
}

function rootReducer(state = initialState,action){
    switch(action.type){
        case 'GET_DOGS':
            return{
                ...state,
                dogs: action.payload,
                allDogs: action.payload
            }
            case 'GET_TEMPERAMENTS':
            return{
                ...state,
                temperaments: action.payload
            }
            case 'GET_NAME_DOGS':
                return{
                    ...state,
                    dogs: action.payload
                }
            case 'POST_DOGS':
                return{
                    ...state,
                }
            case 'GET_TEMPS':
                return{
                    ...state,
                    temperaments:action.payload,
                }
            case 'FILTER_TEMPERAMENT':
            const allDogs = state.allDogs;
            let dogsTemp = allDogs.map(p =>{
            if(p.temperament) return p
            });
            dogsTemp = dogsTemp.filter((p) => p !== undefined);
            const statusFilter = action.payload === "temperaments" ? allDogs
            :dogsTemp.filter((p) => p.temperament.includes(action.payload))
            return{
                ...state,
                dogs: statusFilter
            };
            case 'FILTER_BY_CREATED':
                const perrosTotales = state.allDogs;
                const filterCreated = //Aca llegan los perros que cumplen con el filtro
                action.payload === 'from'? perrosTotales.filter((el) => el.from):
                perrosTotales.filter((el) => !el.from)
                return{
                    ...state,
                    dogs:action.payload === 'All' ? state.allDogs : filterCreated,
                }
            case 'ORDER_BY_NAME':
                const sortdArr = action.payload === 'asc' ?
                state.dogs.sort(function(a, b){
                    if(a.name.toLowerCase() > b.name.toLowerCase()){
                        return 1;
                    }
                    if(b.name.toLowerCase() > a.name.toLowerCase()){
                        return -1;
                    }
                    return 0;
                    }) :
                state.dogs.sort(function(a,b){
                    if(a.name.toLowerCase() > b.name.toLowerCase()){
                        return -1;
                    }
                    if(b.name.toLowerCase() > a.name.toLowerCase()){
                        return 1;
                    }
                    return 0;
                })
            return{
                ...state,
                dogs: sortdArr
            }




            default:
                return state;
    }
};


export default rootReducer;