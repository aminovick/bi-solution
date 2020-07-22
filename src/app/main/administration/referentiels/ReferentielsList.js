import React, {useEffect, useState} from 'react';
import { Icon, IconButton, Typography} from '@material-ui/core';
import {FuseUtils, FuseAnimate} from '@fuse';
import {useDispatch, useSelector} from 'react-redux';
import ReactTable from "react-table";
import * as Actions from './store/actions';

function ReferentielsList(props)
{
    const dispatch = useDispatch();
    const referentiels = useSelector(({referentielsApp}) => referentielsApp.referentiels.list);
     const [filteredData, setFilteredData] = useState(null);

    useEffect(() => {
        function getFilteredArray(entities)
        {
            return Object.keys(entities).map((id) => entities[id]);
        }

        if ( referentiels )
        {
            setFilteredData(getFilteredArray(referentiels));
        }
    }, [referentiels]);


    if ( !filteredData )
    {
        return null;
    }

    if ( filteredData.length === 0 )
    {
        return (
            <div className="flex flex-1 items-center justify-center h-full">
                <Typography color="textSecondary" variant="h5">
                Aucun enregistrement dans la liste
                </Typography>
            </div>
        );
    }

    return (
        <FuseAnimate animation="transition.slideUpIn" delay={300}>
            <ReactTable
                className="-striped -highlight h-full sm:rounded-16 overflow-hidden"
                getTrProps={(state, rowInfo, column) => {
                    return {
                        className: "cursor-pointer",
                        onClick  : (e, handleOriginal) => {
                            if ( rowInfo )
                            {
                                dispatch(Actions.openEditReferentielDialog(rowInfo.original));
                            }
                        }
                    }
                }}
                data={filteredData}
                columns={[
                    {
                        Header    : "Valeur",
                        accessor  : "value",
                        filterable: true,
                        className : "font-bold"
                    },
                    {
                        Header    : "columnId",
                        accessor  : "columnId",
                        filterable: true,
                        show:false,
                        className : "font-bold"
                    },
                    {
                        Header: "",
                        width : 128,
                        Cell  : row => (
                            <div className="flex items-center">
                                <IconButton
                                    onClick={(ev) => {
                                        ev.stopPropagation();
                                        dispatch(Actions.openEditReferentielDialog(row.original))
                                    }}
                                >

                                        <Icon>edit</Icon>
                                </IconButton>
                                <IconButton
                                    onClick={(ev) => {
                                        ev.stopPropagation();
                                        dispatch(Actions.removeReferentiel(row.original.id));
                                    }}
                                >
                                    <Icon>delete</Icon>
                                </IconButton>
                            </div>
                        )
                    }
                ]}
                defaultPageSize={10}
                noDataText="Aucun enregistrement dans la liste"
            />
        </FuseAnimate>
    );
}

export default ReferentielsList;
