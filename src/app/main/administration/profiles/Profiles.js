import React from 'react';
import {FusePageCarded} from '@fuse';
import withReducer from 'app/store/withReducer';
import ProfilesTable from './ProfilesTable';
import ProfilesHeader from './ProfilesHeader';
import reducer from './store/reducers';

function Profiles()
{
    return (
        <FusePageCarded
            classes={{
                content: "flex",
                header : "min-h-72 h-72 sm:h-136 sm:min-h-136"
            }}
            header={
                <ProfilesHeader/>
            }
            content={
                <ProfilesTable/>
            }
            innerScroll
        />
    );
}

export default withReducer('profileApp', reducer)(Profiles);
