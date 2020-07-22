import React, { useState } from 'react';
import { TableHead, TableSortLabel, TableCell, TableRow, Checkbox, Tooltip, IconButton, Icon, Menu, MenuList, MenuItem, ListItemIcon, ListItemText, } from '@material-ui/core';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/styles';

const rows = [
    {
        id: 'societe ',
        align: 'left',
        disablePadding: false,
        label: 'Société ',
        sort: true
    },
    {
        id: 'sercteurActivite',
        align: 'left',
        disablePadding: false,
        label: 'Secteur d’activité',
        sort: true
    },
    {
        id: 'informations',
        align: 'left',
        disablePadding: false,
        label: 'Informations',
        sort: true
    },
    {
        id: 'etat',
        align: 'left',
        disablePadding: false,
        label: 'Etat',
        sort: true
    },
    
    {
        id: 'coordonnees',
        align: 'left',
        disablePadding: false,
        label: 'Coordonnees',
        sort: true
    },
    ,
    {
        id: 'lieu',
        align: 'left',
        disablePadding: false,
        label: 'Lieu',
        sort: true
    },
       
];

const useStyles = makeStyles(theme => ({
    actionsButtonWrapper: {
        background: theme.palette.background.paper
    }
}));

function SocieteTableHead(props) {
    const classes = useStyles(props);
    const [selectedSocieteMenu, setSelectedSocieteMenu] = useState(null);

    const createSortHandler = property => event => {
        props.onRequestSort(event, property);
    };

    function openSelectedSocieteMenu(event) {
        setSelectedSocieteMenu(event.currentTarget);
    }

    function closeSelectedSocieteMenu() {
        setSelectedSocieteMenu(null);
    }

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

export default SocieteTableHead;
