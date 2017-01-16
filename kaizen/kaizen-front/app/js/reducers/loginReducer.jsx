import actionTypes from '../actions/actionTypes'

function loginReducer(state = {'isAuthenticated': false, errorMessage:{}}, action) {
    const {payload} = action
    switch (action.type) {
        case actionTypes.USER_LOGIN_SUCCESS:
            return Object.assign({}, state, {
                token: payload['token'],
                username: payload['username'],
                isAuthenticated: true
            });
        case actionTypes.USER_LOGIN_FAILURE:
            return Object.assign({}, state, {
                username: payload['username'],
                isAuthenticated: false,
                errorMessage:payload['errorMessage']
            });
        default:
            return state;
    }
}
export default loginReducer;