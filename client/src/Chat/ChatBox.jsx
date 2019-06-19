import React, { useState, useEffect, useRef } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import IconButton from '@material-ui/core/IconButton';
import SendIcon from '@material-ui/icons/Send';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';

import {
    useGetGlobalMessages,
    useSendGlobalMessage,
} from '../Services/chatService';
import { Avatar } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
    root: {
        padding: theme.spacing(2),
        height: '100%',
    },
    messageContainer: {
        height: '100%',
    },
    messagesRow: {
        maxHeight: '70vh',
        overflowY: 'auto',
    },
    newMessageRow: {
        width: '100%',
    },
    inputRow: {
        display: 'flex',
        alignItems: 'flex-end',
    },
    form: {
        width: '100%',
    },
}));

const ChatBox = props => {
    const [newMessage, setNewMessage] = useState('');
    const [messages, setMessages] = useState([]);
    const getGlobalMessages = useGetGlobalMessages();
    const sendGlobalMessage = useSendGlobalMessage();
    let lastMessage = useRef(null);
    const classes = useStyles();

    useEffect(() => {
        reloadMessages();
        scrollToBottom();
    }, []);

    const reloadMessages = () => {
        getGlobalMessages().then(res => {
            setMessages(res);
        });
    };

    const scrollToBottom = () => {
        lastMessage.current.scrollIntoView({ behavior: 'smooth' });
    };

    useEffect(scrollToBottom, [messages]);

    const handleSubmit = e => {
        e.preventDefault();
        sendGlobalMessage(newMessage).then(() => {
            setNewMessage('');
            reloadMessages();
        });
    };

    return (
        <Grid container className={classes.root}>
            <Grid item xs={12}>
                <Typography variant="h6">{props.scope}</Typography>
            </Grid>
            <Grid item xs={12}>
                <Grid container className={classes.messageContainer}>
                    <Grid item xs={12} className={classes.messagesRow}>
                        {messages && (
                            <List>
                                {messages.map(m => (
                                    <ListItem key={m._id}>
                                        <ListItemAvatar>
                                            <Avatar>H</Avatar>
                                        </ListItemAvatar>
                                        <ListItemText
                                            primary="Chad Bradley"
                                            secondary={
                                                <React.Fragment>
                                                    {m.body}
                                                </React.Fragment>
                                            }
                                        />
                                    </ListItem>
                                ))}
                            </List>
                        )}
                        <div ref={lastMessage} />
                    </Grid>
                    <Grid item xs={12} className={classes.inputRow}>
                        <form onSubmit={handleSubmit} className={classes.form}>
                            <Grid
                                container
                                className={classes.newMessageRow}
                                alignItems="flex-end"
                            >
                                <Grid item xs={11}>
                                    <TextField
                                        id="message"
                                        label="Message"
                                        variant="outlined"
                                        margin="dense"
                                        fullWidth
                                        value={newMessage}
                                        onChange={e =>
                                            setNewMessage(e.target.value)
                                        }
                                    />
                                </Grid>
                                <Grid item xs={1}>
                                    <IconButton type="submit">
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
