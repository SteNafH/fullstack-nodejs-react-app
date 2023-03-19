import React from "react";
import { Link, useNavigate } from 'react-router-dom';
import { useError } from '../../hooks/useError';

function Register() {
    const navigate = useNavigate();
    const error = useError();

    async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();

        const formData = new FormData(event.currentTarget);

        const response = await fetch(`api/v1/users/register`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: new URLSearchParams(formData)
        }).then(response => response.json())

        if (response.status === 'success')
            navigate('/login', { replace: true });
        else
            error.addError(response.message);
    }

    return (
        <>
            <h1>Register</h1>
            <form onSubmit={handleSubmit}>
                <label htmlFor={"email"}>Email:</label>
                <input name={"email"} id={"email"} type={"text"} required/>

                <label htmlFor={"password"}>Password: </label>
                <input name={"password"} id={"password"} type={"password"} required/>

                <button type="submit">Register</button>
            </form>

            <Link to="/login">Login</Link>
        </>
    );
}

export default Register;
