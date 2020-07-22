import React, {useEffect, useState} from 'react';

import {Button, Tab, Tabs, TextField, InputLabel , Icon, Typography} from '@material-ui/core';
import {orange} from '@material-ui/core/colors';
import {makeStyles,useTheme} from '@material-ui/styles';
import { withStyles } from '@material-ui/core/styles';
import {FuseAnimate, FusePageCarded} from '@fuse';
import {useForm} from '@fuse/hooks';
import {Link} from 'react-router-dom';
import _ from '@lodash';
import {useDispatch, useSelector} from 'react-redux';
import withReducer from 'app/store/withReducer';
import * as Actions from './store/actions';
import reducer from './store/reducers';
import FormLabel from '@material-ui/core/FormLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import InputBase from '@material-ui/core/InputBase';

const BootstrapInput = withStyles(theme => ({
    root: {
      'label + &': {
        marginTop: theme.spacing(3),
      },
    },
    input: {
      borderRadius: 4,
      position: 'relative',
      backgroundColor: theme.palette.background.paper,
      border: '1px solid #ced4da',
      fontSize: 16,
      width: 'auto',
      padding: '10px 26px 10px 12px',
      transition: theme.transitions.create(['border-color', 'box-shadow']),
      // Use the system font instead of the default Roboto font.
      fontFamily: [
        '-apple-system',
        'BlinkMacSystemFont',
        '"Segoe UI"',
        'Roboto',
        '"Helvetica Neue"',
        'Arial',
        'sans-serif',
        '"Apple Color Emoji"',
        '"Segoe UI Emoji"',
        '"Segoe UI Symbol"',
      ].join(','),
      '&:focus': {
        borderRadius: 4,
        borderColor: '#80bdff',
        boxShadow: '0 0 0 0.2rem rgba(0,123,255,.25)',
      },
    },
  }))(InputBase);

const useStyles = makeStyles(theme => ({

      root: {
        display: 'flex',
        flexWrap: 'wrap',
      },
      formControl: {
        margin: theme.spacing(1),
        minWidth: 120,
      },
      selectEmpty: {
        marginTop: theme.spacing(2),
      },
   
}));

