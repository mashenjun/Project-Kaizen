import userAuthSaga from './userAuthSaga';
import fetchDataSaga from './fetchDataSaga'
export default function* rootSaga() {
    yield [
        fetchDataSaga(),
        userAuthSaga()
    ];
};