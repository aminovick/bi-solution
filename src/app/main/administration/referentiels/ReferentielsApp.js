import React, {useEffect, useRef} from 'react';
import {Fab, Icon} from '@material-ui/core';
import {FusePageSimple, FuseAnimate} from '@fuse';
import {useDispatch, useSelector} from 'react-redux';
import withReducer from 'app/store/withReducer';
import ReferentielsList from './ReferentielsList';
import ReferentielsHeader from './ReferentielsHeader';
import ReferentielsSidebarContent from './ReferentielSidebarContent';
import ReferentielsDialog from './ReferentielsDialog';
import * as Actions from './store/actions';
import reducer from './store/reducers';
import {makeStyles} from '@material-ui/styles';

const useStyles = makeStyles({
    addButton: {
        position: 'absolute',
        right   : 12,
        bottom  : 12,
        zIndex  : 99
    }
});

function ReferentielsApp(props)
{
    const dispatch = useDispatch();

    const classes = useStyles(props);
    const pageLayout = useRef(null);

    useEffect(() => {
        dispatch(Actions.getEntities());
        dispatch(Actions.getReferentiels(props.match.params));
    }, [dispatch, props.match.params]);

    const columnId = useSelector(({referentielsApp}) => referentielsApp.referentiels.selectedColumnId);
    const entityId = useSelector(({referentielsApp}) => referentielsApp.referentiels.selectedEntityId);

    function enableNewReferentielDialog()
    {
       return (columnId && entityId ) ? false : true;
    }

    return (
        <React.Fragment>
            <FusePageSimple
                classes={{
                    contentWrapper: "p-0 sm:p-24 pb-80 sm:pb-80 h-full",
                    content       : "flex flex-col h-full",
                    leftSidebar   : "w-512 border-0",
                    header        : "min-h-72 h-72 sm:h-136 sm:min-h-136"
                }}
                header={
                    <ReferentielsHeader pageLayout={pageLayout}/>
                }
                content={
                    <ReferentielsList/>
                }
                leftSidebarContent={
                    <ReferentielsSidebarContent/>
                }
                sidebarInner
                ref={pageLayout}
                innerScroll
            />
            <FuseAnimate animation="transition.expandIn" delay={300}>
                <Fab
                    color="primary"
                    aria-label="add"
                    className={classes.addButton}
                    disabled={enableNewReferentielDialog()}
                    onClick={ev => dispatch(Actions.openNewReferentielDialog())}
                >
                    <Icon>add</Icon>
                </Fab>
            </FuseAnimate>
         <ReferentielsDialog/>
        </React.Fragment>
    )
}

export default withReducer('referentielsApp', reducer)(ReferentielsApp);
