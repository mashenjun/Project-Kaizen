import actionTypes from '../actions/actionTypes'
import {localstore} from '../store/localstore'
function uploaderReducer(state = { usermapdata:[]}, action) {
    const {payload} = action;
    switch (action.type) {
        case actionTypes.UPLOADER_FETCHDATA_SUCCESS:
            return Object.assign({}, state, {
                usermapdata:payload.results
            });
        case actionTypes.UPLOADER_FETCHDATA_FAILURE:
            return Object.assign({}, state, {

                errorMessage:payload['errormessage']
            });
        default:
            return state;
    }
}
export default uploaderReducer;