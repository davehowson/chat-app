import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Link from '@material-ui/core/Link';

import { authenticationService } from '../Services/authenticationService';
import history from '../Utilities/history';
import logo from './logo.png';

const useStyles = makeStyles(theme => ({
    root: {
        flexGrow: 1,
    },
    title: {
        flexGrow: 1,
    },
}));

const Header = () => {
    const handleLogout = () => {
        authenticationService.logout();
        history.push('/');
    };

    const classes = useStyles();

    return (
        <div className={classes.root}>
            <AppBar position="static">
                <Toolbar>
                    <Link href="/" className={classes.title}>
                        <img src={logo} alt="Logo" />
                    </Link>
                    <Button color="inherit" onClick={handleLogout}>
                        Logout
                    </Button>
                </Toolbar>
            </AppBar>
        </div>
    );
};

export default Header;
