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


export const userLoginFailure= (payload) => {
    return {
        type: types.USER_LOGIN_FAILURE,
        payload:{
            ...payload
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