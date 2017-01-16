import { takeEvery } from 'redux-saga';
import { select, take, takem, call, put } from 'redux-saga/effects';
import types from '../actions/actionTypes'
import {userLoginSuccess,userLoginFailure} from '../actions/authActions'
import 'whatwg-fetch'

export function* userLoginTask(action) {
    const {username, password} = action.payload;
    const a = ()=>(fetch('/accounts/api/login/', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            username: username,
            password: password,
        })
    }));
    try {
        let payload = yield call(a);
        console.log('success?', payload)
    }  catch(err) {
        console.log('What error it is ?',err);
        yield put(userLoginFailure({username, errorMessage:{username:"There is no this username",password:"password is wrong"}}))
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