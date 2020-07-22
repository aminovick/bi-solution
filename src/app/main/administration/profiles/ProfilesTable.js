import React, {useEffect, useState} from 'react';
import {Icon, Table, TableBody, TableCell, TablePagination, TableRow, IconButton} from '@material-ui/core';
import {FuseScrollbars} from '@fuse';
import {withRouter} from 'react-router-dom';
import clsx from 'clsx';
import _ from '@lodash';
import ProfilesTableHead from './ProfilesTableHead';
import * as Actions from './store/actions';
import {useDispatch, useSelector} from 'react-redux';

function ProfilesTable(props)
{
    const dispatch = useDispatch();
    const profiles = useSelector(({profileApp}) => profileApp.profiles.data);
    const searchText = useSelector(({profileApp}) => profileApp.profiles.searchText);

    const [selected, setSelected] = useState([]);
    const [data, setData] = useState(profiles);
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [order, setOrder] = useState({
        direction: 'asc',
        id       : null
    });

    useEffect(() => {
        dispatch(Actions.getProfiles());
    }, [dispatch]);

    useEffect(() => {
        setData(searchText.length === 0 ? profiles : _.filter(profiles, item => item.name.toLowerCase().includes(searchText.toLowerCase())))
    }, [profiles, searchText]);

    function handleRequestSort(event, property)
    {
        const id = property;
        let direction = 'desc';

        if ( order.id === property && order.direction === 'desc' )
        {
            direction = 'asc';
        }

        setOrder({
            direction,
            id
        });
    }

    function handleSelectAllClick(event)
    {
        if ( event.target.checked )
        {
            setSelected(data.map(n => n.id));
            return;
        }
        setSelected([]);
    }

    function handleClick(item)
    {
        props.history.push('/administration/profiles/' + item.id );
    }

    function handleCheck(event, id)
    {
        const selectedIndex = selected.indexOf(id);
        let newSelected = [];

        if ( selectedIndex === -1 )
        {
            newSelected = newSelected.concat(selected, id);
        }
        else if ( selectedIndex === 0 )
        {
            newSelected = newSelected.concat(selected.slice(1));
        }
        else if ( selectedIndex === selected.length - 1 )
        {
            newSelected = newSelected.concat(selected.slice(0, -1));
        }
        else if ( selectedIndex > 0 )
        {
            newSelected = newSelected.concat(
                selected.slice(0, selectedIndex),
                selected.slice(selectedIndex + 1)
            );
        }

        setSelected(newSelected);
    }

    function handleChangePage(event, page)
    {
        setPage(page);
    }

    function handleChangeRowsPerPage(event)
    {
        setRowsPerPage(event.target.value);
    }

    return (
        <div className="w-full flex flex-col">

            <FuseScrollbars className="flex-grow overflow-x-auto">

                <Table className="min-w-xl" aria-labelledby="tableTitle">

                    <ProfilesTableHead
                        numSelected={selected.length}
                        order={order}
                        onSelectAllClick={handleSelectAllClick}
                        onRequestSort={handleRequestSort}
                        rowCount={data.length}
                    />

                    <TableBody>
                        {_.orderBy(data, [
                            (o) => {
                                switch ( order.id )
                                {
                                    case 'categories':
                                    {
                                        return o.categories[0];
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
                                        tabIndex={-1}
                                        key={n.id}  
                                        onClick={event => handleClick(n)}
                                    >
                                       

                                        <TableCell component="th" scope="row">
                                            {n.name}
                                        </TableCell>

                                        <TableCell component="th" scope="row">
                                            {n.description}
                                        </TableCell>
                                        <TableCell component="th" scope="row">
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

export default withRouter(ProfilesTable);
