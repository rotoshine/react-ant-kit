import {combineReducers} from 'redux';
import currentUser from './currentUser';
import appState from "./appState";

export default combineReducers({
  appState,
  currentUser
});