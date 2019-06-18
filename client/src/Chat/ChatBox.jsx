import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles(theme => ({
    root: {
        padding: theme.spacing(2),
    },
}));

const ChatBox = props => {
    const classes = useStyles();

    return (
        <Grid container className={classes.root}>
            <Grid item xs={12}>
                <Typography variant="h6">{props.scope}</Typography>
            </Grid>
            <Grid item />
        </Grid>
    );
};

export default ChatBox;
