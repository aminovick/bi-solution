import * as Actions from '../actions';

const initialState = {
    data: null,
    permissions: [],
    modules: [],
    selectedModule: null,
    selectedPermissionsIds: []

};

const profileReducer = function (state = initialState, action) {
    switch (action.type) {
        case Actions.GET_PROFILE:
            {
                return {
                    ...state,
                    data: action.payload,
                    selectedPermissionsIds:action.payload.authorities,
                };
            }
        case Actions.SAVE_PROFILE:
            {
                return {
                    ...state,
                    data: action.payload
                };
            }
        case Actions.GET_AUTHORITIES:
            {
                return {
                    ...state,
                    permissions: action.payload
                };
            }
        case Actions.GET_MODULES:
            {
                return {
                    ...state,
                    modules: action.payload
                };
            }
        case Actions.SET_SELECTED_MODULE:
            {
                return {
                    ...state,
                    selectedModule: action.payload
                };
            }
        case Actions.TOGGLE_IN_SELECTED_PERMISSION:
            {

                const permissionId = action.permissionId;

                let selectedPermissionsIds = [...state.selectedPermissionsIds];

                if (selectedPermissionsIds.find(id => id === permissionId) !== undefined) {
                    selectedPermissionsIds = selectedPermissionsIds.filter(id => id !== permissionId);
                }
                else {
                    selectedPermissionsIds = [...selectedPermissionsIds, permissionId];
                }

                return {
                    ...state,
                    selectedPermissionsIds: selectedPermissionsIds
                };
            }
            case Actions.SELECT_ALL_PERMISSIONS:
                {
                    const arr = Object.keys(state.permissions).map(k => state.permissions[k]);
        
                    const selectedPermissionsIds = arr.map(permission => permission.id);
        
                    return {
                        ...state,
                        selectedPermissionsIds: selectedPermissionsIds
                    };
                }
                case Actions.DESELECT_ALL_PERMISSIONS:
                {
                    return {
                        ...state,
                        selectedPermissionsIds: []
                    };
                }
        default:
            {
                return state;
            }
    }
};

export default profileReducer;
