import * as Actions from '../actions';

const initialState = {
    list: [],
    data: [],
    searchText: '',
    contactDialog: {
        type: 'new',
        props: {
            open: false
        },
        data: null
    }
};


const societesReducer = function (state = initialState, action) {
    switch (action.type) {
        case Actions.SET_SOCIETES_SEARCH_TEXT:
            {
                return {
                    ...state,
                    searchText: action.searchText
                };
            }
        case Actions.GET_SOCIETES:
            {
                return {
                    ...state,
                    data: action.payload
                };
            }
        case Actions.OPEN_NEW_CONTACT_DIALOG:
            {
                return {
                    ...state,
                    contactDialog: {
                        type: 'new',
                        props: {
                            open: true
                        },
                        data: null
                    }
                };
            }
        case Actions.CLOSE_EDIT_CONTACT_DIALOG:
            {
                return {
                    ...state,
                    contactDialog: {
                        type: 'edit',
                        props: {
                            open: false
                        },
                        data: null
                    }
                };
            }
        case Actions.CLOSE_NEW_CONTACT_DIALOG:
            {
                return {
                    ...state,
                    contactDialog: {
                        type: 'new',
                        props: {
                            open: false
                        },
                        data: null
                    }
                };
            }
        case Actions.GET_CONTACTS:
            {
                return {
                    ...state,
                    list: action.payload,
                    routeParams: action.routeParams
                };
            }
        case Actions.OPEN_EDIT_CONTACT_DIALOG:
            {
                return {
                    ...state,
                    contactDialog: {
                        type: 'edit',
                        props: {
                            open: true
                        },
                        data: action.data
                    }
                };
            }
        default:
            {
                return state;
            }
    }
};

export default societesReducer;