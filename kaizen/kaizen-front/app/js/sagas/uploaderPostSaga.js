
import { takeEvery,takeLatest } from 'redux-saga';
import { select, take, takem, call, put } from 'redux-saga/effects';
import types from '../actions/actionTypes'
import {ServerSideError,fetchUploaderPostsSuccess,fetchUploaderPostsFailure} from '../actions/uploaderAction'
import Api from './Api'


export function* fetchUploaderPostTask(action) {
  try {
    const {status,result} = yield call(Api.getUploderPost, action.uploaderid);
    if(status){
      yield put(fetchUploaderPostsSuccess({result:result}))
    }else{
      yield put(fetchUploaderPostsFailure(result))
    }
  }catch(err){
    yield put(ServerSideError({serverError:500}))
  }
}


export function*  watchFetchPostData() {
  yield* takeLatest(types.UPLOADER_POSTS_REQUEST, fetchUploaderPostTask);
}


export default function* uploaderPostSaga() {
  yield [
    watchFetchPostData(),
  ];
}
