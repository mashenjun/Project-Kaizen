import userAuthSaga from './userAuthSaga';

export default function* rootSaga() {
    yield [
        userAuthSaga()
    ];
};