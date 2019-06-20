import React, { useState, useEffect } from 'react';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListSubheader from '@material-ui/core/ListSubheader';
import Divider from '@material-ui/core/Divider';
import Avatar from '@material-ui/core/Avatar';
import GroupIcon from '@material-ui/icons/Group';
import { makeStyles } from '@material-ui/core/styles';
import socketIOClient from 'socket.io-client';

import { useGetUsers } from '../Services/userService';

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

const Users = props => {
    const classes = useStyles();
    const [users, setUsers] = useState([]);
    const [newUser, setNewUser] = useState(null);
    const getUsers = useGetUsers();

    useEffect(() => {
        getUsers().then(res => setUsers(res));
    }, [newUser]);

    useEffect(() => {
        const socket = socketIOClient(process.env.REACT_APP_API_URL);
        socket.on('users', data => setNewUser(data));
    }, []);

    return (
        <List>
            <ListSubheader classes={{ root: classes.subheader }}>
                <ListItemAvatar>
                    <Avatar className={classes.globe}>
                        <GroupIcon />
                    </Avatar>
                </ListItemAvatar>
                <ListItemText
                    className={classes.subheaderText}
                    primary="Users"
                />
            </ListSubheader>
            <Divider />
            {users && (
                <React.Fragment>
                    {users.map(u => (
                        <ListItem
                            className={classes.listItem}
                            key={u._id}
                            onClick={() => {
                                props.setScope(u.name);
                                props.setRecipientId(u._id);
                            }}
                        >
                            <ListItemAvatar>
                                <Avatar>AD</Avatar>
                            </ListItemAvatar>
                            <ListItemText primary={u.name} />
                        </ListItem>
                    ))}
                </React.Fragment>
            )}
        </List>
    );
};

export default Users;
