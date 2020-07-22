const PATH ="http://localhost";
const PORT="8080";

   const API_URLS={
    url_register_user:PATH+':'+PORT+'/auth/signup',
    url_get_allUsers:PATH+':'+PORT+'/auth/allUsers',
    url_delete_user:PATH+':'+PORT+'/auth/user/',
    url_update_user:PATH+':'+PORT+'/auth/user/',
    url_get_user:PATH+':'+PORT+'/auth/user/',
    url_login:PATH+':'+PORT+'/auth/login',
    url_crm_etat:PATH+':'+PORT+'/crm/api/etat',
    url_crm_payes:PATH+':'+PORT+'/crm/api/payes',
    url_crm_ville:PATH+':'+PORT+'/crm/api/ville',
    url_delete_contact:PATH+':'+PORT+'/crm/contact/',
    url_update_contact:PATH+':'+PORT+'/crm/contact',
    url_crm_post_societe:PATH+':'+PORT+'/crm/societe',
    url_crm_post_contact:PATH+':'+PORT+'/crm/contact',
    url_crm_getSociete_byId:PATH+':'+PORT+'/crm/societe/',
    url_crm_allSociete:PATH+':'+PORT+'/crm/societe/all',
    url_crm_deleteSociete:PATH+':'+PORT+'/crm/societe/',
    url_crm_get_contact:PATH+':'+PORT+'/crm/contacts/all',
    url_crm_provenance:PATH+':'+PORT+'/crm/api/provenance',
    url_crm_societeMere:PATH+':'+PORT+'/crm/api/societeMere',
    url_crm_secteurActivite:PATH+':'+PORT+'/crm/api/secteurActivite',
    
} 
export default API_URLS