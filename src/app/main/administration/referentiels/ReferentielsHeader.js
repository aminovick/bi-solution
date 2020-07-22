import React, {useState}  from 'react';
import {Hidden, Icon, IconButton, Input, Paper, Typography, MenuItem, Select,TextField} from '@material-ui/core';
import {ThemeProvider} from '@material-ui/styles';
import {FuseAnimate} from '@fuse';
import {useDispatch, useSelector} from 'react-redux';
import * as Actions from './store/actions';

function ReferentielsHeader(props)
{

    const [selectedEntity,setSelectedEntity] = useState('creapond');

    const dispatch = useDispatch();
    const searchText = useSelector(({referentielsApp}) => referentielsApp.referentiels.searchText);
    const entitiesList = useSelector(({referentielsApp}) => referentielsApp.referentiels.entitiesList);
    const mainTheme = useSelector(({fuse}) => fuse.settings.mainTheme);

    function filterEntity(ev)
    {
        setSelectedEntity(ev.target.value);
        dispatch(Actions.selectEntiteValue(ev.target.value))
    }

    return (
        <div className="flex flex-col justify-center h-full p-24">

            <div className="flex items-center flex-1">
                <FuseAnimate animation="transition.expandIn" delay={300}>
                    <Icon className="text-32 mr-16">check_box</Icon>
                </FuseAnimate>
                <FuseAnimate animation="transition.slideLeftIn" delay={300}>
                    <span className="text-24">Gestion des référentiels</span>
                </FuseAnimate>
            </div>

            <FuseAnimate animation="transition.slideUpIn" delay={300}>
                <TextField
                    id="entity-selection"
                    select
                    label="Liste des entités"
                    value={selectedEntity}
                    onChange={filterEntity}
                    placeholder="Sélectionner une entité"
                    margin="normal"
                >
                    {entitiesList.map((item) => (
                        <MenuItem key={item.id} value={item.id}>
                            {item.name}
                        </MenuItem>
                    ))}
                </TextField>
            </FuseAnimate>
        </div>
    );
}

export default ReferentielsHeader;
