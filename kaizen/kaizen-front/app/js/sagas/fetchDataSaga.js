/**
 * Created by rendongliu on 16/2/2017.
 */
import { takeEvery,takeLatest } from 'redux-saga';
import { select, take, takem, call, put } from 'redux-saga/effects';
import types from '../actions/actionTypes'
import {ServerSideError,fetchUploaderDataSuccess,fetchUploaderDataFailure,
        searchUploaderDataSuccess,searchUploaderDataFailure,
        filterUploaderDataSuccess,filterUploaderDataFailure} from '../actions/dataActions'
import Api from './Api'


export function* fetchUploaderDataTask() {
    try {
        const {status,result} = yield call(Api.getUsermapData);
        if(status){
            yield put(fetchUploaderDataSuccess(result))
        }else{
            yield put(fetchUploaderDataFailure(result))
        }
    }catch(err){
        yield put(ServerSideError({serverError:500}))
    }
}

export function* searchUploaderDataTask(action) {
  try {
    const {status,result} = yield call(Api.searchUploaders, action.keyword);
    if(status){
      yield put(searchUploaderDataSuccess(result));
    }else{
      yield put(searchUploaderDataFailure(result));
    }
  }catch(err){
    yield put(ServerSideError({serverError:500}))
  }
}

export function* filterUploaderDataTask(action) {
  try {
    const {status,result} = yield call(Api.filterUploaders, action.filter);
    if(status){
      yield put(filterUploaderDataSuccess(result));
    }else{
      yield put(filterUploaderDataFailure(result));
    }
  }catch(err){
    yield put(ServerSideError({serverError:500}))
  }
}


export function*  watchFetchUploaderData() {
    yield* takeLatest(types.UPLOADER_FETCHDATA_REQUEST, fetchUploaderDataTask);
}

export function*  watchsearchUploaderData() {
  yield* takeLatest(types.UPLOADER_SEARCH_REQUEST, searchUploaderDataTask);
}

export function*  watchfilterUploaderData() {
  yield* takeLatest(types.UPLOADER_FILTER_REQUEST, filterUploaderDataTask);
}


export default function* fetchDataSaga() {
    yield [
        watchFetchUploaderData(),
        watchsearchUploaderData(),
        watchfilterUploaderData()
    ];
}