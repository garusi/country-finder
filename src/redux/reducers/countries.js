import * as type from '../types';


const initialState = {
    countries: [],
    loading: false,
    error: null
}

export default function countries(state = initialState, action) {
    switch (action.type) {
        case type.GET_COUNTRIES_REQUESTED:
            return {
                ...state,
                loading: true,
            }
        case type.GET_COUNTRIES_SUCCESS:
            return {
                ...state,
                loading: false,
                countries: action.countries
            }
        case type.GET_COUNTRIES_FAILED:
            return {
                ...state,
                loading: false,
                error: action.message
            }
        default:
            return state;
    }
}