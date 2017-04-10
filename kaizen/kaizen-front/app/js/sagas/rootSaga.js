import userAuthSaga from './userAuthSaga';
import fetchDataSaga from './fetchDataSaga';
import userActionSaga from './userActionSaga';
import uploaderPostSaga from './uploaderPostSaga';
import postSaga from './postSaga'
export default function* rootSaga() {
  yield [
    fetchDataSaga(),
    userAuthSaga(),
    userActionSaga(),
    uploaderPostSaga(),
    postSaga()
  ];
};