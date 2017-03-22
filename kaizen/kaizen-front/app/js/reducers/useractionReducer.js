import actionTypes from '../actions/actionTypes'

function useractionReducer(state = {userUploaders:[]}, action) {
  const {payload} = action;
  switch (action.type) {
    case actionTypes.USER_UPLOADERS_SUCCESS:
      return Object.assign({}, state, {
        userUploaders:payload.result,
      });
    case actionTypes.USER_UPLOADERS_FAILURE:
      return Object.assign({}, state, {
        errorMessage:"Some error happend in server side"
      });
    default:
      return state;
  }
}
export default useractionReducer;