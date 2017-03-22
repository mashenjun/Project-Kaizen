
import { takeEvery,takeLatest } from 'redux-saga';
import { select, take, takem, call, put } from 'redux-saga/effects';
import types from '../actions/actionTypes'
import {ServerSideError,fetchuseruploadersSuccess,fetchuseruploadersFailure} from '../actions/useraction'
import Api from './Api'
import 'whatwg-fetch'


export function* fetchUserActionTask(action) {
  try {
    const {status,result} = yield call(Api.getUploaders,action.uid);
    if(status){
      yield put(fetchuseruploadersSuccess({result:result}))
    }else{
      yield put(fetchuseruploadersFailure(result))
    }
  }catch(err){
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