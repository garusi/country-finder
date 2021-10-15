import * as type from '../types';


const initialState = {
    selectedCountry: '',
    countryDetails: [],
    loading: false,
    error: null
}

export default function country(state = initialState, action) {
    switch (action.type) {
        case type.SET_COUNTRY:
            return {
                ...state,
                selectedCountry: action.payload,
                loading: true,
            }
        case type.CLEAR_COUNTRY:
            return {
                ...state,
                selectedCountry: '',
                loading: false,
            }
        case type.GET_COUNTRY_REQUESTED:
            return {
                ...state,
                loading: true,
            }
        case type.GET_COUNTRY_SUCCESS:
            return {
                ...state,
                loading: false,
                countryDetails: action.country
            }
        case type.GET_COUNTRY_FAILED:
            return {
                ...state,
                loading: false,
                error: action.message
            }
        default:
            return state;
    }
}