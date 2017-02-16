const createConstants = (...constants) => {
    let types = {};
    for(let type of constants){
        types[type] = type;
    }
    return types;
};

export default createConstants(
    'USER_LOGIN_REQUEST',
    'USER_LOGIN_SUCCESS',
    'USER_LOGIN_FAILURE',

    'USER_SIGNUP_REQUEST',
    'USER_SIGNUP_SUCCESS',
    'USER_SIGNUP_FAILURE',

    'UPLOADER_FETCHDATA_REQUEST',
    'UPLOADER_FETCHDATA_SUCCESS',
    'UPLOADER_FETCHDATA_FAILURE',

    'INTERNAL_SERVER_ERROR',
)
