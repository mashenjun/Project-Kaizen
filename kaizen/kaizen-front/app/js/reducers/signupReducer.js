import actionTypes from '../actions/actionTypes'

function signupReducer(state = {signupSuccess: false, errorMessage:{}}, action) {
    const {payload} = action;
    switch (action.type) {
        case actionTypes.USER_SIGNUP_SUCCESS:
            return Object.assign({}, state, {
                signupSuccess: true,
                username: payload['username'],
                errorMessage:{}
            });
        case actionTypes.USER_SIGNUP_FAILURE:
            return Object.assign({}, state, {
                signupSuccess: false,
                username:'',
                errorMessage:payload['errormessage']
            });
        case actionTypes.INTERNAL_SERVER_ERROR:
            return Object.assign({}, state, {
                signupSuccess: false,
                serverError:payload['serverError']
            });
        default:
            return state;
    }
}
export default signupReducer;
