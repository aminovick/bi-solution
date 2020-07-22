import {combineReducers} from 'redux';
import users from './users.reducer';
import user from './user.reducer';
import  profiles from './profiles.reducer'

const reducer = combineReducers({
    users,
    user,
    profiles
});

export default reducer;
