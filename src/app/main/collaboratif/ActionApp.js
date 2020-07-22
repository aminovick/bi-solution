import React, { useEffect, useRef } from 'react';
import { FusePageCarded } from '@fuse';
import { useDispatch } from 'react-redux';
import withReducer from 'app/store/withReducer';
import ActionList from './ActionList';
import ActionToolbar from './ActionToolbar';
import ActionHeader from './ActionHeader';
import ActionSidebarContent from './ActionSidebarContent';
import ActionDialog from './ActionDialog';
import * as Actions from './store/actions';
import reducer from './store/reducers';

function ActionApp(props) {
    const dispatch = useDispatch();

    const pageLayout = useRef(null);

    useEffect(() => {
        dispatch(Actions.getFilters());
        dispatch(Actions.getFolders());
        dispatch(Actions.getLabels());
    }, [dispatch]);

    useEffect(() => {
        dispatch(Actions.getActions(props.match.params));
    }, [dispatch, props.match.params]);

    return (
        <React.Fragment>
            <FusePageCarded
                classes={{
                    root: "w-full",
                    header: "items-center min-h-72 h-72 sm:h-136 sm:min-h-136"
                }}
                header={
                    <ActionHeader pageLayout={pageLayout} />
                }
                contentToolbar={
                    <ActionToolbar />
                }
                content={
                    <ActionList />
                }
                leftSidebarContent={
                    <ActionSidebarContent />
                }
                ref={pageLayout}
                innerScroll
            />
            <ActionDialog />
        </React.Fragment>
    )
}

export default withReducer('actionApp', reducer)(ActionApp);
