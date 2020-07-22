import React, {useEffect, useRef} from 'react';
import {FusePageSimple, FuseAnimate} from '@fuse';
import {useDispatch} from 'react-redux';
import withReducer from 'app/store/withReducer';
import CandidatsList from './CandidatsList';
import CandidatsHeader from './CandidatsHeader';
import * as Actions from './store/actions';
import reducer from './store/reducers';
import {makeStyles} from '@material-ui/styles';

const useStyles = makeStyles({
   
});

function CandidatsApp(props)
{
    const dispatch = useDispatch();

    const classes = useStyles(props);
    const pageLayout = useRef(null);

    useEffect(() => {
        dispatch(Actions.getCandidats(props.match.params));
    }, [dispatch, props.match.params]);

    useEffect(() => {
        dispatch(Actions.getCandidats(props.match.params));
    }, [dispatch, props.match.params]);

    return (
        <React.Fragment>
            <FusePageSimple
                classes={{
                    contentWrapper: "p-0 sm:p-24 pb-80 sm:pb-80 h-full",
                    content       : "flex flex-col h-full",
                    leftSidebar   : "w-256 border-0",
                    header        : "min-h-72 h-72 sm:h-136 sm:min-h-136"
                }}
                header={
                    <CandidatsHeader pageLayout={pageLayout}/>
                }
                content={
                    <CandidatsList/>
                }
                sidebarInner
                ref={pageLayout}
                innerScroll
            />
        </React.Fragment>
    )
}

export default withReducer('CandidatsApp', reducer)(CandidatsApp);
