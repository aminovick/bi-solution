import axios from 'axios';
import {FuseUtils} from '@fuse';
import {showMessage} from 'app/store/actions/fuse';

export const GET_CANDIDAT = '[CRM] GET CANDIDAT';
export const SAVE_CANDIDAT = '[CRM] SAVE CANDIDAT';
export const SET_SITUATION_FAMILLIALE='[REF] SET_SITUATION_FAMILLIALE'; 
export const SET_NATIONALITE='[REF] SET_NATIONALITE' ;
export const SET_MOBILITE='[REF] SET_SITUATION_FAMILLIALE' ;
export const SET_DISPONIBILITE='[REF] SET_DISPONIBILITE' ;
export const SET_PROVENANCE='[REF] SET_PROVENANCE' ;
export const SET_RESPONSABLE='[REF] SET_RESPONSABLE' ;
export const SET_PAYS='[REF] SET_PAYS' ;
export const SET_VILLE='[REF] SET_VILLE' ;
export const SET_DIPLOMES='[REF] SET_DIPLOMES' ;
export const SET_EXPERIENCE='[REF] SET_EXPERIENCE' ;
export const SET_LANGUES='[REF] SET_LANGUES' ;
export const SET_OUTILS='[REF] SET_OUTILS' ;
export const SET_DOMAINES='[REF] SET_DOMAINES';
export const SET_CONTRATS='[REF] SET_CONTRATS';
export const SET_NIVFORMATION='[REF] SET_NIVFORMATION';

export const GET_SITUATION_FAMILLIALE='[REF] GET_SITUATION_FAMILLIALE'; 
export const GET_NATIONALITIE='[REF] GET_NATIONALITIE' ;
export const GET_MOBILITE='[REF] GET_MOBILITE' ;
export const GET_DISPONIBILITE='[REF] GET_DISPONIBILITE' ;
export const GET_PROVENANCE='[REF] GET_PROVENANCE' ;
export const GET_RESPONSABLE='[REF] GET_RESPONSABLE' ;
export const GET_PAYS='[REF] GET_PAYS' ;
export const GET_VILLE='[REF] GET_VILLE' ;
export const GET_DIPLOME='[REF] GET_DIPLOME' ;
export const GET_EXPERIENCE='[REF] GET_EXPERIENCE' ;
export const GET_LANGUES='[REF] GET_LANGUES' ;
export const GET_OUTILS='[REF] GET_OUTILS' ;
export const GET_DOMAINES='[REF] GET_DOMAINES';
export const GET_CONTRATS='[REF] GET_CONTRATS';

export const SET_CONTRATS_CIBLE='[REF] SET_CONTRATS_CIBLE';
export const GET_NIVFORMATION='[REF] GET_NIVFORMATION';

export function getCandidat(params)
{
    
    const request = axios.get('/api/crm/candidat/', {params});

    return (dispatch) =>
        request.then((response) =>
            dispatch({
                type   : GET_CANDIDAT,
                payload: response.data
            })
        );
}

export function saveCandidat(form)
{
  
    console.log(form);
    const request = axios.post('/api/crm/candidats',form);
 
    return (dispatch) =>
        request.then((response) => {

                dispatch(showMessage({message: 'Candidat Saved'}));
                
                return dispatch({
                    type   : SAVE_CANDIDAT,
                    payload: response.data
                })
                
            }
        );
}


export function newCandidat()
{
    const data = {

        id              : FuseUtils.generateGUID(),
        lastname        : '',
        fistname       : '',
        selectedSituationF : '',
        selectedNationalite : '',
        dateNaissance        : '',
        selectedMobilite    :'',
        selectedDisponibilite: '',
        statut          : '',
        selectedProvenance : '',
        email :'',
        telephoneMobile :'', 
        adresse :'', 
        codepostale :'', 
        selectedPays :'', 
        selectedVille :'', 

        salaireActual :'', 
        salaireSouhaite :'', 
        titre :'', 
        nbrAnneesExp :'', 
        selectedDiplomes :[], 
        selectedExperience :[], 
        selectedLangues :[], 
        selectedOutils :[], 
        selectedDomaines :[], 
        niveauFormationList:[],
        selectedContrats:null,
        selectedContratsSouhaite:null,
        selectedNivFormation:null
        
    };
    return {
        type   : GET_CANDIDAT,
        payload: data
    }
    
}

export function getSituationFamilliale()
{
    const request = axios.get('/api/ref/situationF');
    return (dispatch) =>
        request.then((response) =>
            dispatch({
                type   : GET_SITUATION_FAMILLIALE,
                payload: response.data
            })
        );
}

