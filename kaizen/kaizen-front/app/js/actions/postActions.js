import types from '../actions/actionTypes'


export const fetchpostDetailRequest = (postid) => {
  return {
    type: types.POST_DETAIL_REQUEST,
    pid:postid
  }
};


export const fetchpostDetailFailure= (payload) => {
  return {
    type: types.POST_DETAIL_FAILURE,
    payload:{
      ...payload
    }
  }
};

export const fetchpostDetailSuccess = (payload) => {
  return {
    type: types.POST_DETAIL_SUCCESS,
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