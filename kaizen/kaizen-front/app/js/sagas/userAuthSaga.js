import { takeEvery } from 'redux-saga';
import { select, take, takem, call, put } from 'redux-saga/effects';
import types from '../actions/actionTypes'
import {userLoginSuccess} from '../actions/authActions'


export function* userLoginTask(action) {
    const {username, password} = action.payload;
    yield put(userLoginSuccess({username, password}))
    try {
        // const payload = yield call(api.fetchTenantInfo, landscape, tenant);
        // yield put(fetchTenantInfo.success({
        //     ...payload
        // }));
    }  catch(err) {
        // yield put(fetchTenantInfo.failure(err.message));
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