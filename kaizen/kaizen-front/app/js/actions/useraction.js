import types from '../actions/actionTypes'


export const fetchuseruploadersrequest = (uid, kaizenToken) => {
  return {
    type: types.USER_UPLOADERS_REQUEST,
    uid:uid,
    kaizenToken:kaizenToken
  }
};


export const fetchuseruploadersFailure= (payload) => {
  return {
    type: types.USER_UPLOADERS_FAILURE,
    payload:{
      ...payload
    }
  }
};

export const fetchuseruploadersSuccess = (payload) => {
  return {
    type: types.USER_UPLOADERS_SUCCESS,
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