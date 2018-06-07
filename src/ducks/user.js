// a reducer is a function
import axios from 'axios';

const initialState = {
    user: {}
}

const GET_USER_DATA = "GET_USER_DATA";

export function getUser() {
    // this function is an action creator
    let userData = axios.get('./auth/user').then(res => res.data);
    return {
        type: GET_USER_DATA,
        payload: userData
    }
}

export default function reducer(state = initialState, action) {
    // the reducer takes in state and an action and a new piece of state that is stored in the redux store
    // state has a value of the initialState until it is updated with a new value, and then the "=initialState" is ignored
    return state;
}