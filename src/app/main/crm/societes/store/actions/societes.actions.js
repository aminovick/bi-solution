import axios from 'axios';

import API_URLS from '../../../../shared/api';
import lib from 'formsy-react';
export const SET_SOCIETES_SEARCH_TEXT = '[CRM] SET SOCIETES SEARCH TEXT';
export const GET_SOCIETES = '[CRM] GET SOCIETES';
export const REMOVE = '[CRM] REMOVE';
export const OPEN_NEW_CONTACT_DIALOG = '[CRM] OPEN NEW CONTACT DIALOG';
export const CLOSE_EDIT_CONTACT_DIALOG = '[CRM] CLOSE EDIT CONTACT DIALOG';
export const CLOSE_NEW_CONTACT_DIALOG = '[CRM] CLOSE NEW CONTACT DIALOG';
export const ADD_CONTACT = '[CRM]  ADD CONTACT ';
export const GET_CONTACTS = '[CRM]  GET CONTACT ';
export const UPDATE_CONTACT = '[CRM]  UPDATE CONTACT ';
export const REMOVE_CONTACT = '[CRM]  REMOVE CONTACT ';
export const OPEN_EDIT_CONTACT_DIALOG = '[CRM]  OPEN EDIT CONTACT DIALOG';
export function getSocietes() {
    const request = axios.get(API_URLS.url_crm_allSociete)
    console.log(request)
    return (dispatch) =>
        request.then((response) =>
            dispatch({
                type: GET_SOCIETES,
                payload: response.data
            })

        );
        
}
export function setSocietesSearchText(event) {
    return {
        type: SET_SOCIETES_SEARCH_TEXT,
        searchText: event.target.value
    }
}
export function remove(id) {
    return (dispatch, getState) => {

        const { routeParams } = getState().societeApp.societes;

        const request = axios.delete(API_URLS.url_crm_deleteSociete+id);

        return request.then((response) =>
            Promise.all([
                dispatch({
                    type: REMOVE
                })
            ]).then(() => dispatch(getSocietes(routeParams)))
        );
    };
}
export function openNewContact() {
    return {
        type: OPEN_NEW_CONTACT_DIALOG
    }
}
export function closeEditContactDialog() {
    return {
        type: CLOSE_EDIT_CONTACT_DIALOG
    }
}
export function closeNewContactDialog() {
    return {
        type: CLOSE_NEW_CONTACT_DIALOG
    }
}
export function addContact(newContact) {
    return (dispatch, getState) => {
 
       const { routeParams } = getState().societeApp.societes;

         const { societeId } = routeParams;
        newContact.idSociete = societeId;
        console.log(newContact)
        console.log(societeId) 
        const request = axios.post(API_URLS.url_crm_post_contact, 
            newContact

        );
        console.log(request)
       
        request.then((response) =>{
              
              Promise.all([
                   dispatch({
                    type: ADD_CONTACT
                    
                })
           ])
        
            .then(() => dispatch(getContacts(routeParams)))
        });
    
    };
}
export function getContacts(routeParams) {
    const request = axios.get(API_URLS.url_crm_get_contact, {
        params: routeParams
    })

    return (dispatch) =>
        request.then((response) =>
            dispatch({
                type: GET_CONTACTS,
                payload: response.data,
                routeParams
            })
        );
};

export function updateContact(contact) {
    return (dispatch, getState) => {

        const { routeParams } = getState().societeApp.societes;

        const request = axios.put(API_URLS.url_update_contact, 
            contact
        );

        return request.then((response) =>
            Promise.all([
                dispatch({
                    type: UPDATE_CONTACT
                })
            ]).then(() => dispatch(getContacts(routeParams)))
        );
    };
}

export function removeContact(contactId) {
    return (dispatch, getState) => {

        const { routeParams } = getState().societeApp.societes;

        const request = axios.delete(API_URLS.url_delete_contact+ contactId );

        return request.then((response) =>
            Promise.all([
                dispatch({
                    type: REMOVE_CONTACT
                })
            ]).then(() => dispatch(getContacts(routeParams)))
        );
    };
}
export function openEditContactDialog(data) {
    return {
        type: OPEN_EDIT_CONTACT_DIALOG,
        data
    }
}
 