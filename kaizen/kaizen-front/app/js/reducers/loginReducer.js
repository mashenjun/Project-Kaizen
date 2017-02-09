import actionTypes from '../actions/actionTypes'
import {localstore} from '../store/localstore'
function loginReducer(state = {'isAuthenticated': false, errorMessage:{}}, action) {
    const {payload} = action
    switch (action.type) {
        case actionTypes.USER_LOGIN_SUCCESS:
            localstore.setToken(payload['token']);
            return Object.assign({}, state, {
                token: payload['token'],
                username: payload['username'],
                isAuthenticated: true
            });
        case actionTypes.USER_LOGIN_FAILURE:
            return Object.assign({}, state, {
                username: payload['username'],
                isAuthenticated: false,
                errorMessage:payload['errormessage']
            });
        case actionTypes.INTERNAL_SERVER_ERROR:
            return Object.assign({}, state, {
                isAuthenticated: false,
                serverError:payload['serverError']
            });
        default:
            return state;1
    }
}
export default loginReducer;