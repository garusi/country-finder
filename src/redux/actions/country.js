import * as type from '../types';


export function setCountry(country) {
    return {
        type: type.SET_COUNTRY,
        payload: country
    }
}

export function clearCountry(country) {
    return {
        type: type.CLEAR_COUNTRY,
        payload: country
    }
}


