import axios from 'axios';

export const GET_PROFILES ='[ADMINISTRATION] GET PROFILES';
export function getProfiles()
{
    const request = axios.get('/api/administation/profiles');
  
    return (dispatch) =>
        request.then((response) => {

                    return dispatch({
                    type   : GET_PROFILES,
                    payload: response.data
                })
                
            }
        );
}