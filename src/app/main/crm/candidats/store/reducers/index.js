import {combineReducers} from 'redux';
import candidats from './candidats.reducer';
import candidat from './candidat.reducer';

const reducer = combineReducers({
    candidats,
    candidat
});

export default reducer;
