import React from 'react';
import {Redirect} from 'react-router-dom';

export const AdministrationConfig = {
    settings: {
        layout: {
            config: {}
        }
    },
    routes  : [
        {
            path     : '/administration/users/:userId',
            component: React.lazy(() => import('./users/User'))
        },
        {
            path     : '/administration/users',
            component: React.lazy(() => import('./users/Users'))
        },
        {
            path     : '/administration/profiles/:profileId',
            component: React.lazy(() => import('./profiles/Profile'))
        },
        {
            path     : '/administration/Profiles',
            component: React.lazy(() => import('./profiles/Profiles'))
        },
        {
            path     : '/login',
            component: React.lazy(() => import('../login/Login'))
        },
      
        
        
    ]
};
