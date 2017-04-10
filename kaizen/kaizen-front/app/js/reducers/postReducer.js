import actionTypes from '../actions/actionTypes'
import {localstore} from '../store/localstore'

function postReducer(state = { posts:[]}, action) {
  const {payload} = action;
  switch (action.type) {
    case actionTypes.UPLOADER_POSTS_SUCCESS:
      return Object.assign({}, state, {
        posts:payload.result,
      });
    case actionTypes.UPLOADER_POSTS_FAILURE:
      return Object.assign({}, state, {
        errorMessage:payload['errormessage']
      });
    default:
      return state;
  }
}
export default postReducer;