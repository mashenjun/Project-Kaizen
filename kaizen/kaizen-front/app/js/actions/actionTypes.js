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

    'UPLOADER_PAGE_CHANGE',

    'USER_UPLOADERS_REQUEST',
    'USER_UPLOADERS_SUCCESS',
    'USER_UPLOADERS_FAILURE',

    'UPLOADER_POSTS_REQUEST',
    'UPLOADER_POSTS_SUCCESS',
    'UPLOADER_POSTS_FAILURE',

    'POST_DETAIL_REQUEST',
    'POST_DETAIL_SUCCESS',
    'POST_DETAIL_FAILURE',

    'INTERNAL_SERVER_ERROR',
)
