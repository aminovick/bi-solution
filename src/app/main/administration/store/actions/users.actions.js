import axios from 'axios';
import API_URLS from '../../../shared/api';
export const GET_USERS = '[ADMINISTRATION] GET USERS';
export const SET_USERS_SEARCH_TEXT = '[ADMINISTRATION] SET USERS SEARCH TEXT';
export const REMOVE ='[ADMINISTRATION] REMOVE USER';
export const SET_SELECTED_USER='[ADMINISTRATION] SET SELECTED USER';
export function getUsers()
{
    
    const request = axios.get(API_URLS.url_get_allUsers);
  
    return (dispatch) =>
        request.then((response) =>
            dispatch({
                type   : GET_USERS,
                payload: response.data,
                
            })
        );
}

export function setUsersSearchText(event)
{
    return {
        type      : SET_USERS_SEARCH_TEXT,
        searchText: event.target.value
    }
}

export function remove(id)
{
    return (dispatch, getState) => {

        const {routeParams} = getState().administrationApp.user;

        const request = axios.delete(API_URLS.url_delete_user+ id);

        return request.then((response) =>
            Promise.all([
                dispatch({
                    type: REMOVE
                })
            ]).then(() => dispatch(getUsers(routeParams)))
        );
    };
}
export function selectUser(value)
{
    return {
        type      : SET_SELECTED_USER,
        payload: value
    }
}
