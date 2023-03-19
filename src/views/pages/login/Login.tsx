import React from "react";
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks';

function Login() {
    const navigate = useNavigate();
    const location = useLocation();
    const auth = useAuth();

    const from = location.state?.from?.pathname || "/";

    async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();

        const formData = new FormData(event.currentTarget);

        const response = await fetch(`api/v1/users/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: new URLSearchParams(formData)
        }).then(response => response.json());

        auth.signin(response.data.token, () => {
            navigate(from, { replace: true });
        });
    }

    return (
        <>
            <h1>Login</h1>
            <form onSubmit={handleSubmit}>
                <label>
                    Username: <input name="email" type="text"/>
                </label>
                <label>
                    Password: <input name="password" type="password"/>
                </label>
                <button type="submit">Login</button>
            </form>

            <Link to="/register">Register</Link>
        </>
    );
}

export default Login;
