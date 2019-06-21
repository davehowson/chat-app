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
import {
    useGetConversations,
    useGetConversationId,
} from '../Services/chatService';
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
    const classes = useStyles();

    return (
        <React.Fragment>
            <Header />
            <Grid container>
                <Grid
                    item
                    md={4}
                    component={Paper}
                    classes={{ root: classes.paper }}
                >
                    <List>
                        <ListSubheader
                            classes={{ root: classes.subheader }}
                            onClick={() => {
                                setScope('Global Chat');
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
                    </List>
                </Grid>
                <Grid item md={8}>
                    <ChatBox scope={scope} />
                </Grid>
            </Grid>
        </React.Fragment>
    );
};

export default Chat;
