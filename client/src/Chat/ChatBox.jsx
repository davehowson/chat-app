import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import IconButton from '@material-ui/core/IconButton';
import SendIcon from '@material-ui/icons/Send';

const useStyles = makeStyles(theme => ({
    root: {
        padding: theme.spacing(2),
        height: '100%',
    },
    messageRow: {
        width: '100%',
    },
}));

const ChatBox = props => {
    const [message, setMessage] = useState('');
    const classes = useStyles();

    const handleSubmit = e => {
        e.preventDefault();
        console.log(message);
    };

    return (
        <Grid container className={classes.root}>
            <Grid item xs={12}>
                <Typography variant="h6">{props.scope}</Typography>
            </Grid>
            <Grid item xs={12}>
                <Grid container>
                    <Grid item xs={12} />
                    <Grid item xs={12}>
                        <form onSubmit={handleSubmit}>
                            <Grid
                                container
                                className={classes.messageRow}
                                alignItems="flex-end"
                            >
                                <Grid item xs={10}>
                                    <TextField
                                        id="message"
                                        label="Message"
                                        variant="outlined"
                                        margin="dense"
                                        fullWidth
                                        multiline
                                        rowsMax={4}
                                        value={message}
                                        onChange={e =>
                                            setMessage(e.target.value)
                                        }
                                    />
                                </Grid>
                                <Grid item xs={2}>
                                    <IconButton>
                                        <SendIcon />
                                    </IconButton>
                                </Grid>
                            </Grid>
                        </form>
                    </Grid>
                </Grid>
            </Grid>
        </Grid>
    );
};

export default ChatBox;
