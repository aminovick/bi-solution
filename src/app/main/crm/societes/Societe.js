import React, { useEffect, useState } from 'react';
import { Button, Select, Tab, Tabs, TextField, Icon, Typography, Checkbox, MenuItem, Fab } from '@material-ui/core';
import { FuseUtils, FuseAnimate, FusePageCarded } from '@fuse';
import { useForm } from '@fuse/hooks';
import { Link } from 'react-router-dom';
import _ from '@lodash';
import { useDispatch, useSelector } from 'react-redux';
import withReducer from 'app/store/withReducer';
import reducer from './store/reducers';
import * as Actions from './store/actions';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import { makeStyles } from '@material-ui/core/styles';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import 'react-phone-number-input/style.css'
import PhoneInput from 'react-phone-number-input';
import SocietesList from './SocietesList';
import SocieteDialog from './SocieteDialog'

const useStyles = makeStyles(theme => ({
    card: {
        minWidth: 275,
    },
    bullet: {
        display: 'inline-block',
        margin: '0 2px',
        transform: 'scale(0.8)',
    },
    title: {
        fontSize: 14,
    },
    pos: {
        marginBottom: 12,
    },
    formControl: {
        margin: theme.spacing(1),
        minWidth: 505,
    },
    addButton: {
        position: 'absolute',
        right: 500,
        bottom: 8,
        zIndex: 99,
        top: 20,

    }
}));


