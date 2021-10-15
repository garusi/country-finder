import * as type from '../types';


export function getCountries(countries) {
    return {
        type: type.GET_COUNTRIES_REQUESTED,
        payload: countries
    }
}

