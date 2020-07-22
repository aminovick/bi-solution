import React, {useEffect, useState} from 'react';
import {List, Typography} from '@material-ui/core';
import {FuseUtils, FuseAnimate, FuseAnimateGroup} from '@fuse';
import {useSelector} from 'react-redux';
import _ from '@lodash';
import ActionListItem from './ActionListItem';

function ActionList(props)
{
    const actions = useSelector(({actionApp}) => actionApp.action.entities);
    const searchText = useSelector(({actionApp}) => actionApp.action.searchText);
    const orderBy = useSelector(({actionApp}) => actionApp.action.orderBy);
    const orderDescending = useSelector(({actionApp}) => actionApp.action.orderDescending);
    const [filteredData, setFilteredData] = useState(null);

    useEffect(() => {
        function getFilteredArray(entities, searchText)
        {
            const arr = Object.keys(entities).map((id) => entities[id]);
            if ( searchText.length === 0 )
            {
                return arr;
            }
            return FuseUtils.filterArrayByString(arr, searchText);
        }

        if ( actions )
        {
            setFilteredData(_.orderBy(getFilteredArray(actions, searchText), [orderBy], [orderDescending ? 'desc' : 'asc']));
        }
    }, [actions, searchText, orderBy, orderDescending]);

    if ( !filteredData )
    {
        return null;
    }

    if ( filteredData.length === 0 )
    {
        return (
            <FuseAnimate delay={100}>
                <div className="flex flex-1 items-center justify-center h-full">
                    <Typography color="textSecondary" variant="h5">
                        Pas D'action!
                    </Typography>
                </div>
            </FuseAnimate>
        );
    }

    return (
        <List className="p-0">
            <FuseAnimateGroup
                enter={{
                    animation: "transition.slideUpBigIn"
                }}
            >
                {
                    filteredData.map((action) => (
                            <ActionListItem action={action} key={action.id}/>
                        )
                    )
                }
            </FuseAnimateGroup>
        </List>
    );
}

export default ActionList;