function Societe(props) {
    const classes = useStyles();
    const dispatch = useDispatch();
    const inputLabel = React.useRef(null);
    const [tabValue, setTabValue] = useState(0);
    const { form, handleChange, setForm } = useForm(null);
    const [labelWidth, setLabelWidth] = React.useState(0);
    const societe = useSelector(({ societeApp }) => societeApp.societe);
    const secteur = useSelector(({ societeApp }) => societeApp.societe.secteurList);
    const selectedSecteur = useSelector(({ societeApp }) => societeApp.societe.selectedSecteur);
    const prevenances = useSelector(({ societeApp }) => societeApp.societe.prevenanceList)
    const selectedProvenance = useSelector(({ societeApp }) => societeApp.societe.selectePrevenance);
    const selectedVille = useSelector(({ societeApp }) => societeApp.societe.selectedVille);
    const villes = useSelector(({ societeApp }) => societeApp.societe.villeList)
    const selectedPays = useSelector(({ societeApp }) => societeApp.societe.selectedPays);
    const pays = useSelector(({ societeApp }) => societeApp.societe.paysList);
    const selectedSocieteMere = useSelector(({ societeApp }) => societeApp.societe.selectedSocieteMere);
    const selectedEtat = useSelector(({ societeApp }) => societeApp.societe.selectedEtat);
    const etat = useSelector(({ societeApp }) => societeApp.societe.etatList)
    const societeMere = useSelector(({ societeApp }) => societeApp.societe.societeMereList);
    const listContact = useSelector(({ societeApp }) => societeApp.societes.list);
    const [setSelectedFax, selectedFax] = useState();
    const [setSelectedPhone, selectedPhone] = useState();

    console.log(listContact)
    useEffect(() => {

        dispatch(Actions.getContacts(props.match.params));

    }, [dispatch, props.match.params]);

    useEffect(() => {

        dispatch(Actions.getSocieteMere());

    }, [dispatch, props.match.params]);

    useEffect(() => {

        dispatch(Actions.getProvenance());

    }, [dispatch, props.match.params]);

    useEffect(() => {

        dispatch(Actions.getVille());

    }, [dispatch, props.match.params]);
    useEffect(() => {

        dispatch(Actions.getPays());

    }, [dispatch, props.match.params]);
    useEffect(() => {

        dispatch(Actions.getEtat());

    }, [dispatch, props.match.params]);
    useEffect(() => {

        dispatch(Actions.getsecteurActivite());

    }, [dispatch, props.match.params]);

    useEffect(() => {
        function updateSocieteState() {
            const params = props.match.params;
            const { societeId } = params;

            if (societeId === 'new') {
                dispatch(Actions.newSociete());

            }
            else {
                dispatch(Actions.getSociete(props.match.params));


            }
        }

        updateSocieteState();

    }, [dispatch, props.match.params]);

    useEffect(() => {
        if (
            (societe.data && !form)

        ) {
            setForm(societe.data);
            console.log(societe)
            if (societe.data.payes != null)
                dispatch(Actions.selectedPays(societe.data.payes.id));
            if (societe.data.sercteurActivite != null)
                dispatch(Actions.selectSecteur(societe.data.sercteurActivite.id))
            dispatch(Actions.selectProvenance(societe.data.provenance.id))
            dispatch(Actions.selectVille(societe.data.ville.id))
            dispatch(Actions.selectedSocieteMere(societe.data.societeMere.id))
            if (societe.data.etat != null)
                dispatch(Actions.selectedEtat(societe.data.etat.id))

        }



    }, [form, societe.data, setForm]);

    function handleChangeTab(event, tabValue) {
        setTabValue(tabValue);


    }
    function filterSecteur(ev) {

        dispatch(Actions.selectSecteur(ev.target.value));
        console.log(ev.target.value)

    }

    function filterProvenance(ev) {
        dispatch(Actions.selectProvenance(ev.target.value));

    }
    function filterVille(ev) {
        dispatch(Actions.selectVille(ev.target.value));
    }
    function filterPays(ev) {
        dispatch(Actions.selectedPays(ev.target.value));

    }
    function filtersocieteMere(ev) {
        dispatch(Actions.selectedSocieteMere(ev.target.value));
    }
    function filterEtat(ev) {
        dispatch(Actions.selectedEtat(ev.target.value))
    }

    function handleSubmit(event) {
        event.preventDefault();
        const newSociete = form
        newSociete.contacts = listContact
        dispatch(Actions.saveSociete(newSociete))
        form.selectedSecteur = selectedSecteur
        form.selectedProvenance = selectedProvenance
        form.setSelectedPhone = setSelectedPhone
        form.setSelectedFax = setSelectedFax
        form.selectedVille = selectedVille
        form.selectedSocieteMere = selectedSocieteMere
        form.selectedPays = selectedPays
        form.selectedEtat = selectedEtat

    }
    function canBeSubmitted() {
        return (
            form.societe.length > 0
        );
    };

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
                                <Typography className=" text-16 sm:text-20 truncate" component={Link} role="button" to="/crm/societes" color="inherit">
                                    <Icon className="mr-4 text-20">arrow_back</Icon>
                                    <i className="material-icons">group</i> Societes
                            </Typography>
                            </FuseAnimate>

                            <div className="flex items-center max-w-full">

                                <div className="flex flex-col min-w-0">
                                    <FuseAnimate animation="transition.slideLeftIn" delay={300}>
                                        <Typography className="normal-case flex items-center sm:mb-12">
                                            Gestion des Societes
                                    </Typography>
                                    </FuseAnimate>
                                </div>
                            </div>
                        </div>
                        <FuseAnimate animation="transition.slideRightIn" delay={300} >

                            <Button
                                className="whitespace-no-wrap"
                                variant="contained"
                                disabled={!canBeSubmitted}
                                onClick={(handleSubmit)}
                            >
                                Enregistrer
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
                    <Tab className="h-64 normal-case" label=" Fiche Societes" />
                    <Tab className="h-64 normal-case" label="  Liste des contacts" />

                </Tabs>
            }
            content={
                form && (
                    <div className="p-16 sm:p-24 max-w-2xl">
                        {tabValue === 0 &&
                            (
                                <div>
                                    <Card className={classes.card}>
                                        <CardContent>
                                            <Typography className={classes.title} color="textSecondary" gutterBottom>
                                                Informations du Societe:
                                             </Typography>
                                            <div className="flex">
                                                <TextField
                                                    className="mt-8 mb-16 mr-8"
                                                    required
                                                    label="Société  "
                                                    autoFocus
                                                    id="nom "
                                                    name="nom"
                                                    value={form.nom}
                                                    onChange={handleChange}
                                                    variant="outlined"
                                                    fullWidth
                                                />
                                                <FormControl className={classes.formControl}>
                                                    <InputLabel ref={inputLabel} htmlFor="outlined-selectedSecteur-simple">
                                                        Secteur d'activité
                                                </InputLabel>
                                                    <Select

                                                        value={selectedSecteur}
                                                        onChange={filterSecteur}
                                                        input={<OutlinedInput labelWidth={labelWidth}
                                                            name="selectedSecteur"
                                                            id="outlined-selectedSecteur-simple"
                                                        />
                                                        }
                                                    >
                                                        {secteur.map((item) => (
                                                            <MenuItem key={item.id} value={item.id}>
                                                                {item.nom}
                                                            </MenuItem>
                                                        ))}
                                                    </Select>
                                                </FormControl>
                                            </div>
                                            <div className="flex">
                                                <FormControl className={classes.formControl}>
                                                    <InputLabel ref={inputLabel} htmlFor="outlined-age-simple">
                                                        Société Mère
                                                </InputLabel>
                                                    <Select
                                                        select
                                                        value={selectedSocieteMere}
                                                        onChange={filtersocieteMere}
                                                        input={<OutlinedInput labelWidth={labelWidth}
                                                            name="provenance"
                                                            id="outlined-age-simple"
                                                        />
                                                        }
                                                    >
                                                        {societeMere.map((item) => (
                                                            <MenuItem key={item.id} value={item.id}>
                                                                {item.nom}
                                                            </MenuItem>
                                                        ))}
                                                    </Select>

                                                </FormControl>
                                                <FormControl className={classes.formControl}>
                                                    <InputLabel ref={inputLabel} htmlFor="outlined-age-simple">
                                                        Provenance
                                                </InputLabel>
                                                    <Select

                                                        select
                                                        value={selectedProvenance}
                                                        onChange={filterProvenance}
                                                        input={<OutlinedInput labelWidth={labelWidth}
                                                            name="provenance"
                                                            id="outlined-age-simple"
                                                        />
                                                        }
                                                    >
                                                        {prevenances.map((item) => (
                                                            <MenuItem key={item.id} value={item.id}>
                                                                {item.nom}
                                                            </MenuItem>
                                                        ))}
                                                    </Select>
                                                </FormControl>
                                            </div>
                                            <div className="flex">
                                                <FormControl className={classes.formControl}>
                                                    <InputLabel ref={inputLabel} htmlFor="outlined-age-simple">
                                                        Etat
                                                </InputLabel>
                                                    <Select
                                                        select
                                                        value={selectedEtat}
                                                        onChange={filterEtat}
                                                        input={<OutlinedInput labelWidth={labelWidth}
                                                            name="etat"
                                                            id="outlined-age-simple"
                                                        />
                                                        }
                                                    >
                                                        {etat.map((item) => (
                                                            <MenuItem key={item.id} value={item.id}>
                                                                {item.nom}
                                                            </MenuItem>
                                                        ))}
                                                    </Select>
                                                </FormControl>
                                                <TextField
                                                    className="mt-8 mb-16"
                                                    id="informations"
                                                    name="informations"
                                                    onChange={handleChange}
                                                    label="Informations"
                                                    type="text"
                                                    value={form.informations}
                                                    multiline
                                                    rows={5}
                                                    variant="outlined"
                                                    fullWidth
                                                />
                                            </div>
                                        </CardContent>
                                    </Card>
                                    <Card className={classes.card}>
                                        <CardContent>
                                            <Typography className={classes.title} color="textSecondary" gutterBottom>
                                                Informations légales:
                                             </Typography>
                                            <div className="flex">
                                                <TextField
                                                    className="mt-8 mb-16 mr-8"
                                                    label="TVA  "
                                                    autoFocus
                                                    id="tva "
                                                    name="tva"
                                                    value={form.tva}
                                                    onChange={handleChange}
                                                    variant="outlined"
                                                    fullWidth
                                                />
                                                <TextField
                                                    className="mt-8 mb-16 mr-8"
                                                    label="Siret  "
                                                    autoFocus
                                                    id="siret "
                                                    name="siret"
                                                    value={form.siret}
                                                    onChange={handleChange}
                                                    variant="outlined"
                                                    fullWidth
                                                />
                                            </div>
                                            <div className="flex">
                                                <TextField
                                                    className="mt-8 mb-16 mr-8"
                                                    label="Statut juridique  "
                                                    autoFocus
                                                    id="statutJuridique "
                                                    name="statutJuridique"
                                                    value={form.statutJuridique}
                                                    onChange={handleChange}
                                                    variant="outlined"
                                                    fullWidth
                                                />
                                                <TextField
                                                    className="mt-8 mb-16 mr-8"
                                                    label="RCS  "
                                                    autoFocus
                                                    id="rcs "
                                                    name="rcs"
                                                    value={form.rcs}
                                                    onChange={handleChange}
                                                    variant="outlined"
                                                    fullWidth
                                                />
                                            </div>
                                        </CardContent>
                                    </Card>
                                    <Card className={classes.card}>
                                        <CardContent>
                                            <Typography className={classes.title} color="textSecondary" gutterBottom>
                                                Coordonnées:
                                             </Typography>
                                            <div className="flex">
                                                <FormControl className={classes.formControl}>
                                                    <InputLabel ref={inputLabel} htmlFor="outlined-age-simple">
                                                        Pays
                                                </InputLabel>
                                                    <Select
                                                        select
                                                        value={selectedPays}
                                                        onChange={filterPays}
                                                        input={<OutlinedInput labelWidth={labelWidth}
                                                            name="pays"
                                                            id="outlined-age-simple"
                                                        />
                                                        }
                                                    >
                                                        {pays.map((item) => (
                                                            <MenuItem key={item.id} value={item.id}>
                                                                {item.nom}
                                                            </MenuItem>
                                                        ))}
                                                    </Select>
                                                </FormControl>
                                                <FormControl className={classes.formControl}>
                                                    <InputLabel ref={inputLabel} htmlFor="outlined-age-simple">
                                                        Ville
                                                </InputLabel>
                                                    <Select
                                                        select
                                                        value={selectedVille}
                                                        onChange={filterVille}
                                                        input={<OutlinedInput labelWidth={labelWidth}
                                                            name="villes"
                                                            id="outlined-age-simple"
                                                        />
                                                        }
                                                    >
                                                        {villes.map((item) => (
                                                            <MenuItem key={item.id} value={item.id}>
                                                                {item.nom}
                                                            </MenuItem>
                                                        ))}
                                                    </Select>
                                                </FormControl>

                                            </div>
                                            <div className="flex">

                                                <TextField
                                                    className="mt-8 mb-16 mr-8"
                                                    label="Adresse   "
                                                    autoFocus
                                                    id="adresse "
                                                    name="adresse"
                                                    value={form.adresse}
                                                    onChange={handleChange}
                                                    variant="outlined"
                                                    fullWidth
                                                />
                                                <TextField
                                                    className="mt-8 mb-16 mr-8"
                                                    label="Code postal  "
                                                    id="codePostal "
                                                    name="codePostal"
                                                    value={form.codePostal}
                                                    onChange={handleChange}
                                                    variant="outlined"
                                                    fullWidth
                                                    onInput={(e) => {
                                                        e.target.value = Math.max(0, parseInt(e.target.value)).toString().slice(0, 5)
                                                    }}
                                                    min={0}
                                                    type="number"
                                                />
                                                <TextField
                                                    className="mt-8 mb-16 mr-8"
                                                    label="Site web  "
                                                    autoFocus
                                                    id="siteWeb "
                                                    name="siteWeb"
                                                    value={form.siteWeb}
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
                                                    value={form.telephone}
                                                    onChange={selectedPhone}

                                                />
                                                <PhoneInput
                                                    className="mt-8 mb-16 mr-16"
                                                    id="fax "
                                                    placeholder="N° de FAX"
                                                    name="fax"
                                                    value={form.fax}
                                                    onChange={selectedFax}

                                                />
                                            </div>
                                        </CardContent>
                                    </Card>
                                </div>


                            )}
                        {tabValue === 1 &&
                            (

                                <React.Fragment>
                                    <SocietesList />
                                    <FuseAnimate animation="transition.expandIn" delay={300}>
                                        <Fab
                                            color="primary"
                                            aria-label="add"
                                            className={classes.addButton}
                                            //     disabled={enableNewReferentielDialog()}
                                            onClick={ev => dispatch(Actions.openNewContact())}
                                        >

                                            <Icon>add</Icon>
                                        </Fab>
                                    </FuseAnimate>
                                    <SocieteDialog />
                                </React.Fragment>

                            )}

                    </div>

                )
            }


        />
    )
}
export default withReducer('societeApp', reducer)(Societe);