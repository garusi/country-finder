import { call, put, takeEvery, select } from 'redux-saga/effects';
import { getSelectedCountry } from './selectors';


// GET Country data from API
function getCountryApi(apiUrl) {
    return fetch(apiUrl, {
        method: 'GET',
        headers: { 'Content-Type': 'applicationn/json' }
    })
        .then(response => { return response.json() })
        .catch((error) => { throw error })
}

function* fetchCountry() {
    try {
        // SET Country to fetch
        const selectedCountry = yield select(getSelectedCountry);
        // GET Country details
        const apiUrl = `https://restcountries.com/v2/name/${selectedCountry}`;
        const country = yield call(getCountryApi, apiUrl);
        // Success
        yield put({ type: 'GET_COUNTRY_SUCCESS', country: country });
    } catch (e) {
        // Errorr
        yield put({ type: 'GET_COUNTRY_FAILED', message: e.message });
    }
}

function* countrySaga() {
    yield takeEvery('SET_COUNTRY', fetchCountry);
}


export default countrySaga;