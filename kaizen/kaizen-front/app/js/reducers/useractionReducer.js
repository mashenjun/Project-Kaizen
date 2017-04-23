import actionTypes from '../actions/actionTypes'
import {localstore} from '../store/localstore'

function useractionReducer(state = {userUploaders:[],errorMessage:200}, action) {
  const {payload} = action;
  switch (action.type) {
    case actionTypes.USER_UPLOADERS_SUCCESS:
      localstore.refreshtoken(payload.token);
      return Object.assign({}, state, {
        userUploaders:payload.result,
        errorMessage:200
      });
    case actionTypes.USER_UPLOADERS_FAILURE:
      if(payload.statuc_code === 401){
        return Object.assign({},state,{
          errorMessage:401
        })
      }else{
        return Object.assign({}, state, {
          errorMessage:"Some error happend in server side"
        });
      }
    default:
      return state;
  }
}
export default useractionReducer;