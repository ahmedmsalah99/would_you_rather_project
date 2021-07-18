import {LOADING} from '../actions/loading'


export default function loading(state=true,action){
    switch (action.type){
    case LOADING:
        return !state
    default:
        return state
    }
}