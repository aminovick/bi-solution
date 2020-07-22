import axios from 'axios';
import {FuseUtils} from '@fuse';
import {showMessage} from 'app/store/actions/fuse';

export const GET_PROFILE = '[ADMINISTRATION] GET PROFILE';
export const GET_AUTHORITIES = '[ADMINISTRATION] GET AUTHORITIES';
export const GET_MODULES = '[ADMINISTRATION] GET MODULES';
export const SAVE_PROFILE = '[ADMINISTRATION] SAVE PROFILE';
export const SET_SELECTED_MODULE = '[ADMINISTRATION] SET SELECTED_MODULE';
export const TOGGLE_IN_SELECTED_PERMISSION = '[ADMINISTRATION] TOGGLE IN_SELECTED_TOGGLE_IN_SELECTED_PERMISSION';
export const SELECT_ALL_PERMISSIONS='[ADMINISTRATION] SELECT ALL  PERMISSION'
export const DESELECT_ALL_PERMISSIONS='[ADMINISTRATION] DESELECT ALL  PERMISSION'

export function getProfile(params)
{
    const request = axios.get('/api/administration/profile/', {params});
console.log(request)
    return (dispatch) =>
        request.then((response) =>
            dispatch({
                type   : GET_PROFILE,
                payload: response.data
            })
        );
}

export function saveProfile(data , selectedPermissionsIds)
{
    data.authorities=selectedPermissionsIds;
    const request = axios.post('/api/administration/profile/save', data);

    return (dispatch) =>
        request.then((response) => {

                dispatch(showMessage({message: 'Profile Saved'}));

                return dispatch({
                    type   : SAVE_PROFILE,
                    payload: response.data
                })
            }
        );
}

export function newProfile()
{
    const data = {
        id              : FuseUtils.generateGUID(),
        name            : '',
        description     : '',
        authorities:[]
    };

    return {
        type   : GET_PROFILE,
        payload: data
    }
}

export function getPermissions()
{
    const request = axios.get('/api/administration/authorities');

    return (dispatch) =>
        request.then((response) =>
            dispatch({
                type   : GET_AUTHORITIES,
                payload: response.data
            })
            
        );
}
export function getModules()
{
    const request = axios.get('/api/administration/modules');

    return (dispatch) =>
        request.then((response) =>
            dispatch({
                type   : GET_MODULES,
                payload: response.data
            })
            
        );
}
export function selectAllPermissions(event){
    
        return {
            type: SELECT_ALL_PERMISSIONS
        }
  
}
export function deSelectAllPermissions(event){
    return {
        type: DESELECT_ALL_PERMISSIONS
    }
}
export function toggleInSelectedPermissions(permissionId){
    return {
        type: TOGGLE_IN_SELECTED_PERMISSION,
        permissionId
    }
}

export function selectModule(value)
{
    return {
        type      : SET_SELECTED_MODULE,
        payload: value
    }
}
