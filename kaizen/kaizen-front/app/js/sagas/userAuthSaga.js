import { takeEvery,takeLatest } from 'redux-saga';
import { select, take, takem, call, put } from 'redux-saga/effects';
import types from '../actions/actionTypes'
import {userLoginSuccess,userLoginFailure,userSignupFailure,userSignupSuccess,ServerSideError} from '../actions/authActions'
import Api from './Api'


export function* userLoginTask(action) {
    try {
        const {status,result} = yield call(Api.loginWithfetchToken,action.payload);
        if(status){
            yield put(userLoginSuccess(result))
        }else{
            yield put(userLoginFailure(result))
        }
    }catch(err){
        yield put(ServerSideError({serverError:500}))
    }
}

export function* userSignupTask(action) {
    try {
        const {status,result} = yield call(Api.signupWithfetchToken,action.payload);
        if(status){
            yield put(userSignupSuccess(result))
        }else{
            yield put(userSignupFailure(result))
        }
    }catch(err){
        yield put(ServerSideError({serverError:500}))
    }
}

export function* watchFetchAuthToken() {
    yield* takeLatest(types.USER_LOGIN_REQUEST, userLoginTask);
}

export function* watchSignupTask() {
    yield* takeLatest(types.USER_SIGNUP_REQUEST, userSignupTask);
}

export default function* userAuthSaga() {
    yield [
        watchFetchAuthToken(),
        watchSignupTask()
    ];
}