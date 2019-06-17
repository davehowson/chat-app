import React, { useState } from 'react';

import { useLogin } from '../Services/authenticationService';

const Home = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const login = useLogin();

    const handleSubmit = e => {
        e.preventDefault();
        login(username, password);
    };

    console.log(process.env.REACT_APP_API_URL);

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <label>
                    Username:
                    <input
                        type="text"
                        value={username}
                        onChange={e => {
                            setUsername(e.target.value);
                        }}
                    />
                </label>
                <label>
                    Password:
                    <input
                        type="text"
                        value={password}
                        onChange={e => {
                            setPassword(e.target.value);
                        }}
                    />
                </label>
                <input type="submit" value="Submit" />
            </form>
        </div>
    );
};

export default Home;
