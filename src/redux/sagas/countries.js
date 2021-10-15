import { call, put, takeEvery } from 'redux-saga/effects';


// Fetch Countries API
function getCountriesApi(apiUrl) {
    return fetch(apiUrl, {
        method: 'GET',
        headers: {
            'Content-Type': 'applicationn/json'
        }
    })
        .then(response => {
            return response.json()
        })
        .catch((error) => {
            throw error
        })
}

// Change to next letter every 15 seconds
// Alphabetical Order, start:A(0) end:Z(25)
var currentLetter = 0
const alphabet = "abcdefghijklmnopqrstuvwxyz".split("");
function alphabeticalOrder(currentLetter) {
    setInterval(() => {
        if (currentLetter <= 25) {
            currentLetter++
        } else {
            currentLetter = 0;
        }
    }, 15000);
    return currentLetter;
}

// Create filtered countries list
const filteredCountries = [
    {
        'name': ''
    }];
function validateCountries(countries) {
    for (let i = 0; i < countries.length; i++) {
        // Check if item start with the current letter in the alphabetical order (a-z)
        if (countries[i].name.toLowerCase().startsWith(alphabet[currentLetter])) {
            // Check if the data already exist in the state
            if (!filteredCountries.some(country => country.name === countries[i].name)) {
                filteredCountries.push({ 'name': countries[i].name });
            }
        } else {
            alphabeticalOrder(currentLetter)
        }
    }
    alphabeticalOrder(currentLetter++);
    return filteredCountries;
}

function* fetchCountries() {
    try {
        // GET Countries names list
        const apiUrl = 'https://restcountries.com/v2/all?fields=name';
        const countries = yield call(getCountriesApi, apiUrl);
        // Validate Countries list
        const filteredCountries = validateCountries(countries).slice(1);
        // Success
        yield put({ type: 'GET_COUNTRIES_SUCCESS', countries: filteredCountries });
    } catch (e) {
        // Errorr
        yield put({ type: 'GET_COUNTRIES_FAILED', message: e.message });
    }
}

function* countriesSaga() {
    yield takeEvery('GET_COUNTRIES_REQUESTED', fetchCountries);
}


export default countriesSaga;