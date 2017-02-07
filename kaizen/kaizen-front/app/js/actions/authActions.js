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

export const userSignupRequest = (username,email, password) => {
    return {
        type: types.USER_SIGNUP_REQUEST,
        payload:{
            username,
            email,
            password
        }
    }
};

export const userSignupFailure= (payload) => {
    return {
        type: types.USER_SIGNUP_FAILURE,
        payload:{
            ...payload
        }
    }
};

export const userSignupSuccess = (payload) => {
    return {
        type: types.USER_SIGNUP_SUCCESS,
        payload:{
            ...payload
        }
    }
};

export const ServerSideError = (payload) => {
    return {
        type: types.INTERNAL_SERVER_ERROR,
        payload:{
            ...payload
        }
    }
};