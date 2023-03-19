import React from "react";
import { Outlet, Link, useNavigate } from "react-router-dom";
import { useAuth } from '../hooks';

function Layout() {
    const auth = useAuth();
    const navigate = useNavigate();

    return (
        <>
            <nav>
                <ul>
                    <li>
                        <Link to="/">Products</Link>
                    </li>
                    <li>
                        <button
                            onClick={() => {
                                auth.signout(() => navigate('/'));
                            }}
                        >
                            Sign out
                        </button>
                    </li>
                </ul>
            </nav>

            <main>
                <Outlet/>
            </main>
        </>
    );
}

export default Layout;
