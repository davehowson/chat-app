import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';

import { useLogin } from '../Services/authenticationService';

const useStyles = makeStyles(theme => ({
    paper: {
        marginTop: theme.spacing(8),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    form: {
        width: '100%',
        marginTop: theme.spacing(1),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
}));

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const login = useLogin();

    const handleSubmit = e => {
        e.preventDefault();
        login(username, password);
    };

    const classes = useStyles();

    return (
        <div className={classes.paper}>
            <Typography component="h1" variant="h5">
                Sign in
            </Typography>
            <form onSubmit={handleSubmit} className={classes.form} noValidate>
                <TextField
                    variant="outlined"
                    margin="normal"
                    required
                    fullWidth
                    id="username"
                    label="Username"
                    name="username"
                    autoComplete="username"
                    value={username}
                    onChange={e => {
                        setUsername(e.target.value);
                    }}
                    autoFocus
                />

                <TextField
                    variant="outlined"
                    margin="normal"
                    required
                    fullWidth
                    id="password"
                    label="Password"
                    name="password"
                    type="password"
                    autoComplete="password"
                    value={password}
                    onChange={e => {
                        setPassword(e.target.value);
                    }}
                    autoFocus
                />

                <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    color="primary"
                    className={classes.submit}
                >
                    Sign In
                </Button>
            </form>
        </div>
    );
};

export default Login;
