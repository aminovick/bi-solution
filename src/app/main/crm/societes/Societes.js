import React from 'react';
import {FusePageCarded} from '@fuse';
import reducer from './store/reducers';
import SocietesHeader from './SocietesHeader';
import SocietesTable from './SocietesTable';
import withReducer from 'app/store/withReducer';

function Societes()
{
    return (
        <FusePageCarded
            classes={{
                content: "flex",
                header : "min-h-72 h-72 sm:h-136 sm:min-h-136"
            }}
             header={
                <SocietesHeader/>
            } 
              content={
                <SocietesTable/>
            } 
            innerScroll
        />
    );
}

export default withReducer('societeApp', reducer)(Societes);