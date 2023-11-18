import React, {useState} from 'react';
import {Button, Paper, TextField, Typography,} from '@mui/material';
import {useAuth} from "../AuthProvider";
import {useNavigate} from "react-router-dom";

interface LoginCredentials {
    username: string;
    password: string;
}

const paperStyle: React.CSSProperties = {
    maxWidth: 400,
    margin: 'auto',
    marginTop: 64,
    padding: 24,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
};

const formStyle: React.CSSProperties = {
    width: '100%',
    marginTop: 16,
};

const submitButtonStyle: React.CSSProperties = {
    margin: '24px 0 16px',
};

const LoginPage = () => {
    let authContextProps = useAuth();
    let nav = useNavigate();
    const [credentials, setCredentials] = useState<LoginCredentials>({
        username: '',
        password: '',
    });
    const [validationErrors, setValidationErrors] = useState({
        username: '',
        password: '',
    });

    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault();
        if (credentials.username.length < 3) {
            setValidationErrors((prevErrors) => ({
                ...prevErrors,
                username: 'Username must be at least 3 characters long.',
            }));
            return;
        }

        if (credentials.password.trim() === '') {
            setValidationErrors((prevErrors) => ({
                ...prevErrors,
                password: 'Password is required.',
            }));
            return;
        }

        setValidationErrors({
            username: '',
            password: '',
        });

        // TODO: Send the credentials to the server
        authContextProps?.login(credentials);
        nav('/patients');

    };

    // Event handler for input changes
    const handleInputChange = (
        event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        const {name, value} = event.target;
        setCredentials((prevCredentials) => ({
            ...prevCredentials,
            [name]: value,
        }));
        // Clear validation errors as the user types
        setValidationErrors((prevErrors) => ({
            ...prevErrors,
            [name]: '',
        }));
    };

    return (
        <Paper style={paperStyle} elevation={3}>
            <Typography variant="h5">Login</Typography>
            <form style={formStyle} onSubmit={handleSubmit}>
                <TextField
                    variant="outlined"
                    margin="normal"
                    fullWidth
                    label="Username"
                    name="username"
                    value={credentials.username}
                    onChange={handleInputChange}
                    error={!!validationErrors.username}
                    helperText={validationErrors.username}
                    data-cy={"username-input"}


                />
                <TextField
                    variant="outlined"
                    margin="normal"
                    fullWidth
                    label="Password"
                    type="password"
                    name="password"
                    value={credentials.password}
                    onChange={handleInputChange}
                    error={!!validationErrors.password}
                    helperText={validationErrors.password}
                    data-cy={"password-input"}
                />
                <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    color="primary"
                    style={submitButtonStyle}
                    data-cy={"login-submit-button"}
                >
                    Login
                </Button>
            </form>
        </Paper>
    );
};

export default LoginPage;
