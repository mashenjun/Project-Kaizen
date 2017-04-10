import types from '../actions/actionTypes'


export const fetchUploaderPostsRequest = (uploaderid) => {
  return {
    type: types.UPLOADER_POSTS_REQUEST,
    uploaderid:uploaderid
  }
};


export const fetchUploaderPostsFailure= (payload) => {
  return {
    type: types.UPLOADER_POSTS_FAILURE,
    payload:{
      ...payload
    }
  }
};

export const  fetchUploaderPostsSuccess = (payload) => {
  return {
    type: types.UPLOADER_POSTS_SUCCESS,
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