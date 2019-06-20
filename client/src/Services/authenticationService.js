import { BehaviorSubject } from 'rxjs';
import { useSnackbar } from 'notistack';

import useHandleResponse from '../Utilities/handle-response';

const currentUserSubject = new BehaviorSubject(
    JSON.parse(localStorage.getItem('currentUser'))
);

export const authenticationService = {
    logout,
    currentUser: currentUserSubject.asObservable(),
    get currentUserValue() {
        return currentUserSubject.value;
    },
};

export function useLogin() {
    const { enqueueSnackbar } = useSnackbar();
    const handleResponse = useHandleResponse();

    const login = (username, password) => {
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username, password }),
        };

        return fetch(
            `${process.env.REACT_APP_API_URL}/api/users/login`,
            requestOptions
        )
            .then(handleResponse)
            .then(user => {
                localStorage.setItem('currentUser', JSON.stringify(user));
                currentUserSubject.next(user);
                return user;
            })
            .catch(function() {
                enqueueSnackbar('Failed to Login', {
                    variant: 'error',
                });
            });
    };

    return login;
}

export function useRegister() {
    const { enqueueSnackbar } = useSnackbar();
    const handleResponse = useHandleResponse();

    const register = (name, username, password, password2) => {
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ name, username, password, password2 }),
        };

        return fetch(
            `${process.env.REACT_APP_API_URL}/api/users/register`,
            requestOptions
        )
            .then(handleResponse)
            .then(user => {
                localStorage.setItem('currentUser', JSON.stringify(user));
                currentUserSubject.next(user);

                return user;
            })
            .catch(function(response) {
                if (response) {
                    enqueueSnackbar(response, {
                        variant: 'error',
                    });
                } else {
                    enqueueSnackbar('Failed to Register', {
                        variant: 'error',
                    });
                }
            });
    };

    return register;
}

function logout() {
    localStorage.removeItem('currentUser');
    currentUserSubject.next(null);
}
