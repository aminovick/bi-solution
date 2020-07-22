import React, { useEffect, useState } from 'react';
import { Button, Select, Tab, Tabs, TextField, Icon, Typography, Checkbox, MenuItem } from '@material-ui/core';
import { FuseUtils, FuseAnimate, FusePageCarded } from '@fuse';
import { useForm } from '@fuse/hooks';
import { Link } from 'react-router-dom';
import _ from '@lodash';
import { useDispatch, useSelector } from 'react-redux';
import withReducer from 'app/store/withReducer';
import * as Actions from './store/actions';
import reducer from './store/reducers';
import ReactTable from "react-table";



function Profile(props) {
    const dispatch = useDispatch();
    const profile = useSelector(({ profileApp }) => profileApp.profile);
    const permissions=useSelector(({ profileApp }) => profileApp.profile.permissions);
    const [data, setData] = useState(permissions);
    const selectedPermissionsIds = useSelector(({profileApp}) => profileApp.profile.selectedPermissionsIds);
    const [tabValue, setTabValue] = useState(0);
    const { form, handleChange, setForm } = useForm(null);
    const selectedModule =useSelector(({ profileApp }) => profileApp.profile.selectedModule);
    const moduleList = useSelector(({profileApp}) => profileApp.profile.modules);
    useEffect(() => {
        function updateProfileState() {
            const params = props.match.params;
            const { profileId } = params;

            if (profileId === 'new') {
                dispatch(Actions.newProfile());
            }
            else {
                dispatch(Actions.getProfile(props.match.params));
            }
            dispatch(Actions.getPermissions());
            dispatch(Actions.getModules());
            
        }
      
        updateProfileState();
    }, [dispatch, props.match.params]);

    useEffect(() => {
        if (
            (profile.data && !form) ||
            (profile.data && form && profile.data.id !== form.id)
        ) {
            setForm(profile.data);
        }
    }, [form, profile.data, setForm]);

    useEffect(() => {
        setData(selectedModule == null ? permissions : _.filter(permissions, item => item.moduleId==selectedModule))
    }, [permissions, selectedModule]);

    function handleChangeTab(event, tabValue) {
        setTabValue(tabValue);
    }

    function filterModule(ev)
    {
        dispatch(Actions.selectModule(ev.target.value));
    }

    function canBeSubmitted() {
        return (
            form.name.length > 0 &&
            !_.isEqual(profile.data, form)
        );
    }



    return (
        <FusePageCarded
            classes={{
                toolbar: "p-0",
                header: "min-h-72 h-72 sm:h-136 sm:min-h-136"
            }}
            header={
                form && (
                    <div className="flex flex-1 w-full items-center justify-between">

                        <div className="flex flex-col items-start max-w-full">

                            <FuseAnimate animation="transition.slideRightIn" delay={300}>
                                <Typography className="normal-case flex items-center sm:mb-12" component={Link} role="button" to="/administration/profiles" color="inherit">
                                    <Icon className="mr-4 text-20">arrow_back</Icon>
                                    Profiles
                                </Typography>
                            </FuseAnimate>
                        </div>
                        <FuseAnimate animation="transition.slideRightIn" delay={300}>
                            <Button
                                className="whitespace-no-wrap"
                                variant="contained"
                                disabled={!canBeSubmitted()}
                                onClick={() => dispatch(Actions.saveProfile(form,selectedPermissionsIds))}
                            >
                                Save
                            </Button>
                        </FuseAnimate>
                    </div>
                )
            }
            contentToolbar={
                <Tabs
                    value={tabValue}
                    onChange={handleChangeTab}
                    indicatorColor="secondary"
                    textColor="secondary"
                    variant="scrollable"
                    scrollButtons="auto"
                    classes={{ root: "w-full h-64" }}
                >
                    <Tab className="h-64 normal-case" label="Basic Info" />
                </Tabs>
            }
            content={
                form && (
                    <div className="p-16 sm:p-24 max-w-2xl">
                        {tabValue === 0 &&
                            (
                                <div>

                                    <TextField
                                        className="mt-8 mb-16"
                                        error={form.name === ''}
                                        required
                                        label="Name"
                                        autoFocus
                                        id="name"
                                        name="name"
                                        value={form.name}
                                        onChange={handleChange}
                                        variant="outlined"
                                        fullWidth
                                    />

                                    <TextField
                                        className="mt-8 mb-16"
                                        id="description"
                                        name="description"
                                        onChange={handleChange}
                                        label="Description"
                                        type="text"
                                        value={form.description}
                                        multiline
                                        rows={5}
                                        variant="outlined"
                                        fullWidth
                                    />
                                <div className="flex items-center flex-1">
                                            <FuseAnimate animation="transition.slideLeftIn" delay={300}>
                                                <span className="text-16">Permissions</span>
                                            </FuseAnimate>
                                        </div>
                                
                                    <Select
                                    className="mt-8 mb-16"  
                                    id="entity-selection"
                                    label="Liste des Modules" 
                                        value={selectedModule}
                                        onChange={filterModule}
                                        >
                                        {moduleList.map((item) => (
                                            <MenuItem key={item.id} value={item.id}>
                                                {item.name}
                                            </MenuItem>
                                        ))}
                                        </Select>

                                    <FuseAnimate animation="transition.slideUpIn" delay={300}>
                                        <ReactTable
                                            className="-striped -highlight h-full sm:rounded-16 overflow-hidden"
                                            data={data}
                                            columns={[
                                                {
                                                    Header   : () => (
                                                        <Checkbox
                                                            onClick={(event) => {
                                                                event.stopPropagation();
                                                            }}
                                                            onChange={(event) => {
                                                                event.target.checked ? dispatch(Actions.selectAllPermissions()) : dispatch(Actions.deSelectAllPermissions());
                                                            }}
                                                            checked={selectedPermissionsIds.length === Object.keys(data).length && selectedPermissionsIds.length > 0}
                                                            indeterminate={selectedPermissionsIds.length !== Object.keys(profile.permissions).length && selectedPermissionsIds.length > 0}
                                                        />
                                                    ),
                                                    accessor : "",
                                                    Cell     : row => {
                                                        return (<Checkbox
                                                                onClick={(event) => {
                                                                    event.stopPropagation();
                                                                }}
                                                                checked={selectedPermissionsIds.includes(row.value.id)}
                                                                onChange={() => dispatch(Actions.toggleInSelectedPermissions(row.value.id))}
                                                            />
                                                        )
                                                    },
                                                    className: "justify-center",
                                                    sortable : false,
                                                    width    : 64
                                                },
                                                {
                                                    Header: "Permission",
                                                    accessor: "name",
                                                    filterable: false,
                                                    className: "font-bold"
                                                },
                                                {
                                                    Header: "columnId",
                                                    accessor: "id",
                                                    filterable: false,
                                                    show: false,
                                                    className: "font-bold"
                                                }
                                            ]}
                                            defaultPageSize={10}
                                            noDataText="Aucun enregistrement dans la liste"
                                        />
                                    </FuseAnimate>
                                </div>

                            )}

                    </div>
                )

            }
            innerScroll
        />
    )
}

export default withReducer('profileApp', reducer)(Profile);
