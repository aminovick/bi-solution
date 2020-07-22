import axios from 'axios';
export const OPEN_NEW_ACTION_DIALOG = '[COLLABORATIF] OPEN NEW ACTION DIALOG';
export const SET_SEARCH_TEXT = '[COLLABORATIF] SET SEARCH TEXT';
export const CHANGE_ORDER = '[COLLABORATIF] CHANGE ORDER';
export const TOGGLE_ORDER_DESCENDING = '[COLLABORATIF] TOGGLE ORDER DESCENDING';
export const GET_ACTIONS = '[COLLABORATIF] GET ACTIONS';
export const UPDATE_ACTIONS = '[COLLABORATIF] UPDATE ACTIONS';
export const UPDATE_ACION ='[COLLABORATIF] UPDATE ACTION';
export const OPEN_EDIT_ACTION_DIALOG = '[COLLABORATIF] OPEN EDIT ACTION DIALOG';
export const ADD_ACTION = '[COLLABORATIF] ADD_ACTION';
export const CLOSE_EDIT_ACTION_DIALOG= '[COLLABORATIF] CLOSE EDIT ACTION DIALOG';
export const CLOSE_NEW_ACTION_DIALOG = '[COLLABORATIF] CLOSE NERW ACTION DIALOG'
export const REMOVE_ACTION = '[COLLABORATIF] REMOVE ACTION';
export const TOGGLE_COMPLETED = '[ACTION APP] TOGGLE COMPLETED';
export const TOGGLE_IMPORTANT = '[ACTION APP] TOGGLE IMPORTANT';
export const TOGGLE_STARRED = '[ACTION APP] TOGGLE STARRED';
export const SELECTED_TYPE='[ACTION APP] SELECTED TYPE';
export function getActions(params)
{
    const request = axios.get('/api/action-app/actions', {params});

    return (dispatch) =>
        request.then((response) =>
            dispatch({
                type       : GET_ACTIONS,
                routeParams: params,
                payload    : response.data
            })
        );
}
export function removeAction(actionId)
{
    const request = axios.post('/api/action-app/remove-action', actionId);

    return (dispatch) =>
        request.then((response) => (
                Promise.all([
                    dispatch({
                        type: REMOVE_ACTION
                    })
                ]).then(() => dispatch(updateActions()))
            )
        );
}
export function toggleImportant(action)
{
    const newAction = {
        ...action,
        important: !action.important
    };

    return (dispatch) => (
        Promise.all([
            dispatch({type: TOGGLE_IMPORTANT})
        ]).then(() => dispatch(updateAction(newAction)))
    )
}
export function updateActions()
{
    return (dispatch, getState) => {

        const {routeParams} = getState().actionApp.action;

        const request = axios.get('/api/action-app/actions', {
            params: routeParams
        });

        return request.then((response) =>
            dispatch({
                type   : UPDATE_ACTIONS,
                payload: response.data
            })
        );
    }
}
export function updateAction(action)
{
    const request = axios.post('/api/action-app/update-action', action);
console.log(request)
    return (dispatch) =>
        request.then((response) => {
                Promise.all([
                    dispatch({
                        type   : UPDATE_ACION,
                        payload: response.data
                    })
                ]).then(() => dispatch(updateActions()))
            }
        );
}
 
export function openNewActionDialog()
{
    return {
        type: OPEN_NEW_ACTION_DIALOG
    }
}
export function closeEditActionDialog()
{
    return {
        type: CLOSE_EDIT_ACTION_DIALOG
    }
}
export function setSearchText(event)
{
    return {
        type      : SET_SEARCH_TEXT,
        searchText: event.target.value.toLowerCase()
    }
}
export function changeOrder(orderBy)
{
    return {
        type: CHANGE_ORDER,
        orderBy
    }
}
export function toggleOrderDescending()
{
    return {
        type: TOGGLE_ORDER_DESCENDING
    }
}
export function openEditActionDialog(data)
{
    return {
        type: OPEN_EDIT_ACTION_DIALOG,
        data
    }
}
export function addAction(action)
{
    const request = axios.post('/api/action-app/new-action', action);

    return (dispatch) =>
        request.then((response) => (
                Promise.all([
                    dispatch({
                        type: ADD_ACTION
                    })
                ]).then(() => dispatch(updateActions()))
            )
        );
}
export function closeNewActionDialog()
{
    return {
        type: CLOSE_NEW_ACTION_DIALOG
    }
}
export function toggleCompleted(action)
{
    const newAction = {
        ...action,
        completed: !action.completed
    };
    return (dispatch) => (
        Promise.all([
            dispatch({type: TOGGLE_COMPLETED})
        ]).then(() => dispatch(updateAction(newAction)))
    )
}
export function toggleStarred(action)
{
    const newAction = {
        ...action,
        starred: !action.starred
    };
    return (dispatch) => (
        Promise.all([
            dispatch({type: TOGGLE_STARRED})
        ]).then(() => dispatch(updateAction(newAction)))
    )
}

