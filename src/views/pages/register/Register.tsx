import React from "react";
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks';

function Register() {
    const navigate = useNavigate();
    const location = useLocation();
    const auth = useAuth();

    const from = location.state?.from?.pathname || "/";

    async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();

        const formData = new FormData(event.currentTarget);

        await fetch(`api/v1/users/register`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: new URLSearchParams(formData)
        });

        // const username = formData.get("username") as string;
        //
        // auth.signin(username, () => {
        //     navigate(from, { replace: true });
        // });
    }

    return (
        <>
            <h1>Register</h1>
            <form onSubmit={handleSubmit}>
                <label>
                    Username: <input name="email" type="text"/>
                </label>
                <label>
                    Password: <input name="password" type="password"/>
                </label>
                <button type="submit">Register</button>
            </form>

            <Link to="/login">Login</Link>
        </>
    );
}

export default Register;
