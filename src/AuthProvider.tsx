import React, {createContext, ReactNode, useContext, useState} from 'react';

// Define the type for the login credentials
interface LoginCredentials {
    username: string;
    password: string;
}

// Define the type for the context
interface AuthContextProps {
    user: LoginCredentials | null;
    login: (credentials: LoginCredentials) => void;
    logout: () => void;
}

// Create the context
const AuthContext = createContext<AuthContextProps | undefined>(undefined);

// Define a provider component to wrap your app
interface AuthProviderProps {
    children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({children}) => {
    const [user, setUser] = useState<LoginCredentials | null>(null);

    const login = (credentials: LoginCredentials) => {
        // You might want to perform actual authentication here
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

// Custom hook to use the AuthContext
export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};
