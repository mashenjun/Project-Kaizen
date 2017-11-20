import actionTypes from '../actions/actionTypes'
import {localstore} from '../store/localstore'
function uploaderReducer(state = {usermapdata: [], totalCount: 0, currentPage: 1}, action) {
  const {payload} = action;
  switch (action.type) {
    case actionTypes.UPLOADER_FETCHDATA_SUCCESS:
      return Object.assign({}, state, {
        usermapdata: payload.results,
        totalCount: payload.count
      });
    case actionTypes.UPLOADER_FETCHDATA_FAILURE:
      return Object.assign({}, state, {
        errorMessage: payload['errormessage']
      });
    case actionTypes.UPLOADER_SEARCH_SUCCESS:
      console.log(payload);
      return Object.assign({}, state, {
        usermapdata: payload,
        totalCount: payload.length
      });
    case actionTypes.UPLOADER_SEARCH_FAILURE:
      return Object.assign({}, state, {
        errorMessage: payload['errormessage']
      });
    case actionTypes.UPLOADER_PAGE_CHANGE:
      return Object.assign({}, state, {
        currentPage: action.page
      });
    default:
      return state;
  }
}
export default uploaderReducer;