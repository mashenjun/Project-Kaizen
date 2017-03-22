import types from '../actions/actionTypes'


export const fetchuseruploadersrequest = (uid) => {
  return {
    type: types.USER_UPLOADERS_REQUEST,
    uid:uid
  }
};


export const fetchuseruploadersFailure= (payload) => {
  return {
    type: types.USER_UPLOADERSFAILURE,
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