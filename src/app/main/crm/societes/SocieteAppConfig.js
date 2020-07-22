import React from 'react';
import {Redirect} from 'react-router-dom';

export const SocieteAppConfig = {
    settings: {
        layout: {
            config: {}
        }
    },
    routes  : [
        {
            path     : '/crm/societes',
            component: React.lazy(() => import('./Societes'))
        },
        {
            path     : '/crm/societe/:societeId',
            component: React.lazy(() => import('./Societe'))
        }
        
    ]
};
