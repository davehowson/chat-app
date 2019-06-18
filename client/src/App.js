import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import { createMuiTheme } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import { ThemeProvider } from '@material-ui/styles';
import { SnackbarProvider } from 'notistack';

import './App.css';
import Home from './Home/Home';

const theme = createMuiTheme({
    typography: {
        useNextVariants: true,
    },
});

function App() {
    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <SnackbarProvider maxSnack={3} autoHideDuration={3000}>
                <BrowserRouter>
                    <Route path="/" exact component={Home} />
                </BrowserRouter>
            </SnackbarProvider>
        </ThemeProvider>
    );
}

export default App;
