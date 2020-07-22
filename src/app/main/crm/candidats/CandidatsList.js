import React, {useEffect, useState} from 'react';
import {Icon, IconButton, Typography} from '@material-ui/core';
import {FuseUtils, FuseAnimate} from '@fuse';
import {useDispatch, useSelector} from 'react-redux';
import { withRouter } from 'react-router-dom';
import ReactTable from "react-table";
import * as Actions from './store/actions';
import moment from 'moment';

function CandidatsList(props)
{
    const dispatch = useDispatch();
    const candidats = useSelector(({CandidatsApp}) => CandidatsApp.candidats.entities);
   
    const searchText = useSelector(({CandidatsApp}) => CandidatsApp.candidats.searchText);

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

        if ( candidats )
        {
            setFilteredData(getFilteredArray(candidats, searchText));
        }
    }, [candidats, searchText]);

    function handleClick(item)
    {
        console.log(item);
        props.history.push('/crm/candidats/' + item.original.id );
    }

    if ( !filteredData )
    {
        return null;
    }

    if ( filteredData.length === 0 )
    {
        return (
            <div className="flex flex-1 items-center justify-center h-full">
                <Typography color="textSecondary" variant="h5">
                    There are no candidats!
                </Typography>
            </div>
        );
    }



    return (
        <FuseAnimate animation="transition.slideUpIn" delay={300}>
            <ReactTable
                className="-striped -highlight  sm:rounded-16 overflow-hidden"
                getTrProps={(state, rowInfo, column) => {
                    return {
                        className: "cursor-pointer",
                        onClick  : (e, handleOriginal) => {
                            if ( rowInfo )
                            {
                                console.log(rowInfo)
                                 handleClick(rowInfo);
                            }
                        }
                    }
                }}
                data={filteredData}
                columns={[
                    {
                        id: 'col0',
                        Header    : "N°",
                        accessor  : "id",
                        filterable: false,
                        show      : false,
                        className : "font-bold"
                    },
                    {
                        id: 'col1',
                        Header    : "Nom complet",
                        accessor  : "fullname",
                        filterable: true,
                        className : "font-bold"
                    },
                    {
                        id: 'col2',
                        Header    : "Titre",
                        accessor  : "titre",
                        filterable: true,
                        className : "font-bold"
                    },
                    {
                        id: 'col3',
                        Header    : "Disponibilité",
                        accessor  : "disponibilite",
                        filterable: true
                    },
                    {
                        id: 'col4',
                        Header    : "Mobilité",
                        accessor  : "mobilite",
                        filterable: true
                    },
                    {
                        id: 'col5',
                        Header    : "Coordonnées",
                        accessor  : d => {
                            return d.email +" | "+d.telephoneMobile
                          },
                        filterable: true
                    },
                    {
                        id: 'col6',
                        Header    : "Etape",
                        accessor  : "statut",
                        filterable: true
                    },
                    {
                        id: 'col7',
                        Header    : "Date de MAJ",
                        accessor  : d => {
                            return moment(d.dateMAJ)
                              .local()
                              .format("DD-MM-YYYY hh:mm:ss")
                          },
                        filterable: true
                    },
                    {
                        id: 'col8',
                        Header: "",
                        width : 128,
                        Cell  : row => (
                            <div className="flex items-center">
                                <IconButton
                                    onClick={(ev) => {
                                        ev.stopPropagation();
                                        dispatch(Actions.removeCandidat(row.original.id));
                                    }}
                                >
                                    <Icon>delete</Icon>
                                </IconButton>
                            </div>
                        )
                    }
                ]}
                defaultPageSize={10}
                noDataText="No candidats found"
            />
        </FuseAnimate>
    );
}

export default withRouter(CandidatsList);
