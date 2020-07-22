import React, {useEffect, useState} from 'react';
import { Icon, IconButton, Typography,Fab} from '@material-ui/core';
import {FuseUtils, FuseAnimate} from '@fuse';
import {useDispatch, useSelector} from 'react-redux';
import ReactTable from "react-table";
import * as Actions from './store/actions';
import {makeStyles} from '@material-ui/styles';


const useStyles = makeStyles({
    
});
function SocietesList(props)
{
const classes = useStyles(props);
const dispatch = useDispatch();
const [filteredData, setFilteredData] = useState(null);
const contacts = useSelector(({societeApp}) => societeApp.societes.list);
console.log(filteredData)
useEffect(() => {
    function getFilteredArray(entities)
    {
        return Object.keys(entities).map((id) => entities[id]);
    }

    if ( contacts )
    {
        setFilteredData(getFilteredArray(contacts));
    }
}, [contacts]);


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


    return(
        <div>
        <FuseAnimate animation="transition.slideUpIn" delay={300}>
        <ReactTable
            className="-striped -highlight h-full sm:rounded-16 overflow-hidden"
            getTrProps={(state, rowInfo, column) => {
                return {
                    className: "cursor-pointer",
                    onClick  : (e, handleOriginal) => {
                         if ( rowInfo )
                        {
                            dispatch(Actions.openEditContactDialog(rowInfo.original));
                        } 
                    }
                }
            }}
            data={filteredData}
            columns={[
                {
                    id: 'col0',
                    Header    : "Contact ",
                    accessor  : "nom",
                    className : "font-bold",
                    
                },
                {
                    id: 'col1',
                    Header    : "Fonction ",
                    accessor  : "fonction", 
                    className : "font-bold"
                },
                {
                    id: 'col2',
                    Header    : "Service",
                    accessor  : "service",                
                    className : "font-bold"
                },
                {
                    id: 'col3',
                    Header    : "Coordonnées ",
                    accessor  : "coordonnees",
                   className : "font-bold",
                    accessor  : d => {
                    return d.email+" | "+d.telephone
                  },

                },
                {
                    Header: "",
                    width : 128,
                    Cell  : row => (
                        <div className="flex items-center">
                            <IconButton
                                onClick={(ev) => {
                                    ev.stopPropagation();
                                   dispatch(Actions.openEditContactDialog(row.original))
                                }}
                            >

                                    <Icon>edit</Icon>
                            </IconButton>
                            <IconButton
                                onClick={(ev) => {
                                    ev.stopPropagation();
                                   dispatch(Actions.removeContact(row.original.id));
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
    
 </div>
    )
}
export default SocietesList