import { takeEvery,takeLatest } from 'redux-saga';
import { select, take, takem, call, put } from 'redux-saga/effects';
import types from '../actions/actionTypes'
import {ServerSideError,fetchpostDetailSuccess,fetchpostDetailFailure} from '../actions/postActions'
import Api from './Api'


export function* fetchPostDetailTask(action) {
  try {
    const {status,result} = yield call(Api.getPostDetail, action.pid);
    if(status){
      yield put(fetchpostDetailSuccess({result:result}))
    }else{
      yield put(fetchpostDetailFailure(result))
    }
  }catch(err){
    yield put(ServerSideError({serverError:500}))
  }
}


export function*  watchPostDetailData() {
  yield* takeLatest(types.POST_DETAIL_REQUEST, fetchPostDetailTask);
}


export default function* postSaga() {
  yield [
    watchPostDetailData(),
  ];
}