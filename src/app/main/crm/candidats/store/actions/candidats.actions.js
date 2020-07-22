import axios from 'axios';
export const GET_CANDIDATS = '[CANDIDATS APP] GET CANDIDATS';
export const SET_SEARCH_TEXT = '[CANDIDATS APP] SET SEARCH TEXT';
export const TOGGLE_IN_SELECTED_CANDIDATS = '[CANDIDATS APP] TOGGLE IN SELECTED CANDIDATS';
export const SELECT_ALL_CANDIDATS = '[CANDIDATS APP] SELECT ALL CANDIDATS';
export const DESELECT_ALL_CANDIDATS = '[CANDIDATS APP] DESELECT ALL CANDIDATS';
export const OPEN_NEW_CANDIDAT_DIALOG = '[CANDIDATS APP] OPEN NEW CANDIDAT DIALOG';
export const CLOSE_NEW_CANDIDAT_DIALOG = '[CANDIDATS APP] CLOSE NEW CANDIDAT DIALOG';
export const OPEN_EDIT_CANDIDAT_DIALOG = '[CANDIDATS APP] OPEN EDIT CANDIDAT DIALOG';
export const CLOSE_EDIT_CANDIDAT_DIALOG = '[CANDIDATS APP] CLOSE EDIT CANDIDAT DIALOG';
export const ADD_CANDIDAT = '[CANDIDATS APP] ADD CANDIDAT';
export const UPDATE_CANDIDAT = '[CANDIDATS APP] UPDATE CANDIDAT';
export const REMOVE_CANDIDAT = '[CANDIDATS APP] REMOVE CANDIDAT';
export const REMOVE_CANDIDATS = '[CANDIDATS APP] REMOVE CANDIDATS';
export const TOGGLE_STARRED_CANDIDAT = '[CANDIDATS APP] TOGGLE STARRED CANDIDAT';
export const TOGGLE_STARRED_CANDIDATS = '[CANDIDATS APP] TOGGLE STARRED CANDIDATS';
export const SET_CANDIDATS_STARRED = '[CANDIDATS APP] SET CANDIDATS STARRED ';

export function getCandidats(routeParams)
{
    const request = axios.get('/api/crm/candidats', {
        params: routeParams
    });

    return (dispatch) =>
        request.then((response) =>
            dispatch({
                type   : GET_CANDIDATS,
                payload: response.data,
                routeParams
            })
        );
}

export function setSearchText(event)
{
    return {
        type      : SET_SEARCH_TEXT,
        searchText: event.target.value
    }
}

export function toggleInSelectedCandidats(condidatId)
{
    return {
        type: TOGGLE_IN_SELECTED_CANDIDATS,
        condidatId
    }
}

export function selectAllCandidats()
{
    return {
        type: SELECT_ALL_CANDIDATS
    }
}

export function deSelectAllCandidats()
{
    return {
        type: DESELECT_ALL_CANDIDATS
    }
}


export function addCandidat(newCandidat)
{
    return (dispatch, getState) => {

        const {routeParams} = getState().condidatsApp.condidats;

        const request = axios.post('/api/crm/add-condidat', {
            newCandidat
        });

        return request.then((response) =>
            Promise.all([
                dispatch({
                    type: ADD_CANDIDAT
                })
            ]).then(() => dispatch(getCandidats(routeParams)))
        );
    };
}

export function updateCandidat(condidat)
{
    return (dispatch, getState) => {

        const {routeParams} = getState().condidatsApp.condidats;

        const request = axios.post('/api/crm/update-condidat', {
            condidat
        });

        return request.then((response) =>
            Promise.all([
                dispatch({
                    type: UPDATE_CANDIDAT
                })
            ]).then(() => dispatch(getCandidats(routeParams)))
        );
    };
}

export function removeCandidat(condidatId)
{
    return (dispatch, getState) => {

        const {routeParams} = getState().condidatsApp.condidats;

        const request = axios.post('/api/crm/remove-condidat', {
            condidatId
        });

        return request.then((response) =>
            Promise.all([
                dispatch({
                    type: REMOVE_CANDIDAT
                })
            ]).then(() => dispatch(getCandidats(routeParams)))
        );
    };
}

