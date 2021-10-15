import { all } from 'redux-saga/effects';
import countriesSaga from './countries';
import countrySaga from './country';


export default function* rootSaga() {
    yield all([
        countriesSaga(),
        countrySaga(),
    ])
}