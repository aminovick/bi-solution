import axios from 'axios';
import {FuseUtils} from '@fuse';
import {showMessage} from 'app/store/actions/fuse';
import { format } from 'url';
import history from '@history';
import API_URLS from '../../../../shared/api'
export const GET_SOCIETE = '[CRM] GET SOCIETE';
export const SAVE_SOCIETE = '[CRM] SAVE SOCIETE';
export const GET_SECTEUR   = '[CRM] GET SECTEUR';
export const SET_SELECTED_SECTEUR = '[CRM] SET SELECTED SECTEUR';
export const GET_PROVENANCE ='[CRM] GET PROVENANCE';
export const SET_SELECTED_PROVENANCE= '[CRM] SET SELECTED PROVENANCE';
export const SET_SELECTED_ETAT='[CRM] SET SELECTED ETAT'
export const SET_SELECTED_VILLE = '[CRM] SET SELECTED VILLE'
export const GET_VILLE = '[CRM] GET VILLE'
export const SET_SELECTED_PAYS = '[CRM] SET SELECTED PAYS'
export const GET_PAYS = '[CRM] GET PAYS'
export const SET_SELECTED_SOCIETEMERE='[CRM] SET SELECTED SOCIETEMERE'
export  const GET_SOCIETEMERE='[CRM] GET SOCIETEMERE'
export const  GET_ETAT ='[CRM] GET ETAT'
export function getSociete(params)
{
    const request = axios.get(API_URLS.url_crm_getSociete_byId, {params});

    return (dispatch) =>
        request.then((response) =>
            dispatch({
                type   : GET_SOCIETE,
                payload: response.data
            })
        );
}

export function saveSociete(newData)
{
  
    const request = axios.post(API_URLS.url_crm_post_societe, newData);

    return (dispatch) =>
        request.then((response) => {

                dispatch(showMessage({message: 'Societe Saved'}));
                
                return dispatch({
                    type   : SAVE_SOCIETE,
                    payload: response.data
                    
                })
               
            },
            history.push('/crm/societes') 
        );
       
}
export function getsecteurActivite()
{
    const request = axios.get(API_URLS.url_crm_secteurActivite);
   
    return (dispatch) =>
        request.then((response) =>
            dispatch({
                type   : GET_SECTEUR,
                payload: response.data
            })
        );
}
export function getProvenance()
{
    const request = axios.get(API_URLS.url_crm_provenance);
      
    return (dispatch) =>
        request.then((response) =>
            dispatch({
                type   : GET_PROVENANCE,
                payload: response.data
            })
        );
}
export function getSocieteMere()
{
    const request = axios.get(API_URLS.url_crm_societeMere);
  
    return (dispatch) =>
        request.then((response) =>
            dispatch({
                type   : GET_SOCIETEMERE,
                payload: response.data
            })
        );
}

export function getVille()
{
    const request = axios.get(API_URLS.url_crm_ville);
     
    return (dispatch) =>
        request.then((response) =>
            dispatch({
                type   : GET_VILLE,
                payload: response.data
            })
        );
}
export function getEtat()
{
    const request = axios.get(API_URLS.url_crm_etat);
      
    return (dispatch) =>
        request.then((response) =>
            dispatch({
                type   : GET_ETAT,
                payload: response.data
            })
        );
}

export function getPays()
{
    const request = axios.get(API_URLS.url_crm_payes);
     
    return (dispatch) =>
        request.then((response) =>
            dispatch({
                type   : GET_PAYS,
                payload: response.data
            })
        );
}


export function newSociete()
{
    const data = {
        id              : '',
        nom            : '',
        selectedSecteur:'',
        societeMere    : '',
        provenance:'',
        selectedProvenance :'',
        selectedEtat:'',
        tva:'',
        siret:'',
        statutJuridique:'',
        rcs:'',
        setSelectedPhone:'',
        setSelectedFax:'',
        ville:'',
        selectedPays:'',
        adresse:'',
        codePostal:'',
        siteWeb:'',
        selectedVille:'',
        selectedSocieteMere:'',
        informations:''
       
        
        
            };

    return {
        type   : GET_SOCIETE,
        payload: data
    }
}
export function selectSecteur(value)
{
    return {
        type      : SET_SELECTED_SECTEUR ,
        payload: value
    }
}
export function selectProvenance(value)          
{
    return {
        type      : SET_SELECTED_PROVENANCE ,
        payload: value
    }
    
}
export function selectVille(value)          
{
    return {
        type      : SET_SELECTED_VILLE ,  
        payload: value
    }
    
}
export function selectedPays(value)          
{
    return {
        type      : SET_SELECTED_PAYS ,  
        payload: value
    }
    
}
export function selectedSocieteMere(value)          
{
    return {
        type      : SET_SELECTED_SOCIETEMERE ,  
        payload: value
    }
    
}
export function selectedEtat(value)
{
    return {
        type       :SET_SELECTED_ETAT,
        payload:    value
    }

}

