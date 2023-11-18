import React, {createContext, ReactNode, useContext, useState} from 'react';

interface LoginCredentials {
    username: string;
    password: string;
}

interface AuthContextProps {
    user: LoginCredentials | null;
    login: (credentials: LoginCredentials) => void;
    logout: () => void;
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

interface AuthProviderProps {
    children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({children}) => {
    const [user, setUser] = useState<LoginCredentials | null>(null);

    const login = (credentials: LoginCredentials) => {
        setUser(credentials);
    };

    const logout = () => {
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{user, login, logout}}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};
