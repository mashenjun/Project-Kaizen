
import { takeEvery,takeLatest } from 'redux-saga';
import { select, take, takem, call, put } from 'redux-saga/effects';
import types from '../actions/actionTypes'
import {ServerSideError,fetchuseruploadersSuccess,fetchuseruploadersFailure} from '../actions/useraction'
import Api from './Api'


export function* fetchUserActionTask(action) {
  try {
    const {status,result,token} = yield call(Api.getUploaders,action.uid, action.kaizenToken);
    if(status){
        yield put(fetchuseruploadersSuccess({result:result,token:token}))
    }else{
        yield put(fetchuseruploadersFailure(result))
    }
  }catch(err){
    console.log(err);
    yield put(ServerSideError({serverError:500}))
  }
}


export function*  watchFetchUploaderData() {
  yield* takeLatest(types.USER_UPLOADERS_REQUEST, fetchUserActionTask);
}


export default function* userActionSaga() {
  yield [
    watchFetchUploaderData(),
  ];
}