export function getNationalite()
{
    const request = axios.get('/api/ref/nationalites');
    return (dispatch) =>
        request.then((response) =>
            dispatch({
                type   : GET_NATIONALITIE,
                payload: response.data
            })
        );
}
export function getMobilites()
{
    const request = axios.get('/api/ref/mobilities');
    return (dispatch) =>
        request.then((response) =>
            dispatch({
                type   : GET_MOBILITE,
                payload: response.data
            })
        );
}
export function getDisponibilite()
{
    const request = axios.get('/api/ref/disponibilites');
    return (dispatch) =>
        request.then((response) =>
            dispatch({
                type   : GET_DISPONIBILITE,
                payload: response.data
            })
        );
}
export function getProvenance()
{
    const request = axios.get('/api/ref/provenances');
    return (dispatch) =>
        request.then((response) =>
            dispatch({
                type   : GET_PROVENANCE,
                payload: response.data
            })
        );
}
export function getResponsable()
{
    const request = axios.get('/api/ref/responsables');
    return (dispatch) =>
        request.then((response) =>
            dispatch({
                type   : GET_RESPONSABLE,
                payload: response.data
            })
        );
}
export function getPays()
{
    const request = axios.get('/api/ref/pays');
    return (dispatch) =>
        request.then((response) =>
            dispatch({
                type   : GET_PAYS,
                payload: response.data
            })
        );
}
export function getVilles()
{
    const request = axios.get('/api/ref/villes');
    return (dispatch) =>
        request.then((response) =>
            dispatch({
                type   : GET_VILLE,
                payload: response.data
            })
        );
}
export function getDiplomes()
{
    const request = axios.get('/api/ref/diplomes');
    return (dispatch) =>
        request.then((response) =>
            dispatch({
                type   : GET_DIPLOME,
                payload: response.data
            })
        );
}
export function getExperiences()
{
    const request = axios.get('/api/ref/experiences');
    return (dispatch) =>
        request.then((response) =>
            dispatch({
                type   : GET_EXPERIENCE,
                payload: response.data
            })
        );
}
export function getLangues()
{
    const request = axios.get('/api/ref/langues');
    return (dispatch) =>
        request.then((response) =>
            dispatch({
                type   : GET_LANGUES,
                payload: response.data
            })
        );
}
export function getOutils()
{
    const request = axios.get('/api/ref/outils');
    return (dispatch) =>
        request.then((response) =>
            dispatch({
                type   : GET_OUTILS,
                payload: response.data
            })
        );
}
export function getDomaines()
{
    const request = axios.get('/api/ref/domaines');
    return (dispatch) =>
        request.then((response) =>
            dispatch({
                type   : GET_DOMAINES,
                payload: response.data
            })
        );
}
export function getContrats()
{
    const request = axios.get('/api/ref/contrats');
    return (dispatch) =>
        request.then((response) =>
            dispatch({
                type   : GET_CONTRATS,
                payload: response.data
            })
        );
}

export function getNivFormation()
{
    const request = axios.get('/api/ref/nivformation');
    return (dispatch) =>
        request.then((response) =>
            dispatch({
                type   : GET_NIVFORMATION,
                payload: response.data
            })
        );
}

export   function selectSituationF(value)
    {
        return {
            type      : SET_SITUATION_FAMILLIALE,
            payload: value
        }
    }
    export    function selectNationalite(value)
    {
        return {
            type      : SET_NATIONALITE,
            payload: value
        }
    }
    export   function selectMobilite(value)
    {

        console.log(value);
        return {
            type      : SET_MOBILITE,
            payload: value
        }
    }
    export   function selectDisponibilite(value)
    {
        return {
            type      : SET_DISPONIBILITE,
            payload: value
        }
    }
    export   function selectProvenance(value)
    {
        return {
            type      : SET_PROVENANCE,
            payload: value
        }
    }
    export   function selectResponsable(value)
    {
        return {
            type      : SET_RESPONSABLE,
            payload: value
        }
    }
    export    function selectPays(value)
    {
        return {
            type      : SET_PAYS,
            payload: value
        }
    }
    
    export  function selectVille(value)
    {
        return {
            type      : SET_VILLE,
            payload: value
        }
    }
    export    function selectDiplomes(value)
    {
        return {
            type      : SET_DIPLOMES,
            payload: value
        }
    }
    export   function selectExperience(value)
    {
        return {
            type      : SET_EXPERIENCE,
            payload: value
        }
    }
    export   function selectLangues(value)
    {
        return {
            type      : SET_LANGUES,
            payload: value
        }
    }
    export  function selectOutils(value)
    {
        return {
            type      : SET_OUTILS,
            payload: value
        }
    }
    export    function selectDomaines(value)
    {
        return {
            type      : SET_DOMAINES,
            payload: value
        }
    }
    export    function selectContrats(value)
    {
        return {
            type      : SET_CONTRATS,
            payload: value
        }
    }
    export    function selectContratsSouhaite(value)
    {
        return {
            type      : SET_CONTRATS_CIBLE,
            payload: value
        }
    }
    export    function selectNivFormation(value)
    {
        return {
            type      : SET_NIVFORMATION,
            payload: value
        }
    }
   
