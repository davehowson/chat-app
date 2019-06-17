import { BehaviorSubject } from 'rxjs';

const currentUserSubject = new BehaviorSubject(
    JSON.parse(localStorage.getItem('currentUser'))
);

export function useLogin() {
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
            .then(user => {
                localStorage.setItem('currentUser', JSON.stringify(user));
                currentUserSubject.next(user);
                return user;
            })
            .then(response => {
                console.log(response);
            });
    };

    return login;
}
