import React from 'react';
import {Icon, List, ListItem, ListItemText, ListSubheader, Button} from '@material-ui/core';
import {FuseAnimate, NavLinkAdapter} from '@fuse';
import {useDispatch, useSelector} from 'react-redux';
import * as Actions from './store/actions';
import {makeStyles} from '@material-ui/styles';

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
            fontSize   : 16,
            width      : 16,
            height     : 16,
            marginRight: 16
        }
    }
}));

function ActionSidebarContent(props)
{
    const dispatch = useDispatch();
    const labels = useSelector(({actionApp}) => actionApp.labels);
    const folders = useSelector(({actionApp}) => actionApp.folders);
    const filters = useSelector(({actionApp}) => actionApp.filters);

    const classes = useStyles(props);

    return (
        <FuseAnimate animation="transition.slideUpIn" delay={400}>

            <div className="flex-auto border-l-1 border-solid">

                <div className="p-24">
                    <Button
                        onClick={() => {
                            dispatch(Actions.openNewActionDialog());
                        }}
                        variant="contained"
                        color="primary"
                        className="w-full"
                    >
                        Ajouter Action
                    </Button>
                </div>

                <div className={classes.listWrapper}>

                    <List>
                        {folders.length > 0 && folders.map((folder) => (
                            <ListItem
                                button
                                component={NavLinkAdapter}
                                to={'/action/' + folder.handle} key={folder.id}
                                activeClassName="active"
                                className={classes.listItem}
                            >
                                <Icon className="list-item-icon" color="action">{folder.icon}</Icon>
                                <ListItemText primary={folder.title} disableTypography={true}/>
                            </ListItem>
                        ))}
                    </List>

                    <List>
                        <ListSubheader className={classes.listSubheader} disableSticky>TYPES</ListSubheader>

                        {filters.length > 0 && filters.map((filter) => (
                            <ListItem
                                button
                                component={NavLinkAdapter}
                                to={'/action/filter/' + filter.handle}
                                activeClassName="active"
                                className={classes.listItem}
                                key={filter.id}
                            >
                                <Icon className="list-item-icon" color="action">{filter.icon}</Icon>
                                <ListItemText primary={filter.title} disableTypography={true}/>
                            </ListItem>
                        ))}
                    </List>

                    <List>

                        <ListSubheader className="pr-24 pl-24" disableSticky>Catégorie</ListSubheader>

                        {labels.length > 0 && labels.map((label) => (
                            <ListItem
                                button
                                component={NavLinkAdapter}
                                to={'/action/label/' + label.handle}
                                key={label.id}
                                className={classes.listItem}
                            >
                                <Icon className="list-item-icon" style={{color: label.color}}
                                      color="action">label</Icon>
                                <ListItemText primary={label.title} disableTypography={true}/>
                            </ListItem>
                        ))}
                    </List>
                </div>
            </div>
        </FuseAnimate>
    );
}

export default ActionSidebarContent;
