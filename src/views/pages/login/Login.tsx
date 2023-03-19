import React from "react";
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks';
import { useError } from '../../hooks/useError';

function Login() {
    const navigate = useNavigate();
    const location = useLocation();
    const auth = useAuth();
    const error = useError();

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
        })
            .then(response => response.json())

        if (response.status === 'success')
            auth.signin(response.data.token, () => {
                navigate(from, { replace: true });
            });
        else
            error.addError(response.message);
    }

    return (
        <>
            <h1>Login</h1>
            <form onSubmit={handleSubmit}>
                <label htmlFor={"email"}>Email:</label>
                <input name={"email"} id={"email"} type={"text"} required/>

                <label htmlFor={"password"}>Password: </label>
                <input name={"password"} id={"password"} type={"password"} required/>

                <button type="submit">Login</button>
            </form>

            <Link to="/register">Register</Link>
        </>
    );
}

export default Login;
