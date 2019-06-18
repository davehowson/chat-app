import React, { useState } from 'react';
import Typography from '@material-ui/core/Typography';

import Header from '../Layout/Header';

import { authenticationService } from '../Services/authenticationService';

const Chat = () => {
    const [currentUser] = useState(authenticationService.currentUserValue);

    return (
        <React.Fragment>
            <Header />
            <Typography>Welcome, {currentUser.name}</Typography>
        </React.Fragment>
    );
};

export default Chat;
