import * as Actions from '../actions';

const initialState = {
    data      : [],
    searchText: ''
};

const profilesReducer = function (state = initialState, action) {
    switch ( action.type )
    {
        case Actions.GET_PROFILES:
        {
            return {
                ...state,
                data: action.payload
            };
        }
       
        case Actions.SET_PROFILES_SEARCH_TEXT:
        {
            return {
                ...state,
                searchText: action.searchText
            };
        }
        default:
        {
            return state;
        }
    }
};

export default profilesReducer;
