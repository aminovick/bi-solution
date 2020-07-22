import React, { useEffect, useCallback ,useState} from 'react';
import { TextField, Button, Dialog, DialogActions, DialogContent, Typography, Toolbar, AppBar } from '@material-ui/core';
import { useForm } from '@fuse/hooks';
import FuseUtils from '@fuse/FuseUtils';
import * as Actions from './store/actions';
import { useDispatch, useSelector } from 'react-redux';
import PhoneInput from 'react-phone-number-input';


const defaultFormState = {
    id: '',
    nom: '',
    fonction: '',
    service: '',
    adresse: '',
    email:'',
    telephone: ''

};
function SocieteDialog(props) {

    const dispatch = useDispatch();
    const contactDialog = useSelector(({ societeApp }) => societeApp.societes.contactDialog);
    const [setSelectedPhone, selectedPhone] = useState();

    const { form, handleChange, setForm } = useForm(defaultFormState);
    const initDialog = useCallback(
        () => {

            if (contactDialog.type === 'edit' && contactDialog.data) {
                setForm({ ...contactDialog.data });
            }


            if (contactDialog.type === 'new') {
                setForm({
                    ...defaultFormState,
                    ...contactDialog.data,
                    id: FuseUtils.generateGUID()

                });
            }
        },
        [contactDialog.data, contactDialog.type, setForm],
    );

    useEffect(() => {

        if (contactDialog.props.open) {
            initDialog();
        }

    }, [contactDialog.props.open, initDialog]);

    function closeComposeDialog() {
        contactDialog.type === 'edit' ? dispatch(Actions.closeEditContactDialog()) : dispatch(Actions.closeNewContactDialog());
    }

    function canBeSubmitted() {
        return (
            form.value.length > 0
        );
    }

    function handleSubmit(event) {
        event.preventDefault();

        if (contactDialog.type === 'new') {
            dispatch(Actions.addContact(form));
            form.telephone = setSelectedPhone
        }
        else {
            dispatch(Actions.updateContact(form));
            form.telephone = setSelectedPhone
        }
        closeComposeDialog();
    }

    function handleRemove() {
        dispatch(Actions.removeContact(form.id));
        closeComposeDialog();
    }

    return (
        <div>

            <Dialog
                classes={{
                    paper: "m-24"
                }}
                {...contactDialog.props}
                onClose={closeComposeDialog}
                fullWidth
                maxWidth="xs"
            >

                <AppBar position="static" elevation={1}>
                    <Toolbar className="flex w-full">
                        <Typography variant="subtitle1" color="inherit">
                            {contactDialog.type === 'new' ? 'Nouvelle valeur' : 'Modifier une valeur'}
                        </Typography>
                    </Toolbar>
                    <div className="flex flex-col items-center justify-center pb-24">
                        {contactDialog.type === 'edit' && (
                            <Typography variant="h6" color="inherit" className="pt-8">
                                {form.value}
                            </Typography>
                        )}
                    </div>
                </AppBar>
                <form noValidate onSubmit={handleSubmit} className="flex flex-col overflow-hidden">
                    <DialogContent classes={{ root: "p-24" }}>
                        <div className="flex">
                            <TextField
                                className="mb-24"
                                label="Contact"
                                autoFocus
                                id="nom"
                                name="nom"
                                value={form.nom}
                                onChange={handleChange}
                                variant="outlined"
                                required
                                fullWidth
                            />
                        </div>
                        <div className="flex">
                            <TextField
                                className="mb-24"
                                label="Fonction "
                                autoFocus
                                id="fonction"
                                name="fonction"
                                value={form.fonction}
                                onChange={handleChange}
                                variant="outlined"
                                fullWidth
                            />
                        </div>
                        <div className="flex">
                            <TextField
                                className="mb-24"
                                label="Service"
                                autoFocus
                                id="service"
                                name="service"
                                value={form.service}
                                onChange={handleChange}
                                variant="outlined"
                                fullWidth
                            />
                        </div>
                        <div className="flex">
                            <TextField
                                className="mb-24"
                                label="Adresse "
                                autoFocus
                                id="adresse"
                                name="adresse"
                                value={form.adresse}
                                onChange={handleChange}
                                variant="outlined"
                                fullWidth
                            />
                        </div>
                        <div className="flex">
                        <TextField
                                className="mb-24"
                                label="Email "
                                autoFocus
                                id="email"
                                name="email"
                                value={form.email}
                                onChange={handleChange}
                                variant="outlined"
                                fullWidth
                            />
                        </div>
                        <div className="flex">
                                                <PhoneInput
                                                    className="mt-8 mb-16 mr-16"
                                                    placeholder="N° de Téléphone  "
                                                    id="telephone "
                                                    name="telephone"
                                                    value={setSelectedPhone}
                                                    onChange={selectedPhone}

                                                />
                                                </div>

                    </DialogContent>

                    {contactDialog.type === 'new' ? (
                        <DialogActions className="justify-between pl-16">
                            <Button
                                variant="contained"
                                color="primary"
                                onClick={handleSubmit}
                                type="submit"
                            //  disabled={!canBeSubmitted()}
                            >
                                Ajouter
                        </Button>
                        </DialogActions>
                    ) : (
                            <DialogActions className="justify-between pl-16">
                                <Button
                                    variant="contained"
                                    color="primary"
                                    type="submit"
                                    onClick={handleSubmit}
                                //disabled={!canBeSubmitted()}
                                >
                                    Modifier
                        </Button>
                            </DialogActions>
                        )}
                </form>
            </Dialog>
        </div>
    );
}
export default SocieteDialog