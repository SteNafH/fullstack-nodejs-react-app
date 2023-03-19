import React from 'react';

interface AuthContextType {
    token: string;
    signin: (token: string, callback: VoidFunction) => void;
    signout: (callback: VoidFunction) => void;
}

export const AuthContext = React.createContext<AuthContextType>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
    const [token, setToken] = React.useState<string>(localStorage.getItem('jwtToken'));

    const signin = (token: string, callback: VoidFunction) => {
        setToken(token);
        localStorage.setItem('jwtToken', token);
        callback();
    };

    const signout = (callback: VoidFunction) => {
        setToken(null);
        localStorage.removeItem('jwtToken');
        callback();
    };

    let value = { token, signin, signout };

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
