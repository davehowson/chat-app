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
import socketIOClient from 'socket.io-client';

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
        maxHeight: '75vh',
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
    avatar: {
        margin: theme.spacing(1, 1.5),
    },
    listItem: {
        width: '80%',
    },
}));

const ChatBox = props => {
    const [newMessage, setNewMessage] = useState('');
    const [messages, setMessages] = useState([]);
    const getGlobalMessages = useGetGlobalMessages();
    const sendGlobalMessage = useSendGlobalMessage();
    const [lastMessage, setLastMessage] = useState(null);
    let chatBottom = useRef(null);
    const classes = useStyles();

    useEffect(() => {
        reloadMessages();
        scrollToBottom();
    }, [lastMessage]);

    useEffect(() => {
        const socket = socketIOClient(process.env.REACT_APP_API_URL);
        socket.on('messages', data => setLastMessage(data));
    }, []);

    const reloadMessages = () => {
        getGlobalMessages().then(res => {
            setMessages(res);
        });
    };

    const scrollToBottom = () => {
        chatBottom.current.scrollIntoView({ behavior: 'smooth' });
    };

    useEffect(scrollToBottom, [messages]);

    const handleSubmit = e => {
        e.preventDefault();
        sendGlobalMessage(newMessage).then(() => {
            setNewMessage('');
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
                                    <ListItem
                                        key={m._id}
                                        className={classes.listItem}
                                        alignItems="flex-start"
                                    >
                                        <ListItemAvatar
                                            className={classes.avatar}
                                        >
                                            <Avatar>H</Avatar>
                                        </ListItemAvatar>
                                        <ListItemText
                                            primary={m.from.name}
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
                        <div ref={chatBottom} />
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
