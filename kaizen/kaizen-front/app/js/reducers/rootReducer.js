
import { combineReducers } from 'redux';
import loginReducer from './loginReducer';
import signupReducer from './signupReducer';
import uploaderReducer from './uploaderReducer';
import useractionReducer from './useractionReducer';

const rootReducer = combineReducers({
	auth:loginReducer,
	signup:signupReducer,
	uploaders: uploaderReducer,
  	useractions:useractionReducer
});

export default rootReducer;