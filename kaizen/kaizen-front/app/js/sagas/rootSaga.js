import userAuthSaga from './userAuthSaga';
import fetchDataSaga from './fetchDataSaga'
import userActionSaga from './userActionSaga'
export default function* rootSaga() {
  yield [
    fetchDataSaga(),
    userAuthSaga(),
    userActionSaga(),
  ];
};