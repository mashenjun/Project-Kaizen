
import { combineReducers } from 'redux';
import loginReducer from './loginReducer';
import signupReducer from './signupReducer'
import uploaderReducer from './uploaderReducer'

const rootReducer = combineReducers({
	auth:loginReducer,
	signup:signupReducer,
	uploaders: uploaderReducer
});

export default rootReducer;