import React from 'react';
import {Redirect} from 'react-router-dom';
export const ActionAppConfig = {
    settings: {
        layout: {
            config: {}
        }
    },
    routes: [
        {
            path: [
                '/action/label/:labelHandle/:actionId?',
                '/action/filter/:filterHandle/:actionId?',
                '/action/:folderHandle/:actionId?'
            ],
            component: React.lazy(() => import('./ActionApp'))
        },
        {
            path     : '/action',
            component: () => <Redirect to="/action/all"/>
        }
    ]

}