import { combineReducers } from 'redux';
import profilReducer from './profilReducer';


const globalReducer = combineReducers({
  profilReducer: profilReducer,

});

export default globalReducer;