import React, { useCallback, useEffect, useState } from 'react';
import {
    TextField,
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    FormControl,
    Chip,
    Icon,
    IconButton,
    Typography,
    Toolbar,
    AppBar,
    Avatar,
    Checkbox,
    Menu,
    MenuItem,
    ListItemIcon,
    ListItemText,
    Divider,
    Select
} from '@material-ui/core';
import amber from '@material-ui/core/colors/amber';
import red from '@material-ui/core/colors/red';
import { FuseUtils } from '@fuse';
import { useForm } from '@fuse/hooks';
import { useDispatch, useSelector } from 'react-redux';
import moment from 'moment/moment';
import _ from '@lodash';
import * as Actions from './store/actions';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import InputLabel from '@material-ui/core/InputLabel';
import { makeStyles } from '@material-ui/core/styles';
const defaultFormState = {
    'id': '',
    'titre': '',
    'notes': '',
    'selectedResponsable': '',
    'dateDebut': new Date(),
    'DateEcheance': new Date(),
    'completed': false,
    'starred': false,
    'important': false,
    'deleted': false,
    'labels': []
};
function ActionDialog(props) {
    const inputLabel = React.useRef(null);
    const dispatch = useDispatch();
    const actionDialog = useSelector(({ actionApp }) => actionApp.action.actionDialog);
    const labels = useSelector(({ actionApp }) => actionApp.labels);
    const selectedResponsable = useSelector(({ actionApp }) => actionApp.users.selectedUser);
    const [labelMenuEl, setLabelMenuEl] = useState(null);
    const { form, handleChange, setForm } = useForm({ ...defaultFormState });
    const dateDebut = moment(form.dateDebut).format(moment.HTML5_FMT.DATETIME_LOCAL_SECONDS);
    const DateEcheance = moment(form.DateEcheance).format(moment.HTML5_FMT.DATETIME_LOCAL_SECONDS);
    const responsable = useSelector(({ actionApp }) => actionApp.users.data);
    console.log('selectedResponsable' + selectedResponsable)
    const [labelWidth, setLabelWidth] = React.useState(0);

    useEffect(() => {
        dispatch(Actions.getUsers());

    });
    const initDialog = useCallback(
        () => {
            /**
             * Dialog type: 'edit'
             */
            if (actionDialog.type === 'edit' && actionDialog.data) {
                setForm({ ...actionDialog.data });
            }

            /**
             * Dialog type: 'new'
             */
            if (actionDialog.type === 'new') {
                setForm({
                    ...defaultFormState,
                    ...actionDialog.data,
                    id: FuseUtils.generateGUID()
                });
            }
        },
        [actionDialog.data, actionDialog.type, setForm]
    );
    function filterResponsable(ev) {
        dispatch(Actions.selectUser(ev.target.value));
    }

    useEffect(() => {
        /**
         * After Dialog Open
         */

        if (actionDialog.props.open) {
            initDialog();
        }

    }, [actionDialog.props.open, initDialog]);

    function closeActionDialog() {
        actionDialog.type === 'edit' ? dispatch(Actions.closeEditActionDialog()) : dispatch(Actions.closeNewActionDialog());
    }

    function handleLabelMenuOpen(event) {
        setLabelMenuEl(event.currentTarget);
    }

    function handleLabelMenuClose(event) {
        setLabelMenuEl(null);
    }

    function handleToggleImportant() {
        setForm({
            ...form,
            important: !form.important
        });
    }

    function handleToggleStarred() {
        setForm({
            ...form,
            starred: !form.starred
        });
    }

    function handleToggleLabel(event, id) {
        event.stopPropagation();
        setForm(
            _.set({
                ...form,
                labels: form.labels.includes(id) ? form.labels.filter(labelId => labelId !== id) : [...form.labels, id]
            })
        );
    }

    function toggleCompleted() {
        setForm({
            ...form,
            completed: !form.completed
        })
    }

    function canBeSubmitted() {
        return (
            form.titre.length > 0
        );
    }
    function handleSubmit(event) {
        event.preventDefault();
        dispatch(Actions.addAction(form))
        form.selectedResponsable = selectedResponsable
        closeActionDialog();

    }

    return (
        <Dialog {...actionDialog.props} onClose={closeActionDialog} fullWidth maxWidth="sm">

            <AppBar position="static" elevation={1}>
                <Toolbar className="flex w-full">
                    <Typography variant="subtitle1" color="inherit">
                        {actionDialog.type === 'new' ? 'New Action' : 'Edit Action'}
                    </Typography>
                </Toolbar>
            </AppBar>

            <DialogContent classes={{ root: "p-0" }}>

                <div className="mb-16">
                    <div className="flex items-center justify-between p-12">

                        <div className="flex">
                            <Checkbox
                                tabIndex={-1}
                                checked={form.completed}
                                onChange={toggleCompleted}
                                onClick={(ev) => ev.stopPropagation()}
                            />
                        </div>

                        <div className="flex items-center justify-start" aria-label="Toggle star">
                            <IconButton onClick={handleToggleImportant}>
                                {form.important ? (
                                    <Icon style={{ color: red[500] }}>error</Icon>
                                ) : (
                                        <Icon>error_outline</Icon>
                                    )}
                            </IconButton>

                            <IconButton onClick={handleToggleStarred}>
                                {form.starred ? (
                                    <Icon style={{ color: amber[500] }}>star</Icon>
                                ) : (
                                        <Icon>star_outline</Icon>
                                    )}
                            </IconButton>
                            <div>
                                <IconButton
                                    aria-owns={labelMenuEl ? 'label-menu' : null}
                                    aria-haspopup="true"
                                    onClick={handleLabelMenuOpen}
                                >
                                    <Icon>label</Icon>
                                </IconButton>
                                <Menu
                                    id="label-menu"
                                    anchorEl={labelMenuEl}
                                    open={Boolean(labelMenuEl)}
                                    onClose={handleLabelMenuClose}
                                >
                                    {labels.length > 0 && labels.map((label) => (
                                        <MenuItem onClick={(ev) => handleToggleLabel(ev, label.id)} key={label.id}>
                                            <ListItemIcon className="min-w-40">
                                                <Icon className="mr-0" color="action">
                                                    {form.labels.includes(label.id) ? 'check_box' : 'check_box_outline_blank'}
                                                </Icon>
                                            </ListItemIcon>
                                            <ListItemText primary={label.titre} disableTypography={true} />
                                            <ListItemIcon className="min-w-40">
                                                <Icon className="mr-0" style={{ color: label.color }} color="action">
                                                    label
                                                </Icon>
                                            </ListItemIcon>
                                        </MenuItem>
                                    ))}
                                </Menu>
                            </div>
                        </div>
                    </div>
                    <Divider className="mx-24" />
                </div>

                {form.labels.length > 0 && (
                    <div className="flex flex-wrap  px-16 sm:px-24 mb-16">
                        {form.labels.map(label => (
                            <Chip
                                avatar={(
                                    <Avatar
                                        classes={{ colorDefault: "bg-transparent" }}>
                                        <Icon
                                            className="text-20"
                                            style={{ color: _.find(labels, { id: label }).color }}
                                        >
                                            label
                                        </Icon>
                                    </Avatar>
                                )}
                                label={_.find(labels, { id: label }).titre}
                                onDelete={(ev) => handleToggleLabel(ev, label)}
                                className="mr-8 my-8"
                                classes={{ label: "pl-4" }}
                                key={label}
                            />
                        ))}
                    </div>
                )}

                <div className="px-16 sm:px-24">
                    <FormControl className="mt-8 mb-16" required fullWidth>
                        <TextField
                            label="Titre"
                            autoFocus
                            name="titre"
                            value={form.titre}
                            onChange={handleChange}
                            required
                            variant="outlined"
                        />
                    </FormControl>
                    <FormControl className="mt-8 mb-16" required fullWidth>
                        <InputLabel ref={inputLabel} htmlFor="outlined-selectedResponsable-simple">
                            Responsable
                                                </InputLabel>
                        <Select

                            value={selectedResponsable}
                            onChange={filterResponsable}
                            input={<OutlinedInput labelWidth={labelWidth}
                                name="selectedResponsable"
                                id="outlined-selectedResponsable-simple"
                            />
                            }
                        >
                            {responsable.map((item) => (
                                <MenuItem key={item.id} value={item.username}>
                                    {item.username}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                    <FormControl className="mt-8 mb-16" required fullWidth>
                        <TextField
                            label="Notes"
                            name="notes"
                            multiline
                            rows="6"
                            value={form.notes}
                            onChange={handleChange}
                            variant="outlined"
                        />
                    </FormControl>
                    <div className="flex">
                        <TextField
                            name="dateDebut"
                            label="Date Debut"
                            type="datetime-local"
                            className="mt-8 mb-16 mr-8"
                            InputLabelProps={{
                                shrink: true
                            }}
                            inputProps={{
                                max: DateEcheance,
                                readOnly: true
                            }}
                            value={dateDebut}
                            onChange={handleChange}
                            variant="outlined"
                        />
                        <TextField
                            name="DateEcheance"
                            label="Date d'échéance"
                            type="datetime-local"
                            className="mt-8 mb-16 ml-8"
                            InputLabelProps={{
                                shrink: true
                            }}
                            inputProps={{
                                min: dateDebut
                            }}
                            value={DateEcheance}
                            onChange={handleChange}
                            variant="outlined"
                        />
                    </div>
                </div>

            </DialogContent>

            {actionDialog.type === 'new' ? (
                <DialogActions className="justify-between pl-8 sm:pl-16">
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={(handleSubmit)}
                        disabled={!canBeSubmitted()}
                    >
                        Ajouter
                    </Button>
                </DialogActions>
            ) : (
                    <DialogActions className="justify-between pl-8 sm:pl-16">
                        <Button
                            variant="contained"
                            color="primary"
                            onClick={() => {
                                dispatch(Actions.updateAction(form));
                                closeActionDialog();
                            }}
                            onClick={(handleSubmit)}
                            disabled={!canBeSubmitted()}
                        >
                            Save
                    </Button>
                        <IconButton
                            className="min-w-auto"
                            onClick={() => {
                                dispatch(Actions.removeAction(form.id));
                                closeActionDialog();
                            }}
                        >
                            <Icon>delete</Icon>
                        </IconButton>
                    </DialogActions>
                )}
        </Dialog>
    );
}

export default ActionDialog;
