import axios from 'axios';

export const GET_PROFILES = '[ADMINISTRATION] GET PROFILES';
export const SET_PROFILES_SEARCH_TEXT = '[ADMINISTRATION] SET PROFILES SEARCH TEXT';
export const REMOVE ='[ADMINISTRATION] REMOVE PROFILE'
export function getProfiles()
{
    const request = axios.get('/api/administration/profiles');

    return (dispatch) =>
        request.then((response) =>
            dispatch({
                type   : GET_PROFILES,
                payload: response.data
            })
            
        );
}

export function setProfilesSearchText(event)
{
    return {
        type      : SET_PROFILES_SEARCH_TEXT,
        searchText: event.target.value
    }
}


export function remove(id)
{
    return (dispatch, getState) => {

        const {routeParams} = getState().profileApp.profiles;

        const request = axios.delete('/api/administation/profiles/remove', {  params: id});

        return request.then((response) =>
            Promise.all([
                dispatch({
                    type: REMOVE
                })
            ]).then(() => dispatch(getProfiles(routeParams)))
        );
    };
}



