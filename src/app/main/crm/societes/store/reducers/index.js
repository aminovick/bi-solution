import {combineReducers} from 'redux';
import societe from './societe.reducer';
import societes from './societes.reducer';

const reducer = combineReducers({
    societe,
    societes,
      
   });

export default reducer;
