import { combineReducers } from 'redux';
import profilReducer from './profilReducer';
import filterReducer from './filterReducer';
import navigationReducer from './navigationReducer';
import sondageReducer from './sondageReducer';
import reductionReducer from './reductionReducer';
import cadeauReducer from './cadeauReducer';

const globalReducer = combineReducers({
  profilReducer: profilReducer,
  filterReducer: filterReducer,
  navigationReducer: navigationReducer,
  sondageReducer: sondageReducer,
  reductionReducer: reductionReducer,
  cadeauReducer: cadeauReducer,
});

export default globalReducer;