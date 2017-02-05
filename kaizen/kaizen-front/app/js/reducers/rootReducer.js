
import { combineReducers } from 'redux';
import loginReducer from './loginReducer';
import signupReducer from './signupReducer'

const rootReducer = combineReducers({
	auth:loginReducer,
	signup:signupReducer
});

export default rootReducer;