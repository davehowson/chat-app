import React from 'react';
import Container from '@material-ui/core/Container';

import Login from './Login';

const Home = () => {
    return (
        <Container component="main" maxWidth="xs">
            <Login />
        </Container>
    );
};

export default Home;
