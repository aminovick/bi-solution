import * as Actions from '../actions';

const initialState = {
    data      : [],
    searchText: '',
    selectedUser:'',
  
};

const usersReducer = function (state = initialState, action) {
    switch ( action.type )
    {
        case Actions.GET_USERS:
        {
            return {
                ...state,
                data: action.payload
            };
        }
        case Actions.SET_USERS_SEARCH_TEXT:
        {
            return {
                ...state,
                searchText: action.searchText
            };

        }
        case Actions.SET_SELECTED_USER:
            {
                return {
                    ...state,
                    selectedUser: action.payload
                };
            }
    
        default:
        {
            return state;
        }
    }
};

export default usersReducer;
