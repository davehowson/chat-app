import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Divider from '@material-ui/core/Divider';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListSubheader from '@material-ui/core/ListSubheader';
import Avatar from '@material-ui/core/Avatar';
import LanguageIcon from '@material-ui/icons/Language';

import Header from '../Layout/Header';
import ChatBox from './ChatBox';
import Users from './Users';
import { useGetConversations } from '../Services/chatService';
import { authenticationService } from '../Services/authenticationService';

const useStyles = makeStyles(theme => ({
    paper: {
        minHeight: 'calc(100vh - 64px)',
        borderRadius: 0,
    },
    subheader: {
        display: 'flex',
        alignItems: 'center',
        cursor: 'pointer',
    },
    globe: {
        backgroundColor: theme.palette.primary.dark,
    },
    subheaderText: {
        color: theme.palette.primary.dark,
    },
    listItem: {
        cursor: 'pointer',
    },
}));

const Chat = () => {
    const [scope, setScope] = useState('Global Chat');
    const [conversationId, setConversationId] = useState(null);
    const [conversations, setConversations] = useState([]);
    const [recipientId, setRecipientId] = useState(null);
    const getConversations = useGetConversations();
    const classes = useStyles();

    useEffect(() => {
        getConversations().then(res => setConversations(res));
    }, []);

    const handleRecipient = recipients => {
        let recipient;
        for (let i = 0; i < recipients.length; i++) {
            if (
                recipients[i].username !==
                authenticationService.currentUserValue.username
            ) {
                recipient = recipients[i];
            }
        }

        return recipient;
    };

    return (
        <React.Fragment>
            <Header />
            <Grid container>
                <Grid
                    item
                    md={3}
                    component={Paper}
                    classes={{ root: classes.paper }}
                >
                    <List>
                        <ListSubheader
                            classes={{ root: classes.subheader }}
                            onClick={() => {
                                setScope('Global Chat');
                                setConversationId(null);
                            }}
                        >
                            <ListItemAvatar>
                                <Avatar className={classes.globe}>
                                    <LanguageIcon />
                                </Avatar>
                            </ListItemAvatar>
                            <ListItemText
                                className={classes.subheaderText}
                                primary="Global Chat"
                            />
                        </ListSubheader>
                        <Divider />
                        {conversations && (
                            <React.Fragment>
                                {conversations.map(c => (
                                    <ListItem
                                        className={classes.listItem}
                                        key={c._id}
                                        onClick={() => {
                                            setScope(
                                                handleRecipient(c.recipientObj)
                                                    .name
                                            );
                                            setRecipientId(
                                                handleRecipient(c.recipientObj)
                                                    ._id
                                            );
                                            setConversationId(c._id);
                                        }}
                                    >
                                        <ListItemAvatar>
                                            <Avatar>AD</Avatar>
                                        </ListItemAvatar>
                                        <ListItemText
                                            primary={
                                                handleRecipient(c.recipientObj)
                                                    .name
                                            }
                                            secondary={
                                                <React.Fragment>
                                                    - {c.lastMessage}
                                                </React.Fragment>
                                            }
                                        />
                                    </ListItem>
                                ))}
                            </React.Fragment>
                        )}
                    </List>
                </Grid>
                <Grid item md={7}>
                    <ChatBox
                        scope={scope}
                        conversationId={conversationId}
                        recipientId={recipientId}
                    />
                </Grid>
                <Grid
                    item
                    md={2}
                    component={Paper}
                    classes={{ root: classes.paper }}
                >
                    <Users />
                </Grid>
            </Grid>
        </React.Fragment>
    );
};

export default Chat;
