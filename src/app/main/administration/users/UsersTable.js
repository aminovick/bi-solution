import React, { useEffect, useState } from 'react';
import { Icon, Table, TableBody, TableCell, TablePagination, TableRow, Checkbox, IconButton } from '@material-ui/core';
import { FuseScrollbars } from '@fuse';
import { withRouter } from 'react-router-dom';
import _ from '@lodash';
import UsersTableHead from './UsersTableHead';
import * as Actions from '../store/actions';
import { useDispatch, useSelector } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
function UsersTable(props) {
    const dispatch = useDispatch();
    const users = useSelector(({ administrationApp }) => administrationApp.users.data);
    const searchText = useSelector(({ administrationApp }) => administrationApp.users.searchText);

    const [selected, setSelected] = useState([]);
    const [data, setData] = useState(users);
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [order, setOrder] = useState({
        direction: 'asc',
        id: null
    });

    useEffect(() => {
        dispatch(Actions.getUsers());
    }, [dispatch]);

    useEffect(() => {
        setData(searchText.length === 0 ? users : _.filter(users, item => item.username.toLowerCase().includes(searchText.toLowerCase())))
    }, [users, searchText]);

    function handleRequestSort(event, property) {
        const id = property;
        let direction = 'desc';

        if (order.id === property && order.direction === 'desc') {
            direction = 'asc';
        }

        setOrder({
            direction,
            id
        });
    }

    function handleSelectAllClick(event) {
        if (event.target.checked) {
            setSelected(data.map(n => n.id));
            return;
        }
        setSelected([]);
    }
    function handleClick(item) {
        console.log(item)
        props.history.push('/administration/users/'+item.id);
    }


    function handleCheck(event, id) {
        const selectedIndex = selected.indexOf(id);
        let newSelected = [];

        if (selectedIndex === -1) {
            newSelected = newSelected.concat(selected, id);
        }
        else if (selectedIndex === 0) {
            newSelected = newSelected.concat(selected.slice(1));
        }
        else if (selectedIndex === selected.length - 1) {
            newSelected = newSelected.concat(selected.slice(0, -1));
        }
        else if (selectedIndex > 0) {
            newSelected = newSelected.concat(
                selected.slice(0, selectedIndex),
                selected.slice(selectedIndex + 1)
            );
        }

        setSelected(newSelected);
    }

    function handleChangePage(event, page) {
        setPage(page);
    }

    function handleChangeRowsPerPage(event) {
        setRowsPerPage(event.target.value);
    }
    const useStyles = makeStyles(theme => ({
        root: {
            width: '50%',
            maxWidth: 300,
            backgroundColor: theme.palette.background.paper,
            position: 'relative',
            overflow: 'auto',
            maxHeight: 50,
        },
        listSection: {
            backgroundColor: 'inherit',
        },
        ul: {
            backgroundColor: 'inherit',
            padding: 0,
        },
    }));
    const classes = useStyles(props);
    return (
        <div className="w-full flex flex-col">

            <FuseScrollbars className="flex-grow overflow-x-auto">

                <Table className="min-w-xl" aria-labelledby="tableTitle">

                    <UsersTableHead
                        numSelected={selected.length}
                        order={order}
                        onSelectAllClick={handleSelectAllClick}
                        onRequestSort={handleRequestSort}
                        rowCount={data.length}
                    />

                    <TableBody>
                        {_.orderBy(data, [
                            (o) => {
                                switch (order.id) {
                                    case 'username':
                                        {
                                            return o.username[0];
                                        }
                                    default:
                                        {
                                            return o[order.id];
                                        }
                                }
                            }
                        ], [order.direction])
                            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                            .map(n => {
                                const isSelected = selected.indexOf(n.id) !== -1;
                                return (
                                    <TableRow
                                        className="h-64 cursor-pointer"
                                        hover
                                        role="checkbox"
                                        aria-checked={isSelected}
                                        tabIndex={-1}
                                        key={n.id}
                                        selected={isSelected}
                                        onClick={event => handleClick(n)}

                                    >
                                        
                                        <TableCell component="th" scope="row">
                                            {n.username}
                                        </TableCell>
                                        <TableCell component="th" scope="row">
                                            {n.firstName}
                                        </TableCell>
                                        <TableCell component="th" scope="row">
                                            {n.lastName}
                                        </TableCell>
                                        <TableCell className="truncate" component="th" scope="row">
                                            {n.email}
                                        </TableCell>

                                        <TableCell component="th" scope="row" align="left">
                                            {n.active ?
                                                (
                                                    <Icon className="text-green text-20">check_circle</Icon>
                                                ) :
                                                (
                                                    <Icon className="text-red text-20">remove_circle</Icon>
                                                )
                                            }
                                        </TableCell>

                                        <TableCell component="th" scope="row" align="left">

                                            <List className={classes.root} subheader={<li />}>
                                                {[n.profilSelected].map(sectionId => (
                                                    <li key={`section-${sectionId}`} className={classes.listSection}>
                                                        <ul className={classes.ul}>
                                                            {[n.profilSelected].map(item => (
                                                                <ListItem key={`item-${sectionId}-${item}`}>
                                                                    <ListItemText primary={` ${item}`} />
                                                                </ListItem>
                                                            ))}
                                                        </ul>
                                                    </li>
                                                ))}
                                            </List>



                                        </TableCell>
                                        <TableCell component="th" scope="row" >
                                        <IconButton
                                            onClick={(ev) => {
                                                ev.stopPropagation();
                                                dispatch(Actions.remove(n.id));
                                            }}
                                        
                                        >
                                            <Icon>delete</Icon>
                                        </IconButton>
                                        </TableCell>
                                    </TableRow>
                                );
                            })}
                    </TableBody>
                </Table>
            </FuseScrollbars>

            <TablePagination
                component="div"
                count={data.length}
                rowsPerPage={rowsPerPage}
                page={page}
                backIconButtonProps={{
                    'aria-label': 'Previous Page'
                }}
                nextIconButtonProps={{
                    'aria-label': 'Next Page'
                }}
                onChangePage={handleChangePage}
                onChangeRowsPerPage={handleChangeRowsPerPage}
            />
        </div>
    );
}

export default withRouter(UsersTable);
