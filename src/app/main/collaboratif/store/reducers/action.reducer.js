import * as Actions from '../actions'
import _ from '@lodash';
const intialState = {
    entities: [],
    actionDialog: {
        type: 'new',
        props: {
            open: false
        },
        data: null
    },
    searchText: '',
    orderBy: '',
    orderDescending: false,
}

const ActionReducer = function (state = intialState, action) {
    switch (action.type) {
        case Actions.GET_ACTIONS:
            {
                return {
                    ...state,
                    entities: _.keyBy(action.payload, 'id'),
                    searchText: '',
                    routeParams: action.routeParams
                };
            }
        case Actions.UPDATE_ACTIONS:
            {
                return {
                    ...state,
                    entities: _.keyBy(action.payload, 'id')
                };
            }
          
        case Actions.OPEN_NEW_ACTION_DIALOG:
            {
                return {
                    ...state,
                    actionDialog: {
                        type: 'new',
                        props: {
                            open: true,
                        },
                        data: null
                    }
                }

            }
        case Actions.SET_SEARCH_TEXT:
            {
                return {
                    ...state,
                    searchText: action.searchText
                };
            }
        case Actions.CHANGE_ORDER:
            {
                return {
                    ...state,
                    orderBy: action.orderBy
                };
            }
        case Actions.TOGGLE_ORDER_DESCENDING:
            {
                return {
                    ...state,
                    orderDescending: !state.orderDescending
                };
            }
            case Actions.OPEN_EDIT_ACTION_DIALOG:
                {
                    return {
                        ...state,
                        actionDialog: {
                            type : 'edit',
                            props: {
                                open: true
                            },
                            data : action.data
                        }
                    };
                }
                case Actions.CLOSE_EDIT_ACTION_DIALOG:
        {
            return {
                ...state,
                actionDialog: {
                    type : 'edit',
                    props: {
                        open: false
                    },
                    data : null
                }
            };
        }
        case Actions.UPDATE_ACION:
            {
                const actions = action.payload;
    
                return {
                    ...state,
                    entities: {
                        ...state.entities,
                        [actions .id]: {...actions}
                    }
                };
            }
        case Actions.CLOSE_NEW_ACTION_DIALOG:
            {
                return {
                    ...state,
                    actionDialog: {
                        type : 'new',
                        props: {
                            open: false
                        },
                        data : null
                    }
                };
            }
        default:
            return state;
    }
}
export default ActionReducer