import { combineReducers } from 'redux';
import countries from './countries';
import country from './country';


const rootReducer = combineReducers({
    countries,
    country,
});


export default rootReducer;