import React from 'react';
import {Redirect} from 'react-router-dom';
import {FuseUtils} from '@fuse';
import {AdministrationConfig} from 'app/main/administration/AdministrationConfig';
import {ReferentielsAppConfig} from 'app/main/administration/referentiels/ReferentielsAppConfig';
import {CandidatAppConfig} from 'app/main/crm/candidats/CandidatAppConfig';
import {HomeConfig} from 'app/main/home/HomeConfig';
import {SocieteAppConfig} from 'app/main/crm/societes/SocieteAppConfig';
import {ActionAppConfig}from 'app/main/collaboratif/ActionAppConfig'
const routeConfigs = [
    ActionAppConfig,
    SocieteAppConfig,
    AdministrationConfig,
    ReferentielsAppConfig,
    CandidatAppConfig,
    HomeConfig,
    
];

const routes = [
    ...FuseUtils.generateRoutesFromConfigs(routeConfigs),
    {
        path     : '/',
        component: () => <Redirect to="/"/>
    }
];

export default routes;
