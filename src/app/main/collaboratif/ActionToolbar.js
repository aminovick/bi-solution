import React from 'react';
import {Icon, IconButton, MenuItem, FormControl, Select} from '@material-ui/core';
import {useDispatch, useSelector} from 'react-redux';
import * as Actions from './store/actions';

function ActionToolbar(props)
{
    const dispatch = useDispatch();
    const orderBy = useSelector(({actionApp}) => actionApp.action.orderBy);
    const orderDescending = useSelector(({actionApp}) => actionApp.action.orderDescending);

    function handleOrderChange(ev)
    {
        dispatch(Actions.changeOrder(ev.target.value));
    }

    return (
        <div className="flex justify-between w-full">
            <div className="flex"/>
            <div className="flex items-center">
                <FormControl className="">
                    <Select
                        value={orderBy}
                        onChange={handleOrderChange}
                        displayEmpty
                        name="filter"
                        className=""
                    >
                        <MenuItem value="">
                            <em>Order by</em>
                        </MenuItem>
                        <MenuItem value="startDate">Date Debut</MenuItem>
                        <MenuItem value="dueDate">Date D'echeance</MenuItem>
                        <MenuItem value="title">titre</MenuItem>
                    </Select>
                </FormControl>
                <IconButton onClick={ev => dispatch(Actions.toggleOrderDescending())}>
                    <Icon style={{transform: orderDescending ? 'scaleY(-1)' : 'scaleY(1)'}}>
                        sort
                    </Icon>
                </IconButton>
            </div>
        </div>
    );
}

export default ActionToolbar;
