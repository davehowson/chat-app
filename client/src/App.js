import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import './App.css';
import Home from './Home/Home';

function App() {
    return (
        <BrowserRouter>
            <Route path="/" exact component={Home} />
        </BrowserRouter>
    );
}

export default App;
