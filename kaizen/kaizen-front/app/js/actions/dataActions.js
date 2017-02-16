import types from '../actions/actionTypes'


export const fetchUploaderDataRequest = () => {
    return {
        type: types.UPLOADER_FETCHDATA_REQUEST
    }
};


export const fetchUploaderDataFailure= (payload) => {
    return {
        type: types.UPLOADER_FETCHDATA_FAILURE,
        payload:{
            ...payload
        }
    }
};

export const fetchUploaderDataSuccess = (payload) => {
    return {
        type: types.UPLOADER_FETCHDATA_SUCCESS,
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