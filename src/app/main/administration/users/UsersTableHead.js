import React, {useState} from 'react';
import {TableHead, TableSortLabel, TableCell, TableRow, Checkbox, Tooltip, IconButton, Icon, Menu, MenuList, MenuItem, ListItemIcon, ListItemText,} from '@material-ui/core';
import clsx from 'clsx';
import {makeStyles} from '@material-ui/styles';

const rows = [
    {
        id            : 'id',
        align         : 'left',
        disablePadding: false,
        label         : 'Identifiant',
        sort          : true
    },
  
    {
        id            : 'name',
        align         : 'left',
        disablePadding: false,
        label         : 'Nom',
        sort          : true
    },
    {
        id            : 'lastName',
        align         : 'left',
        disablePadding: false,
        label         : 'Prénom',
        sort          : true
    },
    {
        id            : 'email',
         align         : 'left',
        disablePadding: false,
        label         : 'Email',
        sort          : true
    },
    
    {
        id            : 'active',
        align         : 'left',
        disablePadding: false,
        label         : 'Active',
        sort          : true
    },
    {
        id            : 'profiles',
        align         : 'rigth',
        disablePadding: false,
        label         : 'Profiles',
        sort          : true
    }
    
];

const useStyles = makeStyles(theme => ({
    actionsButtonWrapper: {
        background: theme.palette.background.paper
    }
}));

function UsersTableHead(props)
{
    const classes = useStyles(props);
    const [selectedUsersMenu, setSelectedUsersMenu] = useState(null);

    const createSortHandler = property => event => {
        props.onRequestSort(event, property);
    };

    

    return (
        <TableHead>
            <TableRow className="h-64">
                
                {rows.map(row => {
                    return (
                        <TableCell
                            key={row.id}
                            align={row.align}
                            padding={row.disablePadding ? 'none' : 'default'}
                            sortDirection={props.order.id === row.id ? props.order.direction : false}
                        >
                            {row.sort && (
                                <Tooltip
                                    title="Sort"
                                    placement={row.align === "right" ? 'bottom-end' : 'bottom-start'}
                                    enterDelay={300}
                                >
                                    <TableSortLabel
                                        active={props.order.id === row.id}
                                        direction={props.order.direction}
                                        onClick={createSortHandler(row.id)}
                                    >
                                        {row.label}
                                    </TableSortLabel>
                                </Tooltip>
                            )}
                        </TableCell>
                    );
                }, this)}
            </TableRow>
        </TableHead>
    );
}

export default UsersTableHead;
