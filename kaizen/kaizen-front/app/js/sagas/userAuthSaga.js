import { takeEvery } from 'redux-saga';
import { select, take, takem, call, put } from 'redux-saga/effects';
import types from '../actions/actionTypes'
import {userLoginSuccess,userLoginFailure,ServerSideError} from '../actions/authActions'
import Api from './Api'
import 'whatwg-fetch'


export function* userLoginTask(action) {
    try {
        const {status,result} = yield call(Api.loginWithfetchToken,action.payload);
        if(status===200){
            yield put(userLoginSuccess(result))
        }else{
            yield put(userLoginFailure(result))
        }
    }catch(err){
        yield put(ServerSideError({serverError:500}))
    }
}

export function* watchFetchAuthToken() {
    yield* takeEvery(types.USER_LOGIN_REQUEST, userLoginTask);
}

export default function* userAuthSaga() {
    yield [
        watchFetchAuthToken()
    ];
}