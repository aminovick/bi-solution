import axios from 'axios';

export const GET_REFERENTIELS= '[REFERENTIELSAPP] GET REFERENTIELS';

export const OPEN_NEW_REFERENTIEL_DIALOG = '[REFERENTIELSAPP] OPEN NEW REFERENTIEL DIALOG';
export const CLOSE_NEW_REFERENTIEL_DIALOG = '[REFERENTIELSAPP] CLOSE NEW REFERENTIEL DIALOG';
export const OPEN_EDIT_REFERENTIEL_DIALOG = '[REFERENTIELSAPP] OPEN EDIT REFERENTIEL DIALOG';
export const CLOSE_EDIT_REFERENTIEL_DIALOG = '[REFERENTIELSAPP] CLOSE EDIT REFERENTIEL DIALOG';
export const ADD_REFERENTIEL = '[REFERENTIELSAPP] ADD REFERENTIEL';
export const UPDATE_REFERENTIEL = '[REFERENTIELSAPP] UPDATE REFERENTIEL';
export const REMOVE_REFERENTIEL = '[REFERENTIELSAPP] REMOVE REFERENTIEL';


export const SELECT_REFERENTIELS_COLUMN = '[REFERENTIELSAPP] SELECT COLUMN';
export const GET_ENTITIES = '[REFERENTIELSAPP] GET ENTITIES';
export const SELECTED_REFERENTIELS_ENTITE = '[REFERENTIELSAPP] SELECTED ENTITY';
export const GET_COLUMNS = '[REFERENTIELSAPP] GET COLUMNS';


export function openNewReferentielDialog()
{


    return {
        type: OPEN_NEW_REFERENTIEL_DIALOG
    }
}

export function closeNewReferentielDialog()
{
    return {
        type: CLOSE_NEW_REFERENTIEL_DIALOG
    }
}

export function openEditReferentielDialog(data)
{
    return {
        type: OPEN_EDIT_REFERENTIEL_DIALOG,
        data
    }
}

export function closeEditReferentielDialog()
{
    return {
        type: CLOSE_EDIT_REFERENTIEL_DIALOG
    }
}

export function selectColumn(columnId)
{
    return (dispatch, getState) =>  {
        const {routeParams} = getState().referentielsApp.referentiels;
        Promise.all([
            dispatch({
                type: SELECT_REFERENTIELS_COLUMN,
                columnId
            }),
        ])

    }
}


export function addReferentiel(newReferentiel)
{
    return (dispatch, getState) => {

        const {routeParams} = getState().referentielsApp.referentiels;

        const request = axios.post('/api/administation/referentiels/save', {
            newReferentiel
        });

        return request.then((response) =>
            Promise.all([
                dispatch({
                    type: ADD_REFERENTIEL
                })
            ]).then(() => dispatch(getReferentiels(routeParams)))
        );
    };
}

export function updateReferentiel(referentiel)
{
    return (dispatch, getState) => {

        const {routeParams} = getState().referentielsApp.referentiels;

        const request = axios.post('/api/administation/referentiels/update', {
            referentiel
        });

        return request.then((response) =>
            Promise.all([
                dispatch({
                    type: UPDATE_REFERENTIEL
                })
            ]).then(() => dispatch(getReferentiels(routeParams)))
        );
    };
}

export function removeReferentiel(referentielId)
{
    return (dispatch, getState) => {

        const {routeParams} = getState().referentielsApp.referentiels;

        const request = axios.delete('/api/administation/referentiels/remove', {  params: referentielId});

        return request.then((response) =>
            Promise.all([
                dispatch({
                    type: REMOVE_REFERENTIEL
                })
            ]).then(() => dispatch(getReferentiels(routeParams)))
        );
    };
}



export function getReferentiels(routeParams)
{
    const request = axios.get('/api/administation/referentiels', {
        params: routeParams
    });


    return (dispatch) =>
        request.then((response) =>
            dispatch({
                type   : GET_REFERENTIELS,
                payload: response.data,
                routeParams
            })
        );
}


export function getEntities(routeParams)
{
    const request = axios.get('/api/administation/referentiels/entities/all');

    return (dispatch) =>
        request.then((response) =>
            dispatch({
                type   : GET_ENTITIES,
                payload: response.data,
                routeParams
            })
        );
}

export function selectEntiteValue(entityId)
{
    return (dispatch, getState) =>  {
        const {routeParams} = getState().referentielsApp.referentiels;
        Promise.all([
            dispatch({
                type: SELECTED_REFERENTIELS_ENTITE,
            entityId
            }),
        ]).then(() => dispatch(getColumnsByEntityId(entityId)))

    }
}

export function getColumnsByEntityId(entityId)
{
    return (dispatch, getState) => {
        const {routeParams} = getState().referentielsApp.referentiels;
        const request = axios.get('/api/administation/referentiels/columns/byEntity', {
            params: {
                'entityId': entityId
              }
            
        });
        return request.then((response) =>
            Promise.all([
                dispatch({
                    type: GET_COLUMNS,
                    payload: response.data,
                }),
            ])
            //.then(() => dispatch(getReferentiels(routeParams)))
        );
    };
}
