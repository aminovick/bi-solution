import * as Actions from '../actions';
import { ActionTimeline } from 'material-ui/svg-icons';
import { selectedPays } from '../actions';

const initialState = {
    data: null,
    secteurList: [],
    selectedSecteur: null,
    selectePrevenance: null,
    prevenanceList: [],
    selectedVille: null,
    villeList: [],
    selectedPays: null,
    paysList: [],
    selectedSocieteMere: null,
    selectedEtat:null,
    societeMereList: [],
    etatList: [],


};

const societeReducer = function (state = initialState, action) {
    switch (action.type) {
        case Actions.GET_SOCIETE:
            {
                return {
                    ...state,
                    data: action.payload,
                  
                    
                };
            }
        case Actions.REMOVE:
            {
                return {
                    ...state,
                    data: action.payload

                };
            }
        case Actions.SAVE_SOCIETE:
            {
                return {
                    ...state,
                    data: action.payload
                };
            }
        case Actions.GET_SECTEUR:
            {
                return {
                    ...state,
                    secteurList: action.payload
                };
            }

        case Actions.SET_SELECTED_SECTEUR:
            {
                return {
                    ...state,
                    selectedSecteur: action.payload,

                };
            }
        case Actions.GET_PROVENANCE:
            {
                return {
                    ...state,
                    prevenanceList: action.payload
                };
            }
        case Actions.SET_SELECTED_PROVENANCE:
            {
                return {
                    ...state,
                    selectePrevenance: action.payload
                };
            }
        case Actions.SET_SELECTED_VILLE:
            {
                return {
                    ...state,
                    selectedVille: action.payload
                };
            }
        case Actions.GET_VILLE:
            {
                return {
                    ...state,
                    villeList: action.payload
                }
            }
        case Actions.SET_SELECTED_PAYS:
            {
                return {
                    ...state,
                    selectedPays: action.payload,
                  
                }
            }
        case Actions.GET_PAYS:
            {
                return {
                    ...state,
                    paysList: action.payload
                }
            }
        case Actions.SET_SELECTED_SOCIETEMERE:
            {
                return {
                    ...state,
                    selectedSocieteMere: action.payload
                }
            }
        case Actions.GET_SOCIETEMERE:
            {
                return {
                    ...state,
                    societeMereList: action.payload
                }
            }
            case Actions.SET_SELECTED_ETAT:
                {
                    return {
                        ...state,
                        selectedEtat:action.payload
                    }
                }
                case Actions.GET_ETAT:
                        {
                            return {
                                ...state,
                                etatList: action.payload
                            };
                        }


        default:
            {
                return state;
            }
    }
};

export default societeReducer;
