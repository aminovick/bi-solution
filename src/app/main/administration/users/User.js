import React, {useEffect, useState} from 'react';
import {Button, Tab, Tabs, TextField, InputAdornment, Icon, Typography,Checkbox} from '@material-ui/core';
import {orange} from '@material-ui/core/colors';
import {makeStyles,useTheme} from '@material-ui/styles';
import {FuseAnimate, FusePageCarded} from '@fuse';
import {useForm} from '@fuse/hooks';
import {Link} from 'react-router-dom';
import _ from '@lodash';
import {useDispatch, useSelector} from 'react-redux';
import withReducer from 'app/store/withReducer';
import * as Actions from '../store/actions';
import reducer from '../store/reducers';
import FormLabel from '@material-ui/core/FormLabel';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

const useStyles = makeStyles(theme => ({
    root: {
        width: '100%',
        maxWidth: 360,
        backgroundColor: theme.palette.background.paper,
        display: 'flex',
        flexWrap: 'wrap',
      },
      formControl: {
        margin: theme.spacing(1),
        minWidth: 150,
        maxWidth: 300,
      },
      chips: {
        display: 'flex',
        flexWrap: 'wrap',
      },
      chip: {
        margin: 2,
      },
      noLabel: {
        marginTop: theme.spacing(3),
      },
    userImageFeaturedStar: {
        position: 'absolute',
        top     : 0,
        right   : 0,
        color   : orange[400],
        opacity : 0
    },
    userImageUpload      : {
        transitionProperty      : 'box-shadow',
        transitionDuration      : theme.transitions.duration.short,
        transitionTimingFunction: theme.transitions.easing.easeInOut,
    },
    userImageItem        : {
        transitionProperty      : 'box-shadow',
        transitionDuration      : theme.transitions.duration.short,
        transitionTimingFunction: theme.transitions.easing.easeInOut,
        '&:hover'               : {
            '& $userImageFeaturedStar': {
                opacity: .8
            }
        },
        '&.featured'            : {
            pointerEvents                      : 'none',
            boxShadow                          : theme.shadows[3],
            '& $userImageFeaturedStar'      : {
                opacity: 1
            },
            '&:hover $userImageFeaturedStar': {
                opacity: 1
            }
        }
    }
}));

