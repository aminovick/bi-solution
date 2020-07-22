import * as Actions from '../actions';

const initialState = {
     data: null,
     situationFList :[],
     selectedSituationF :null,
     nationaliteList :[],
     selectedNationalite :null,
     mobiliteList :[],
     selectedMobilite :null,

     disponibiliteList :[],
     selectedDisponibilite :null,
    
     provenanceList :[],
     selectedProvenance :null,
    
     responsableList :[],
     selectedResponsable :null,
    
     paysList :[],
     selectedPays :null,
    
     villeList :[],
     selectedVille :null,
    
     diplomeList :[],
     selectedDiplomes :null,

     experienceList :[],
     selectedExperience :null,
    
     languesList :[],
     selectedLangues :null,
    
     outilsList :[],
     selectedOutils :null,
    
    
     domaineList :[],
     selectedDomaines :null,

     niveauFormationList:[],
     contratsList:[],
     selectedContrats:null,
     selectedContratsSouhaite:null,
     selectedNivFormation:null

};

const candidatReducer = function (state = initialState, action) {
    switch (action.type) {
        case Actions.GET_CANDIDAT:
            {
                return {
                    ...state,
                    data: action.payload
                };
            }
        case Actions.SAVE_CANDIDAT:
            {
                return {
                    ...state,
                    data: action.payload
                };
            }
        case Actions.GET_SITUATION_FAMILLIALE:
            {
                return {
                    ...state,
                    situationFList: action.payload
                };
            }
        case Actions.GET_NATIONALITIE:
            {
                return {
                    ...state,
                    nationaliteList: action.payload
                };
            }
        case Actions.GET_MOBILITE:
            {
                return {
                    ...state,
                    mobiliteList: action.payload
                };
            }
            case Actions.GET_DISPONIBILITE:
                    {
                        return {
                            ...state,
                            disponibiliteList: action.payload
                        };
                    }
             case Actions.GET_PROVENANCE:
                     {
                       return {
                            ...state,
                         provenanceList: action.payload
                                };
                            }
             
                case Actions.GET_RESPONSABLE:
                {
                return {
                    ...state,
                    responsableList: action.payload
                    };
                }
                case Actions.GET_PAYS:
                {
                return {
                    ...state,
                    paysList: action.payload
                    };
                }
                case Actions.GET_VILLE:
                {
                return {
                    ...state,
                    villeList: action.payload
                    };
                }
                case Actions.GET_DIPLOME:
                {
                return {
                    ...state,
                    diplomeList: action.payload
                    };
                }
                case Actions.GET_LANGUES:
                {
                return {
                    ...state,
                    languesList: action.payload
                    };
                }
                case Actions.GET_OUTILS:
                {
                    return {
                    ...state,
                    outilsList: action.payload
                    };
                }
                case Actions.GET_EXPERIENCE:
                {
                return {
                    ...state,
                    experienceList: action.payload
                    };
                }
                case Actions.GET_DOMAINES:
                {
                return {
                    ...state,
                    domaineList: action.payload
                    };
                }
                case Actions.GET_CONTRATS:
                {
                return {
                    ...state,
                    contratsList: action.payload
                    };
                }
                case Actions.GET_NIVFORMATION:
                {
                return {
                    ...state,
                    niveauFormationList: action.payload
                    };
                }

                case Actions.SET_SITUATION_FAMILLIALE:
                        {
                        return {
                            ...state,
                            selectedSituationF: action.payload
                            };
                        }
                case Actions.SET_NATIONALITE:
                        {
                        return {
                            ...state,
                            selectedNationalite: action.payload
                            };
                        }
                case Actions.SET_MOBILITE:
                        {
                        return {
                            ...state,
                            selectedMobilite: action.payload
                            };
                        }
                        case Actions.SET_DISPONIBILITE:
                        {
                            return {
                            ...state,
                            selectedDisponibilite: action.payload
                            };
                        }      
                        case Actions.SET_PROVENANCE:
                        {
                            return {
                            ...state,
                            selectedProvenance: action.payload
                            };
                        }     
                            case Actions.SET_RESPONSABLE:
                            {
                            return {
                            ...state,
                            selectedResponsable: action.payload
                            };
                        } 
                                              
                        case Actions.SET_PAYS:
                        {
                            return {
                            ...state,
                            selectedPays: action.payload
                            };
                        }     
                        case Actions.SET_VILLE:
                        {
                            return {
                            ...state,
                            selectedVille: action.payload
                            };
                        }     
                        case Actions.SET_DIPLOMES:
                        {
                            return {
                            ...state,
                            selectedDiplomes: action.payload
                            };
                        }     

                        case Actions.SET_DOMAINES:
                        {
                            return {
                            ...state,
                            selectedDomaines: action.payload
                            };
                        }     
                        case Actions.SET_EXPERIENCE:
                        {
                            return {
                            ...state,
                            selectedExperience: action.payload
                            };
                        }   
                        case Actions.SET_LANGUES:
                        {
                            return {
                            ...state,
                            selectedLangues: action.payload
                            };
                        }     
                        case Actions.SET_OUTILS:
                        {
                            return {
                            ...state,
                            selectedOutils: action.payload
                            };
                        }     
                        case Actions.SET_DOMAINES:
                        {
                            return {
                            ...state,
                            selectedDomaines: action.payload
                            };
                        }  
                        case Actions.SET_CONTRATS:
                        {
                            return {
                            ...state,
                            selectedContrats: action.payload
                            };
                        }   
                        case Actions.SET_CONTRATS_CIBLE:
                        {
                            return {
                            ...state,
                            selectedContratsSouhaite: action.payload
                            };
                        }   
                        case Actions.SET_NIVFORMATION:
                            {
                                return {
                                ...state,
                                selectedNivFormation: action.payload
                                };
                            }  

        default:
            {
                return state;
            }
    }
};

export default candidatReducer;
