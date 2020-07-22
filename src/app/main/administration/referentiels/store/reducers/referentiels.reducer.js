import * as Actions from '../actions';
import _ from '@lodash';

const initialState = {
    list          : [],
    entitiesList      : [],
    selectedEntityId    : null,
    columnsList      :[],
    selectedColumnId :null,
    selectedReferentielIds: [],
    routeParams       : {},
    referentielDialog     : {
        type : 'new',
        props: {
            open: false
        },
        data : null
    }
};

const referentielsReducer = function (state = initialState, action) {
    switch ( action.type )
    {
        case Actions.OPEN_NEW_REFERENTIEL_DIALOG:
        {
            return {
                ...state,
                referentielDialog: {
                    type : 'new',
                    props: {
                        open: true
                    },
                    data : null
                }
            };
        }
        case Actions.CLOSE_NEW_REFERENTIEL_DIALOG:
        {
            return {
                ...state,
                referentielDialog: {
                    type : 'new',
                    props: {
                        open: false
                    },
                    data : null
                }
            };
        }
        case Actions.OPEN_EDIT_REFERENTIEL_DIALOG:
        {
            return {
                ...state,
                referentielDialog: {
                    type : 'edit',
                    props: {
                        open: true
                    },
                    data : action.data
                }
            };
        }
        case Actions.CLOSE_EDIT_REFERENTIEL_DIALOG:
        {
            return {
                ...state,
                referentielDialog: {
                    type : 'edit',
                    props: {
                        open: false
                    },
                    data : null
                }
            };
        }
        case Actions.GET_ENTITIES:
        {
                return {
                    ...state,
                    entitiesList   : action.payload
                };
        }           
        case Actions.GET_REFERENTIELS:
                {
                    return {
                        ...state,
                        list   : action.payload,
                        routeParams: action.routeParams
                    };
        }
        case Actions.GET_COLUMNS:
                {
                    return {
                        ...state,
                        columnsList   : action.payload
                    };
        }
        case Actions.SELECTED_REFERENTIELS_ENTITE:
        {
           return {
                ...state,
                selectedEntityId: action.entityId
            };
        }
        case Actions.SELECT_REFERENTIELS_COLUMN:
            {
               return {
                    ...state,
                    selectedColumnId: action.columnId
                };
            }
        default:
        {
            return state;
        }
    }
};

export default referentielsReducer;
