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

export const searchUploaderDataRequest = (keyword) => {
  return {
    type: types.UPLOADER_SEARCH_REQUEST,
    keyword:keyword
  }
};


export const searchUploaderDataFailure= (payload) => {
  return {
    type: types.UPLOADER_SEARCH_FAILURE,
    payload:{
      ...payload
    }
  }
};

export const searchUploaderDataSuccess = (payload) => {
  return {
    type: types.UPLOADER_SEARCH_SUCCESS,
    payload:payload
  }
};

export const filterUploaderDataRequest = (filter) => {
  return {
    type: types.UPLOADER_FILTER_REQUEST,
    filter:filter
  }
};


export const filterUploaderDataFailure= (payload) => {
  return {
    type: types.UPLOADER_FILTER_FAILURE,
    payload:{
      ...payload
    }
  }
};

export const filterUploaderDataSuccess = (payload) => {
  return {
    type: types.UPLOADER_FILTER_SUCCESS,
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