import actionTypes from '../actions/actionTypes'

function loginReducer(state = {'isAuthenticated': false}, action) {
    const {payload} = action
    switch (action.type) {
        case actionTypes.USER_LOGIN_SUCCESS:
            return Object.assign({}, state, {
                token: payload['token'],
                username: payload['username'],
                isAuthenticated: true,
                errorMesage:''
            });
        case actionTypes.USER_LOGIN_FAIL:
            return Object.assign({}, state, {
                username: payload['username'],
                isAuthenticated: false,
                errorMesage:payload['error']
            });
        default:
            return state;
    }
}
export default loginReducer;