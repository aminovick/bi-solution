import * as Actions from '../actions';
import _ from '@lodash';

const initialState = {
    entities          : null,
    searchText        : '',
    selectedCandidatsIds: [],
    routeParams       : {},
};

const candidatsReducer = function (state = initialState, action) {
    switch ( action.type )
    {
        case Actions.GET_CANDIDATS:
        {
            return {
                ...state,
                entities   : _.keyBy(action.payload, 'id'),
                routeParams: action.routeParams
            };
        }
        case Actions.SET_SEARCH_TEXT:
        {
            return {
                ...state,
                searchText: action.searchText
            };
        }
        case Actions.TOGGLE_IN_SELECTED_CANDIDATS:
        {

            const candidatId = action.candidatId;

            let selectedCandidatIds = [...state.selectedCandidatIds];

            if ( selectedCandidatIds.find(id => id === candidatId) !== undefined )
            {
                selectedCandidatIds = selectedCandidatIds.filter(id => id !== candidatId);
            }
            else
            {
                selectedCandidatIds = [...selectedCandidatIds, candidatId];
            }

            return {
                ...state,
                selectedCandidatIds: selectedCandidatIds
            };
        }
        case Actions.SELECT_ALL_CANDIDATS:
        {
            const arr = Object.keys(state.entities).map(k => state.entities[k]);

            const selectedCandidatIds = arr.map(candidat => candidat.id);

            return {
                ...state,
                selectedCandidatIds: selectedCandidatIds
            };
        }
        case Actions.DESELECT_ALL_CANDIDATS:
        {
            return {
                ...state,
                selectedCandidatIds: []
            };
        }
        default:
        {
            return state;
        }
    }
};

export default candidatsReducer;
