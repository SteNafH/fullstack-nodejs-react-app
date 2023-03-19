import React from "react";
import { Outlet, Link, useNavigate } from "react-router-dom";
import { useAuth } from '../hooks';

function Layout() {
    const auth = useAuth();
    const navigate = useNavigate();

    return (
        <>
            <nav>
                <Link to="/">Products</Link>
                <button
                    onClick={() => {
                        auth.signout(() => navigate('/'));
                    }}
                >
                    Sign out
                </button>
            </nav>

            <main>
                <Outlet/>
            </main>
        </>
    );
}

export default Layout;
