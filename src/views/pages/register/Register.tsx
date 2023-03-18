import React from "react";
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks';

function Register() {
    const navigate = useNavigate();
    const location = useLocation();
    const auth = useAuth();

    const from = location.state?.from?.pathname || "/";

    function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();

        const formData = new FormData(event.currentTarget);
        const username = formData.get("username") as string;

        auth.signin(username, () => {
            navigate(from, { replace: true });
        });
    }

    return (
        <>
            <form onSubmit={handleSubmit}>
                <label>
                    Username: <input name="username" type="text"/>
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
