
import { combineReducers } from 'redux';
import loginReducer from './loginReducer';
import signupReducer from './signupReducer';
import uploaderReducer from './uploaderReducer';
import useractionReducer from './useractionReducer';
import postReducer from './postReducer';
import postDetailReducer from './postDetailReducer'

const rootReducer = combineReducers({
	auth:loginReducer,
	signup:signupReducer,
	uploaders: uploaderReducer,
  	useractions:useractionReducer,
    postofUploader:postReducer,
    postDetail: postDetailReducer
});

export default rootReducer;