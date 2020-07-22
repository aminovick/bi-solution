import React from 'react';
import {Redirect} from 'react-router-dom';

export const CandidatAppConfig = {
    settings: {
        layout: {
            config: {}
        }
    },
    routes  : [
        {
            path     : '/crm/candidats/:candidatId',
            component: React.lazy(() => import('./Candidat'))
        },
        {
            path     : '/crm/candidats',
            component: React.lazy(() => import('./CandidatsApp'))
        }
    ]
};
