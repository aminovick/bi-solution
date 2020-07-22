import React, {useState} from 'react'
import {Card, CardContent, Typography, Tabs, Tab} from '@material-ui/core';
import {darken} from '@material-ui/core/styles/colorManipulator';
import {FuseAnimate} from '@fuse';
import {Link} from 'react-router-dom';
import clsx from 'clsx';
import JWTLoginTab from './tabs/JWTLoginTab';
import {makeStyles} from '@material-ui/styles';

const useStyles = makeStyles(theme => ({
    root: {
        background: 'linear-gradient(to right, ' + theme.palette.primary.dark + ' 0%, ' + darken(theme.palette.primary.dark, 0.5) + ' 100%)',
        color     : theme.palette.primary.contrastText
    }
}));

function Login()
{
    const classes = useStyles();
    const [selectedTab, setSelectedTab] = useState(0);

    function handleTabChange(event, value)
    {
        setSelectedTab(value);
    }

    return (
        <div className={clsx(classes.root, "flex flex-col flex-1 flex-shrink-0 p-24 md:flex-row md:p-0")}>

            <div className="flex flex-col flex-grow-0 items-left text-white p-16 text-center md:p-128 md:items-start md:flex-shrink-0 md:flex-1 md:text-rigth">

                <FuseAnimate animation="transition.expandIn">
                    <img className="w-128 mb-32" src="assets/images/logos/bisolutions.svg" alt="logo"/>
                    
                </FuseAnimate>
                <FuseAnimate animation="transition.slideUpIn" delay={300}>
                    <Typography variant="h4" color="inherit" className="font-light">
                    Bienvenue dans votre portail<br/> BI SOLUTIONS
                    </Typography>
                </FuseAnimate>
                
                
            </div>

            <FuseAnimate animation={{translateX: [0, '100%']}}>

                <Card className="w-full max-w-400 mx-auto m-16 md:m-0" square>

                    <CardContent className="flex flex-col items-center justify-center p-32 md:p-48 md:pt-128 ">

                        <Typography variant="h6" className="text-center md:w-full mb-48">CONNECTEZ-VOUS À VOTRE COMPTE</Typography>

                        <Tabs
                            value={selectedTab}
                            onChange={handleTabChange}
                            variant="fullWidth"
                            className="mb-32"
                        >
                            <Tab
                                icon={<img className="h-40 p-4 bg-black rounded-12" src="assets/images/logos/log.svg" />}
                                className="min-w-0"
                                label="IDENTIFICATION"
                            />
                           
                        </Tabs>

                        {selectedTab === 0 && <JWTLoginTab />}
                       
                    </CardContent>
                </Card>
            </FuseAnimate>
        </div>
    )
}

export default Login;
