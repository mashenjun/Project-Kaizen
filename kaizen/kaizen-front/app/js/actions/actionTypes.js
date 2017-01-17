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

    'INTERNAL_SERVER_ERROR',
)
