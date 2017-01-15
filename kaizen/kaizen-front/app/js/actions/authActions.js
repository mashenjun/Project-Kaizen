import types from '../actions/actionTypes'

export const userLoginRequest = (username, password) => {
    return {
        type: types.USER_LOGIN_REQUEST,
        payload:{
            username,
            password
        }
    }
};


export const userLoginSuccess = (payload) => {
    return {
        type: types.USER_LOGIN_SUCCESS,
        payload:{
            ...payload
        }
    }
};