import React from 'react';
import { Icon, List, ListItem, ListItemText, Paper, ListSubheader} from '@material-ui/core';
import {makeStyles} from '@material-ui/styles';
import {FuseAnimate} from '@fuse';
import {useDispatch, useSelector} from 'react-redux';
import * as Actions from './store/actions';

const useStyles = makeStyles(theme => ({
    listItem: {
        color              : 'inherit!important',
        textDecoration     : 'none!important',
        height             : 40,
        width              : 'calc(100% - 16px)',
        borderRadius       : '0 20px 20px 0',
        paddingLeft        : 24,
        paddingRight       : 12,
        '&.active'         : {
            backgroundColor    : theme.palette.secondary.main,
            color              : theme.palette.secondary.contrastText + '!important',
            pointerEvents      : 'none',
            '& .list-item-icon': {
                color: 'inherit'
            }
        },
        '& .list-item-icon': {
            marginRight: 16
        }
    }
}));



function ReferentielSidebarContent(props)
{
    const columnsList = useSelector(({referentielsApp}) => referentielsApp.referentiels.columnsList);
    const dispatch = useDispatch();

    const classes = useStyles(props);

    function handleSelectColumn(value) {
        dispatch(Actions.selectColumn(value));
    }

    return (
        <div className="p-0 lg:p-24 lg:pr-4">
               
            <FuseAnimate animation="transition.slideLeftIn" delay={200}>
                <Paper className="rounded-0 shadow-none lg:rounded-8 lg:shadow-1">
                    <List>
                    <ListSubheader className={classes.listSubheader} disableSticky>Liste des colonnes</ListSubheader>

                    {columnsList.map((item) => (
                        <ListItem
                        key={item.id}
                        value={item.id}
                        onClick={() => handleSelectColumn(item.id)}
                        className={classes.listItem}
                        >
                        <Icon className="list-item-icon text-16" color="action">{item.name}</Icon>
                        <ListItemText className="truncate pr-0" primary={item.name} disableTypography={true}/>
                        </ListItem>
                    ))}
                    </List>
                </Paper>
            </FuseAnimate>
        </div>
    );
}

export default ReferentielSidebarContent;
