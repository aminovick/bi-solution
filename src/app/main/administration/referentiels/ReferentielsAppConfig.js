import React from 'react';
import {Redirect} from 'react-router-dom';

export const ReferentielsAppConfig = {
    settings: {
        layout: {
            config: {}
        }
    },
    routes  : [
        {
            path     : '/administration/referentiels/:id',
            component: React.lazy(() => import('./ReferentielsApp'))
        },
        {
            path     : '/administration/referentiels',
            component: () => <Redirect to="/administration/referentiels/all"/>
        }
    ]
};