function User(props)
{
    const profileListe = useSelector(({administrationApp })=> administrationApp.profiles.data);
    const dispatch = useDispatch();
    const user = useSelector(({administrationApp}) => administrationApp.user);
     const classes = useStyles(props);
    const [tabValue, setTabValue] = useState(0);
    const {form, handleChange, setForm} = useForm(null);
    const theme = useTheme();
    const [pofileName, setpofileName] = React.useState([]);
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

    /*
     * Style of Profiles
     */

    function getStyles(profiles, pofileName, theme) {
        return {
          fontWeight:
              pofileName.indexOf(profiles) === -1
              ? theme.typography.fontWeightRegular
              : theme.typography.fontWeightMedium,
        };
      }    

          useEffect(() => {
        function updateUserState()
        {
            const params = props.match.params;
            const {userId} = params;

            if ( userId === 'new' )
            {
                dispatch(Actions.newUser());
            }
            else 
            {
                dispatch(Actions.getUser(props.match.params));
            }
            
        }

        updateUserState();
    }, [dispatch, props.match.params]);

     useEffect(() => {

       const resp= dispatch(Actions.getProfiles());
       console.log('respons'+resp)
    }, [dispatch, props.match.params]);

    useEffect(() => {
        
        if ( 
            (user.data && !form) 
            ||
            (user.data && form && user.data.id !== form.id)
        )
        {
            setForm(user.data);
        }
    }, [form, user.data, setForm]);

    function handleChangeTab(event, tabValue)
    {
        setTabValue(tabValue);
    }
    
    /* 
     *  Submit if username existe 
    */

        function canBeSubmitted()
    {
        return (
            form.email &&
            form.email.length > 0 
            &&  form.email.includes("@")
        );
    };
    
  /*
   *  initialize & update new table of profiles 
   * 
   */

    function handleChanges(event) {
        let values=event.target.value
        form.profilSelected=[...values]
        setpofileName( form.profilSelected);
        
      }

     /*  Submit & send data to stor */
      function handleSubmit(event)
    {
        event.preventDefault();
        dispatch(Actions.saveUser(form))
                     
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
                                <Typography className=" text-16 sm:text-20 truncate" component={Link} role="button" to="/administration/users" color="inherit">
                                    <Icon className="mr-4 text-20">arrow_back</Icon>
                                    <i className="material-icons">group</i> Utilisateurs
                                </Typography>
                            </FuseAnimate>

                            <div className="flex items-center max-w-full">
                              
                                <div className="flex flex-col min-w-0">
                                    <FuseAnimate animation="transition.slideLeftIn" delay={300}>
                                        <Typography className="normal-case flex items-center sm:mb-12">
                                           Gestion des utilisateurs
                                        </Typography>
                                    </FuseAnimate>
                                </div>
                            </div>
                        </div>
                        <FuseAnimate animation="transition.slideRightIn" delay={300} >
                            
                            <Button 
                                className="whitespace-no-wrap"
                                variant="contained"
                                onClick={(handleSubmit)}
                                disabled={!canBeSubmitted()}
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
                    <Tab  className="h-64 normal-case" label="Ajouter Utilisateur"/>
                    <Tab className="h-64 normal-case" label="Profiles"/>
                    <Tab className="h-64 normal-case" label="Mot de Passe"/>
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
                                    error={form.username === ''}
                                    required
                                    label="Identifiant "
                                    autoFocus
                                    id="username"
                                    name="username"
                                    value={form.username}
                                    onChange={handleChange}
                                    variant="outlined"
                                    fullWidth
                                />

                                <TextField
                                    className="mt-8 mb-16"
                                    id="firstName"
                                    name="firstName"
                                    onChange={handleChange}
                                    label="Nom "
                                    type="text"
                                    value={form.firstName}
                                    variant="outlined"
                                    fullWidth
                                   
                                />
                                 <TextField
                                    className="mt-8 mb-16"
                                    id="lastName"
                                    name="lastName"
                                    onChange={handleChange}
                                    label="Prénom "
                                    type="text"
                                    value={form.lastName}
                                    variant="outlined"
                                    fullWidth
                                   
                                />
 
                                <TextField
                                    className="mt-8 mb-16"
                                    id="email"
                                    name="email"
                                    onChange={handleChange}
                                    label="Email  "
                                    type="email"
                                    value={form.email}
                                    variant="outlined"
                                    fullWidth
                                    required
                                    />
                                {form.emailerror?(
                                <div style={{fontSize:12,color:"red"}}> {form.emailerror}</div>):
                                null}
                                    <div>
                                 <FormLabel >Active :
                                     
                                     <Checkbox  onChange={handleChange} value="active"
                                     id="active"
                                     name="active" 
                                     value={form.active}
                                     />
                                     </FormLabel>
                                     </div> 
                                                                                                             
                                 <TextField
                                     id="date_connexion"
                                     name="date_connexion"
                                     label="Dernière connection"
                                     type="datetime-local"
                                     InputProps={{
                                        readOnly: true,
                                      }}
                                     value={form.date_connexion}
                                     
                                     onChange={handleChange}
                                     className={classes.textField}
                                     InputLabelProps={{
                                     shrink: true,
                                     }}
                                 />
                                 
                                </div>
                        )}
                        {tabValue === 1 && (
                             <div  className={classes.root}>
                                 <FormControl className={classes.formControl}>
                                 <InputLabel htmlFor="pofileName">List des Profiles </InputLabel>
                                    <Select
                                    label="Emaichoixl  "
                                    multiple
                                    selected={pofileName}
                                    value={pofileName}
                                    onChange={handleChanges}
                                    input={<Input id="pofileName" />}
                                    MenuProps={MenuProps}
                                     >
                                    {profileListe.map(profiles => (
                                   <MenuItem key={profiles.name} 
                                             value={profiles.name} 
                                             style={getStyles(profiles, pofileName, theme)}>
                                             {profiles.name}
                                    </MenuItem>
                                            ))}
                                     </Select>
                                     </FormControl>
                             </div>
                        )}
                        {tabValue === 2 && (
                            <div>

                               <TextField
                                    className="mt-8 mb-16"
                                    required
                                    label="Mot de passe "
                                    autoFocus
                                    type="password"
                                    id="password"
                                    name="password"
                                    value={form.password}
                                    onChange={handleChange}
                                    variant="outlined"
                                    fullWidth
                                    />

                                <TextField
                                    className="mt-8 mb-16"
                                    error={form.confirmation === ''}
                                    required
                                    label="Confirmer "
                                    type="password"
                                    autoFocus
                                    id="confirmation"
                                    name="confirmation"
                                    value={form.confirmation}
                                    onChange={handleChange}
                                    variant="outlined"
                                    fullWidth
                                   
                                />

                                 </div>
                        )}
                    </div>
                )
            }
            innerScroll
        />
    )
        }

export default withReducer('administrationApp', reducer)(User);
