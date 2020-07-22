import React, {useEffect, useCallback} from 'react';
import {TextField, Button, Dialog, DialogActions, DialogContent,Typography, Toolbar, AppBar} from '@material-ui/core';
import {useForm} from '@fuse/hooks';
import FuseUtils from '@fuse/FuseUtils';
import * as Actions from './store/actions';
import {useDispatch, useSelector} from 'react-redux';

const defaultFormState = {
    id      : '',
    value    : ''
};

function ReferentielsDialog(props)
{
    const dispatch = useDispatch();
    const referentielDialog = useSelector(({referentielsApp}) => referentielsApp.referentiels.referentielDialog);

    const {form, handleChange, setForm} = useForm(defaultFormState);
console.log('foooorm'+form.value)
    const initDialog = useCallback(
        () => {
            /**
             * Dialog type: 'edit'
             */
            if ( referentielDialog.type === 'edit' && referentielDialog.data )
            {
                setForm({...referentielDialog.data});
            }

            /**
             * Dialog type: 'new'
             */
            if ( referentielDialog.type === 'new' )
            {
                setForm({
                    ...defaultFormState,
                    ...referentielDialog.data,
                    id: FuseUtils.generateGUID()
                });
            }
        },[referentielDialog.data, referentielDialog.type, setForm],
    );

    useEffect(() => {
        /**
         * After Dialog Open
         */
        if ( referentielDialog.props.open )
        {
            initDialog();
        }

    }, [referentielDialog.props.open, initDialog]);

    function closeComposeDialog()
    {
        referentielDialog.type === 'edit' ? dispatch(Actions.closeEditReferentielDialog()) : dispatch(Actions.closeNewReferentielDialog());
    }

    function canBeSubmitted()
    {
        return (
            form.value.length > 0
        );
    }

    function handleSubmit(event)
    {
        event.preventDefault();

        if ( referentielDialog.type === 'new' )
        {
            dispatch(Actions.addReferentiel(form));
        }
        else
        {
            dispatch(Actions.updateReferentiel(form));
        }
        closeComposeDialog();
    }

    function handleRemove()
    {
        dispatch(Actions.removeReferentiel(form.id));
        closeComposeDialog();
    }

    return (
        <div>



        <Dialog
            classes={{
                paper: "m-24"
            }}
            {...referentielDialog.props}
            onClose={closeComposeDialog}
            fullWidth
            maxWidth="xs"
        >

            <AppBar position="static" elevation={1}>
                <Toolbar className="flex w-full">
                    <Typography variant="subtitle1" color="inherit">
                        {referentielDialog.type === 'new' ? 'Nouvelle valeur' : 'Modifier une valeur'}
                    </Typography>
                </Toolbar>
                <div className="flex flex-col items-center justify-center pb-24">
                    {referentielDialog.type === 'edit' && (
                        <Typography variant="h6" color="inherit" className="pt-8">
                            {form.value}
                        </Typography>
                    )}
                </div>
            </AppBar>
            <form noValidate onSubmit={handleSubmit} className="flex flex-col overflow-hidden">
                <DialogContent classes={{root: "p-24"}}>
                    <div className="flex">
                        <TextField
                            className="mb-24"
                            label="Valeur"
                            autoFocus
                            id="value"
                            name="value"
                            value={form.value}
                            onChange={handleChange}
                            variant="outlined"
                            required
                            fullWidth
                        />
                    </div>                    
                </DialogContent>

                {referentielDialog.type === 'new' ? (
                    <DialogActions className="justify-between pl-16">
                        <Button
                            variant="contained"
                            color="primary"
                            onClick={handleSubmit}
                            type="submit"
                            disabled={!canBeSubmitted()}
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
                            disabled={!canBeSubmitted()}
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

export default ReferentielsDialog;