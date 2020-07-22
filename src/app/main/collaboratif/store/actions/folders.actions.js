import axios from 'axios';

export const GET_FOLDERS = '[ACTION APP] GET FOLDERS';

export function getFolders()
{
    const request = axios.get('/api/action-app/folders');

    return (dispatch) =>
        request.then((response) =>
            dispatch({
                type   : GET_FOLDERS,
                payload: response.data
            })
        );
}
