import { combineReducers } from 'redux';
import auThentication from '../reducers/authentication';
import CurrentChannel from '../reducers/CurrentCannel'
export default combineReducers ({
   
    CurrentChannel,
    auThentication
});