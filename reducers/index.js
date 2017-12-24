import { combineReducers } from 'redux';
import profilReducer from './profilReducer';
import filterReducer from './filterReducer';


const globalReducer = combineReducers({
  profilReducer: profilReducer,
  filterReducer: filterReducer,
});

export default globalReducer;