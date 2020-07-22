import {combineReducers} from 'redux';
import profiles from './profiles.reducer';
import profile from './profile.reducer';

const reducer = combineReducers({
    profiles,
    profile
});

export default reducer;
