import { combineReducers } from 'redux';
import { items } from './items';
import { err } from './err';

export default combineReducers({
    items, err
});
