import { createStore, combineReducers, applyMiddleware } from 'redux';
import logger from 'redux-logger'
import thunk from 'redux-thunk'
import axios from 'axios'

const initform = [{
    name: '',
    weight: 0,
    img: ''
}]

const formReducer = (data = initform, action) => {
    switch (action.type) {
        case "CHANGE_NAME":
            return {
                ...data,
                name: action.name
            }
        case "CHANGE_WEIGHT":
            return {
                ...data,
                weight: action.weight
            }
        case "CHANGE_IMG":
            return {
                ...data,
                img: action.img
            }
    }
    return data

}

export const bearActions = {
    getBearsSuccess: bears => ({
        type: 'GET_BEARS_SUCCESS',
        bears
    }),
    getBearsFailed: () => ({ type: 'GET_BEARS_FAILED' }),
    getBears: () => async (dispatch) => {
        try {
            console.log('get bear new')
            const response = await axios.get(`http://localhost/api/bears`)
            const responseBody = await response.data;
            console.log('response: ', responseBody)
            dispatch({ type: 'GET_BEARS_SUCCESS', bears: responseBody });
        } catch (error) {
            console.error(error);
            dispatch({ type: 'GET_BEARS_FAILED' });
        }
    }
}

export const formActions = {
    change_name: (name) => ({ type: 'CHANGE_NAME', name }),
    change_weight: (weight) => ({ type: 'CHANGE_WEIGHT', weight }),
    change_img: (img) => ({ type: 'CHANGE_IMG', img }),

    get_bears: (bears) => ({ type: 'GET_BEARS', bears }),
    add_bears: (bear) => ({ type: 'ADD_BEARS', bear }),
    delete_bears: (id) => ({ type: 'DELETE_BEARS', id }),
    update_bears: (id, bear) => ({ type: 'UPDATE_BEARS', id, bear })
}


const bearReducer = (bears = [], action) => {
    switch (action.type) {
        case "GET_BEARS":
            return action.bears
        case "ADD_BEARS":
            return [...bears, action.bear]
        case "DELETE_BEARS":
            return bears.filter(bear => +action.id !== +bear.id)
        case "UPDATE_BEARS":
            return bears.map(bear => {
                if (+bear.id === +action.id)
                    return action.bear;
                else
                    return bear;
            })
        case 'GET_BEARS_SUCCESS':
            console.log('action: ', action.bears)
            return action.bears
        case 'GET_BEARS_FAILED':
            console.log('action: Failed')
            return action.bears
        default:
            return bears
    }

}

const rootReducer = combineReducers({
    bear: bearReducer,
    form: formReducer
})

export const store = createStore(rootReducer, applyMiddleware(logger,thunk));