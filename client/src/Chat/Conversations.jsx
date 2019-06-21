import React, { useState, useEffect } from 'react';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import ListSubheader from '@material-ui/core/ListSubheader';
import LanguageIcon from '@material-ui/icons/Language';
import Divider from '@material-ui/core/Divider';
import { makeStyles } from '@material-ui/core/styles';
import socketIOClient from 'socket.io-client';

import { useGetConversations } from '../Services/chatService';
import { authenticationService } from '../Services/authenticationService';

const useStyles = makeStyles(theme => ({
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

const Conversations = props => {
    const classes = useStyles();
    const [conversations, setConversations] = useState([]);
    const [newConversation, setNewConversation] = useState(null);
    const getConversations = useGetConversations();

    // Returns the recipient name that does not
    // belong to the current user.
    const handleRecipientName = recipients => {
        for (let i = 0; i < recipients.length; i++) {
            if (
                recipients[i].username !==
                authenticationService.currentUserValue.username
            ) {
                return recipients[i].name;
            }
        }
        return null;
    };

    useEffect(() => {
        getConversations().then(res => setConversations(res));
    }, [newConversation]);

    useEffect(() => {
        const socket = socketIOClient(process.env.REACT_APP_API_URL);
        socket.on('conversations', data => setNewConversation(data));
    }, []);

    return (
        <List>
            <ListSubheader
                classes={{ root: classes.subheader }}
                onClick={() => {
                    props.setScope('Global Chat');
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
                        <ListItem className={classes.listItem} key={c._id}>
                            <ListItemAvatar>
                                <Avatar>AD</Avatar>
                            </ListItemAvatar>
                            <ListItemText
                                primary={handleRecipientName(c.recipientObj)}
                                secondary={
                                    <React.Fragment>
                                        {c.lastMessage}
                                    </React.Fragment>
                                }
                            />
                        </ListItem>
                    ))}
                </React.Fragment>
            )}
        </List>
    );
};

export default Conversations;