function Candidat(props)
{
    const dispatch = useDispatch();
    const candidat = useSelector(({candidatApp}) => candidatApp.candidat);
    
    const situationFList = useSelector(({candidatApp}) => candidatApp.candidat.situationFList);
    const selectedSituationF =useSelector(({ candidatApp }) => candidatApp.candidat.selectedSituationF);
    const nationaliteList = useSelector(({candidatApp}) => candidatApp.candidat.nationaliteList);
    const selectedNationalite =useSelector(({ candidatApp }) => candidatApp.candidat.selectedNationalite);
    const mobiliteList = useSelector(({candidatApp}) => candidatApp.candidat.mobiliteList);
    const selectedMobilite =useSelector(({ candidatApp }) => candidatApp.candidat.selectedMobilite);
    const disponibiliteList = useSelector(({candidatApp}) => candidatApp.candidat.disponibiliteList);
    const selectedDisponibilite =useSelector(({ candidatApp }) => candidatApp.candidat.selectedDisponibilite);
    
    const provenanceList = useSelector(({candidatApp}) => candidatApp.candidat.provenanceList);
    const selectedProvenance =useSelector(({ candidatApp }) => candidatApp.candidat.selectedProvenance);
    
    const responsableList = useSelector(({candidatApp}) => candidatApp.candidat.responsableList);
    const selectedResponsable =useSelector(({ candidatApp }) => candidatApp.candidat.selectedResponsable);
    
    const paysList = useSelector(({candidatApp}) => candidatApp.candidat.situationFList);
    const selectedPays =useSelector(({ candidatApp }) => candidatApp.candidat.selectedSituationF);
    
    const villeList = useSelector(({candidatApp}) => candidatApp.candidat.situationFList);
    const selectedVille =useSelector(({ candidatApp }) => candidatApp.candidat.selectedSituationF);
    
    const diplomeList = useSelector(({candidatApp}) => candidatApp.candidat.diplomeList);
    const selectedDiplomes =useSelector(({ candidatApp }) => candidatApp.candidat.selectedDiplomes);

    const experienceList = useSelector(({candidatApp}) => candidatApp.candidat.experienceList);
    const selectedExperience =useSelector(({ candidatApp }) => candidatApp.candidat.selectedExperience);
    
    const languesList = useSelector(({candidatApp}) => candidatApp.candidat.languesList);
    const selectedLangues =useSelector(({ candidatApp }) => candidatApp.candidat.selectedLangues);
    
    const outilsList = useSelector(({candidatApp}) => candidatApp.candidat.outilsList);
    const selectedOutils =useSelector(({ candidatApp }) => candidatApp.candidat.selectedOutils);
    
    
    const domaineList = useSelector(({candidatApp}) => candidatApp.candidat.domaineList);
    const selectedDomaines =useSelector(({ candidatApp }) => candidatApp.candidat.selectedDomaines);
    const niveauFormationList = useSelector(({candidatApp}) => candidatApp.candidat.niveauFormationList);
    const selectedNivFormation=useSelector(({candidatApp}) => candidatApp.candidat.selectedNivFormation);
    const contratsList = useSelector(({candidatApp}) => candidatApp.candidat.contratsList);
    const selectedContrats=useSelector(({candidatApp}) => candidatApp.candidat.selectedContrats);
    const selectedContratsSouhaite=useSelector(({candidatApp}) => candidatApp.candidat.selectedContratsSouhaite);


    const classes = useStyles(props);
    const [tabValue, setTabValue] = useState(0);
    const {form, handleChange, setForm} = useForm(null);
    const theme = useTheme();
    const ITEM_HEIGHT = 48;
    const ITEM_PADDING_TOP = 8;
    const MenuProps = {
      PaperProps: {
        style: {
          maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
          width: 250,
        },
      },
    };


          useEffect(() => {
        function updateCandidatState()
        {
            const params = props.match.params;
            const {candidatId: candidatId} = params;

            if ( candidatId === 'new' )
            {
                dispatch(Actions.newCandidat());
                
            }
            else
            {
                dispatch(Actions.getCandidat(props.match.params));
        
            }
            dispatch(Actions.getSituationFamilliale());
            dispatch(Actions.getNationalite());
            dispatch(Actions.getMobilites());
            dispatch(Actions.getDisponibilite());
            dispatch(Actions.getProvenance());
            dispatch(Actions.getResponsable());
            dispatch(Actions.getPays());
            dispatch(Actions.getVilles());
            dispatch(Actions.getDiplomes());
            dispatch(Actions.getExperiences());
            dispatch(Actions.getLangues());
            dispatch(Actions.getOutils());
            dispatch(Actions.getDomaines());
            dispatch(Actions.getContrats());
            dispatch(Actions.getNivFormation());
        }

        updateCandidatState();
    }, [dispatch, props.match.params]);

     useEffect(() => {

    }, [dispatch, props.match.params]);

    useEffect(() => {
        if (
            (candidat.data && !form) ||
            (candidat.data && form && candidat.data.id !== form.id)
        ) {
            setForm(candidat.data);
        }
    }, [form, candidat.data, setForm]);

    function handleChangeTab(event, tabValue)
    {
        setTabValue(tabValue);
    }
    

    function hundleChangeSituationF(ev)
    {
        form.selectedSituationF=ev.target.value;
        dispatch(Actions.selectSituationF(ev.target.value));
    }
    function hundleChangeNationalite(ev)
    {
        form.selectedNationalite=ev.target.value;
        dispatch(Actions.selectNationalite(ev.target.value));
    }
    function hundleChangeMobilite(ev)
    {
        form.selectedMobilite=ev.target.value;
        dispatch(Actions.selectMobilite(ev.target.value));
    }
    function hundleChangeDisponibilite(ev)
    {
        form.selectedDisponibilite=ev.target.value;
        dispatch(Actions.selectDisponibilite(ev.target.value));
    }
    function hundleChangeProvenance(ev)
    {
        form.selectedProvenance=ev.target.value;
        dispatch(Actions.selectProvenance(ev.target.value));
    }
    function hundleChangeResponsable(ev)
    {
        form.selectedResponsable=ev.target.value;
        dispatch(Actions.selectResponsable(ev.target.value));
    }
    function hundleChangePays(ev)
    {
        form.selectedPays=ev.target.value;
        dispatch(Actions.selectPays(ev.target.value));
    }function hundleChangeVille(ev)
    {
        form.selectedVille=ev.target.value;
        dispatch(Actions.selectVille(ev.target.value));
    }
    function hundleChangeDiplomes(ev)
    {
        form.selectedDiplomes=ev.target.value;
        dispatch(Actions.selectDiplomes(ev.target.value));
    }
    function hundleChangeExperience(ev)
    {
        form.selectedExperience=ev.target.value;
        dispatch(Actions.selectExperience(ev.target.value));
    }
    function hundleChangeLangues(ev)
    {
        form.selectedLangues=ev.target.value;
        dispatch(Actions.selectLangues(ev.target.value));
    }
    function hundleChangeOutils(ev)
    {
        ev.preventDefault();
        dispatch(Actions.selectOutils(ev.target.value));
    }
    function hundleChangeDomaines(ev)
    {
        form.selectedDomaines=ev.target.value;
        dispatch(Actions.selectDomaines(ev.target.value));
    }
    function hundleChangeContratsActual(ev)
    {
        form.selectedContrats=ev.target.value;
        dispatch(Actions.selectContrats(ev.target.value));
    }
    function hundleChangeContratsSouhaite(ev)
    {
        form.selectedContratsSouhaite=ev.target.value;
        dispatch(Actions.selectContratsSouhaite(ev.target.value));
    }
    function hundleChangeNiveauF(ev)
    {
        form.selectedNivFormation=ev.target.value;
        dispatch(Actions.selectNivFormation(ev.target.value));
    }
  
  
     
  
    return (
        <FusePageCarded
            classes={{
                toolbar: "p-0",
                header : "min-h-72 h-72 sm:h-136 sm:min-h-136"
            }}
            header={
                form && (
                    <div className="flex flex-1 w-full items-center justify-between">

                        <div className="flex flex-col items-start max-w-full">

                            <FuseAnimate animation="transition.slideRightIn" delay={300}>
                                <Typography className=" text-16 sm:text-20 truncate" component={Link} role="button" to="/crm/candidats" color="inherit">
                                    <Icon className="mr-4 text-20">arrow_back</Icon>
                                    <i className="material-icons">group</i> Candidat
                                </Typography>
                            </FuseAnimate>

                            <div className="flex items-center max-w-full">
                              
                                <div className="flex flex-col min-w-0">
                                    <FuseAnimate animation="transition.slideLeftIn" delay={300}>
                                        <Typography className="normal-case flex items-center sm:mb-12">
                                           Gestion des candidats
                                        </Typography>
                                    </FuseAnimate>
                                </div>
                            </div>
                        </div>
                        <FuseAnimate animation="transition.slideRightIn" delay={300} >
                            
                            <Button 
                                className="whitespace-no-wrap"
                                variant="contained"
                                onClick={() => dispatch(Actions.saveCandidat(form))}
                               
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
                    classes={{root: "w-full h-64"}}
                >
                    <Tab  className="h-64 normal-case" label="Généralité"/>
                    <Tab className="h-64 normal-case" label="Coordonnées"/>
                    <Tab className="h-64 normal-case" label="Evaluations du candidat"/>
                    <Tab className="h-64 normal-case" label="Administratif"/>
                    <Tab className="h-64 normal-case" label="Dossier Technique"/>
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
                                    id="lastname"
                                    name="lastname"
                                    onChange={handleChange}
                                    label="Nom "
                                    type="text"
                                    value={form.lastname}
                                    variant="outlined"
                                    fullWidth
                                   
                                />
                                 <TextField
                                    className="mt-8 mb-16"
                                    id="firstname"
                                    name="firstname"
                                    onChange={handleChange}
                                    label="Prénom "
                                    type="text"
                                    value={form.firstname}
                                    variant="outlined"
                                    fullWidth
                                   
                                />
                                    <InputLabel htmlFor="situation_familiale-customized-select">Situation familiale</InputLabel>
                                    <Select
                                        className="mt-8 mb-16"  
                                        id="situation_familiale"
                                        fullWidth
                                        variant="outlined" 
                                        value={form.selectedSituationF}
                                       onChange={hundleChangeSituationF}
                                        input={<BootstrapInput name="situation_familiale" id="situation_familiale-customized-select" />}
                                        >
                                            {situationFList.map((item) => (
                                                <MenuItem key={item.id} value={item.id}>
                                                    {item.name}
                                                </MenuItem>
                                            ))}
                                           
                                    </Select>
                                    <InputLabel htmlFor="nationalite-customized-select">Nationalité</InputLabel>
                                    <Select
                                        className="mt-8 mb-16"  
                                        id="nationalite"
                                        fullWidth
                                        variant="outlined"
                                            value={form.selectedNationalite}
                                            onChange={hundleChangeNationalite}
                                            input={<BootstrapInput name="nationalite" id="nationalite-customized-select" />}
                                            >
                                            {nationaliteList.map((item) => (
                                                <MenuItem key={item.id} value={item.id}>
                                                    {item.name}
                                                </MenuItem>
                                            ))}
                                    </Select>
                                    <TextField
                                        className="mb-24"
                                        id="birthday"
                                        label="Date de naissance"
                                        type="date"
                                        value={form.dateNaissance}
                    
                                        InputLabelProps={{
                                            shrink: true
                                        }}
                                        variant="outlined"
                                        fullWidth
                                    />
                                    <InputLabel htmlFor="mobilite-customized-select">Mobilité</InputLabel>
                                    <Select
                                        className="mt-8 mb-16"  
                                        id="mobilite"
                                        value={form.selectedMobilite}
                                        fullWidth
                                        onChange={hundleChangeMobilite}
                                        variant="outlined"
                                        input={<BootstrapInput name="mobilite" id="mobilite-customized-select" />}
                                        >
                                            {mobiliteList.map((item) => (
                                                <MenuItem key={item.id} value={item.id}>
                                                    {item.name}
                                                </MenuItem>
                                            ))}
                                    </Select>
                                    <InputLabel htmlFor="disponibilite-customized-select">Disponibilité</InputLabel>
                                    <Select
                                        className="mt-8 mb-16"  
                                        id="disponibilite"
                                        fullWidth
                                        variant="outlined"
                                        onChange={hundleChangeDisponibilite}
                                        input={<BootstrapInput name="disponibilite" id="disponibilite-customized-select" />}
                                            value={form.selectedDisponibilite}
                                            >
                                            {disponibiliteList.map((item) => (
                                                <MenuItem key={item.id} value={item.id}>
                                                    {item.name}
                                                </MenuItem>
                                            ))}
                                    </Select>
                                     <TextField
                                    className="mt-8 mb-16"
                                    id="statut"
                                    name="statut"
                                    label="Etape /Statut"
                                    type="text"
                                    value={form.statut}
                                    variant="outlined"
                                    disabled={true}
                                    fullWidth
                                    />
                                    <InputLabel htmlFor="provenance-customized-select">Provenance</InputLabel>
                                    <Select
                                        className="mt-8 mb-16"  
                                        id="provenance"
                                        label="Provenance " 
                                        fullWidth
                                        variant="outlined"
                                        onChange={hundleChangeProvenance}
                                        input={<BootstrapInput name="provenance" id="provenance-customized-select" />}
                                            value={form.selectedProvenance}
                                            >
                                            {provenanceList.map((item) => (
                                                <MenuItem key={item.id} value={item.id}>
                                                    {item.name}
                                                </MenuItem>
                                            ))}
                                    </Select>
                                    <InputLabel htmlFor="responsable-customized-select">Responsable</InputLabel>
                                    <Select
                                        className="mt-8 mb-16"  
                                        id="responsable"
                                        label="Responsable " 
                                        fullWidth
                                        variant="outlined"
                                        onChange={hundleChangeResponsable}
                                        input={<BootstrapInput name="responsable" id="responsable-customized-select" />}
                                            value={form.selectedResponsable}
                                            >
                                            {responsableList.map((item) => (
                                                <MenuItem key={item.id} value={item.id}>
                                                    {item.name}
                                                </MenuItem>
                                            ))}
                                    </Select>
                                 
                                </div>
                        )}
                        {tabValue === 1 && (
                            <div>

                               <TextField
                                    className="mt-8 mb-16"
                                    required
                                    label="Email "
                                    autoFocus
                                    type="mail"
                                    id="email"
                                    name="email"
                                    value={form.email}
                                    onChange={handleChange}
                                    variant="outlined"
                                    fullWidth
                                    />

                                <TextField
                                    className="mt-8 mb-16"
                                    required
                                    label="Téléphone fix "
                                    id="telephonefix"
                                    name="telephonefix"
                                    value={form.telephonefix}
                                    onChange={handleChange}
                                    variant="outlined"
                                    fullWidth
                                />
                                 <TextField
                                    className="mt-8 mb-16"
                                    required
                                    label="Téléphone mobile "
                                    id="telephoneMobile"
                                    name="telephoneMobile"
                                    value={form.telephoneMobile}
                                    onChange={handleChange}
                                    variant="outlined"
                                    fullWidth
                                />
                                 <TextField
                                    className="mt-8 mb-16"
                                    required
                                    label="Adresse"
                                    id="adresse"
                                    name="adresse"
                                    value={form.adresse}
                                    onChange={handleChange}
                                    variant="outlined"
                                    fullWidth
                                />
                                 <TextField
                                    className="mt-8 mb-16"
                                    required
                                    label="Code postal"
                                    id="codepostale"
                                    name="codepostale"
                                    value={form.codepostale}
                                    onChange={handleChange}
                                    variant="outlined"
                                    fullWidth
                                />
                                 <InputLabel htmlFor="pays-customized-select">Pays</InputLabel>
                                 <Select
                                        className="mt-8 mb-16"  
                                        id="pays"
                                        label="Pays " 
                                        fullWidth
                                        variant="outlined"
                                        onChange={hundleChangePays}
                                        input={<BootstrapInput name="pays" id="pays-customized-select" />}
                                            value={form.selectedPays}
                                            >
                                            {paysList.map((item) => (
                                                <MenuItem key={item.id} value={item.id}>
                                                    {item.name}
                                                </MenuItem>
                                            ))}
                                    </Select>
                                    <InputLabel htmlFor="ville-customized-select">Ville</InputLabel>
                                    <Select
                                        className="mt-8 mb-16"  
                                        id="ville"
                                        label="Ville " 
                                        fullWidth
                                        variant="outlined"
                                        onChange={hundleChangeVille}
                                        input={<BootstrapInput name="ville" id="ville-customized-select" />}
                                            value={form.selectedVille}
                                            >
                                            {villeList.map((item) => (
                                                <MenuItem key={item.id} value={item.id}>
                                                    {item.name}
                                                </MenuItem>
                                            ))}
                                    </Select>
                                

                                 </div>
                        )}
                        {tabValue === 2 && (
                            <div>
                               



                            </div>
                        )}
                          {tabValue === 3 && (
                            <div>
                                <TextField
                                    className="mt-8 mb-16"
                                    required
                                    label="Salaire actuel"
                                    id="salaireActual"
                                    name="salaireActual"
                                    value={form.salaireActual}
                                    onChange={handleChange}
                                    variant="outlined"
                                    fullWidth
                                />
                                <InputLabel htmlFor="contratActual-customized-select">Contrat actual</InputLabel>
                                 <Select
                                        className="mt-8 mb-16"  
                                        id="contratActual"
                                        fullWidth
                                        onChange={hundleChangeContratsActual}
                                        input={<BootstrapInput name="contratActual" id="contratActual-customized-select" />}
                                            value={form.selectedContrats}
                                            >
                                            {contratsList.map((item) => (
                                                <MenuItem key={item.id} value={item.id}>
                                                    {item.name}
                                                </MenuItem>
                                            ))}
                                    </Select>
                                    <TextField
                                    className="mt-8 mb-16"
                                    required
                                    label="Salaire souhaité"
                                    id="salaireSouhaite"
                                    name="salaireSouhaite"
                                    value={form.salaireSouhaite}
                                    onChange={handleChange}
                                    variant="outlined"
                                    fullWidth
                                />
                                 
                                <InputLabel htmlFor="contratSouhaite-customized-select">Contrat souhaité</InputLabel>
                                 <Select
                                        className="mt-8 mb-16"  
                                        id="contratSouhaite"
                                        fullWidth
                                        onChange={hundleChangeContratsSouhaite}
                                        value
                                        input={<BootstrapInput name="contratSouhaite" id="contratSouhaite-customized-select" />}
                                            value={form.selectedContratsSouhaite}
                                            >
                                            {contratsList.map((item) => (
                                                <MenuItem key={item.id} value={item.id}>
                                                    {item.name}
                                                </MenuItem>
                                            ))}
                                    </Select>



                            </div>
                        )}
                          {tabValue === 4 && (
                            <div>
                                <TextField
                                    className="mt-8 mb-16"
                                    required
                                    label="Titre"
                                    id="titre"
                                    name="titre"
                                    value={form.titre}
                                    onChange={handleChange}
                                    variant="outlined"
                                    fullWidth
                                />
                                   
                                 <InputLabel htmlFor="niveauFormation-customized-select">Niveau de formation</InputLabel>
                                 <Select
                                        className="mt-8 mb-16"  
                                        id="niveauFormation"
                                        fullWidth
                                        onChange={hundleChangeNiveauF}
                                        input={<BootstrapInput name="niveauFormation" id="niveauFormation-customized-select" />}
                                            value={form.selectedNivFormation}
                                            >
                                            {niveauFormationList.map((item) => (
                                                <MenuItem key={item.id} value={item.id}>
                                                    {item.name}
                                                </MenuItem>
                                            ))}
                                    </Select>
                                    <TextField
                                    className="mt-8 mb-16"
                                    required
                                    label="Nombre des années d’expérience"
                                    id="nbrAnneesExp"
                                    name="nbrAnneesExp"
                                    value={form.nbrAnneesExp}
                                    onChange={handleChange}
                                    variant="outlined"
                                    fullWidth
                                />
                                <InputLabel htmlFor="listediplomes-customized-select">Liste des diplômes</InputLabel>
                                 <Select
                                        className="mt-8 mb-16"  
                                        id="listediplomes"
                                        label="Liste des diplômes " 
                                        fullWidth
                                        onChange={hundleChangeDiplomes}
                                        input={<BootstrapInput name="listediplomes" id="listediplomes-customized-select" />}
                                            value={form.selectedDiplomes}
                                            >
                                            {diplomeList.map((item) => (
                                                <MenuItem key={item.id} value={item.id}>
                                                    {item.name}
                                                </MenuItem>
                                            ))}
                                    </Select>
                                    <InputLabel htmlFor="listeExperiences-customized-select">Liste des expériences </InputLabel>
                                    <Select
                                        className="mt-8 mb-16"  
                                        id="listeExperiences"
                                        fullWidth
                                        onChange={hundleChangeExperience}
                                        input={<BootstrapInput name="listeExperiences" id="listeExperiences-customized-select" />}
                                            value={form.selectedExperience}
                                            >
                                            {experienceList.map((item) => (
                                                <MenuItem key={item.id} value={item.id}>
                                                    {item.name}
                                                </MenuItem>
                                            ))}
                                    </Select>
                                    <InputLabel htmlFor="listeLangues-customized-select">Liste des langues </InputLabel>
                                    <Select
                                        className="mt-8 mb-16"  
                                        id="listeLangues"
                                        label="Liste des langues "
                                        fullWidth 
                                        onChange={hundleChangeLangues}
                                        input={<BootstrapInput name="listeLangues" id="listeLangues-customized-select" />}
                                            value={form.selectedLangues}
                                            >
                                            {languesList.map((item) => (
                                                <MenuItem key={item.id} value={item.id}>
                                                    {item.name}
                                                </MenuItem>
                                            ))}
                                    </Select>
                                    <InputLabel htmlFor="listeOutils-customized-select">Outils/Langages/Framework</InputLabel>
                                    <Select
                                        className="mt-8 mb-16"  
                                        id="listeOutils"
                                        fullWidth
                                        onChange={hundleChangeOutils}
                                        input={<BootstrapInput name="listeOutils" id="listeOutils-customized-select" />}
                                            value={form.selectedOutils}
                                            >
                                            {outilsList.map((item) => (
                                                <MenuItem key={item.id} value={item.id}>
                                                    {item.name}
                                                </MenuItem>
                                            ))}
                                    </Select>
                                    <InputLabel htmlFor="listeDomaine-customized-select">Domaines</InputLabel>
                                    <Select
                                        className="mt-8 mb-16"  
                                        id="listeDomaine"
                                        fullWidth
                                        onChange={hundleChangeDomaines}
                                        input={<BootstrapInput name="listeDomaine" id="listeDomaine-customized-select" />}
                                            value={form.selectedDomaines}
                                            >
                                            {domaineList.map((item) => (
                                                <MenuItem key={item.id} value={item.id}>
                                                    {item.name}
                                                </MenuItem>
                                            ))}
                                    </Select>
                                    



                            </div>
                        )}
                    </div>
                )
            }
            innerScroll
        />
    )
        }

export default withReducer('candidatApp', reducer)(Candidat);
