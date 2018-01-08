import { combineReducers } from 'redux';
import profilReducer from './profilReducer';
import filterReducer from './filterReducer';
import navigationReducer from './navigationReducer';
import sondageReducer from './sondageReducer';


const globalReducer = combineReducers({
  profilReducer: profilReducer,
  filterReducer: filterReducer,
  navigationReducer: navigationReducer,
  sondageReducer: sondageReducer,
});

export default globalReducer;