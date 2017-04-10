import actionTypes from '../actions/actionTypes'

function postDetailReducer(state = { postDetail:{}}, action) {
  const {payload} = action;
  switch (action.type) {
    case actionTypes.POST_DETAIL_SUCCESS:
      return Object.assign({}, state, {
        postDetail:payload.result,
      });
    case actionTypes.POST_DETAIL_FAILURE:
      return Object.assign({}, state, {
        errorMessage:payload['errormessage']
      });
    default:
      return state;
  }
}
export default postDetailReducer;