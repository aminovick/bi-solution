import axios from 'axios'

export const GET_LABELS = '[collaboratif APP] GET LABELS';
export function getLabels(){

    const request= axios.get('/action/action-app/labels')
    return (dispatch)=>{
        request.then((response)=>
        dispatch({
            type:GET_LABELS,
            payload:response.data
        }))
    }
}
