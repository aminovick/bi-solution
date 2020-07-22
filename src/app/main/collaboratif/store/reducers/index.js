import {combineReducers} from 'redux';
import action from './action.reducer';
import labels from './labels.reducer';
import filters from './filters.reducer';
import folders from './folders.reducer';
import users from '../../../administration/store/reducers/users.reducer'

const reducer  =combineReducers({
    action,
    labels,
    filters,
    folders,
    users
}) 
export default reducer