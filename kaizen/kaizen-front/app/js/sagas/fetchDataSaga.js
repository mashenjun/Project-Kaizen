/**
 * Created by rendongliu on 16/2/2017.
 */
import { takeEvery,takeLatest } from 'redux-saga';
import { select, take, takem, call, put } from 'redux-saga/effects';
import types from '../actions/actionTypes'
import {ServerSideError,fetchUploaderDataSuccess,fetchUploaderDataFailure} from '../actions/dataActions'
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


export function*  watchFetchUploaderData() {
    yield* takeLatest(types.UPLOADER_FETCHDATA_REQUEST, fetchUploaderDataTask);
}


export default function* fetchDataSaga() {
    yield [
        watchFetchUploaderData(),
    ];
}