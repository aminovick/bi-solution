import axios from 'axios';
import {FuseUtils} from '@fuse';
import {showMessage} from 'app/store/actions/fuse';
import API_URLS from '../../../shared/api';
export const GET_USER = '[ADMINISTRATION] GET USER';
export const SAVE_USER = '[ADMINISTRATION] SAVE USER';


export function getUser(params)
{
    
    const request = axios.get(API_URLS.url_get_user,{params});
    console.log(request)
    return (dispatch) =>
        request.then((response) =>
            dispatch({
                type   : GET_USER,
                payload: response.data
            })
        );
}

export function saveUser(data )
{
   
    const request = axios.post(API_URLS.url_register_user, data);
 
    return (dispatch) =>
        request.then((response) => {

                dispatch(showMessage({message: 'User Saved'}));
                
                return dispatch({
                    type   : SAVE_USER,
                    payload: response.data
                })
           }
        ).catch((error) => {
            dispatch(showMessage({
                message: error.response.data.message ,
               // message: 'champ vide !',
                variant: 'error'
            })
          
            );
            console.log({error});
        });
}


export function newUser()
{
   
    const data = {

        id              :'',
        username        : '',
        firstName       : '',
        lastName        : '',
        email           : '',
        password        : '',
        confirmation    :'',
        date_connexion  : '',
        active          : false,
        profiles        :[],
        profilSelected  :[],
        
       
        
    };

    return {
        type   : GET_USER,
        payload: data
    }
    
}
