import * as React from "react";
import {
    Routes,
    Route,
} from "react-router-dom";
import { AuthProvider } from './contexts/AuthContext';

import RequireAuth from './pages/Auth';
import Login from './pages/login/Login';
import Register from './pages/register/Register';
import NoMatch from './pages/nomatch/NoMatch';
import Layout from './pages/Layout';
import Products from './pages/products/Products';

function App() {
    return (
        <AuthProvider>
            <Routes>
                <Route path="login" element={<Login/>}/>
                <Route path="register" element={<Register/>}/>

                <Route path="/" element={<Layout/>}>
                    <Route
                        index
                        element={
                            <RequireAuth>
                                <Products/>
                            </RequireAuth>
                        }
                    />
                </Route>

                <Route path="*" element={<NoMatch/>}/>
            </Routes>
        </AuthProvider>
    );
}

export default App;
