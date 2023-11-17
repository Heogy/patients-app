import React from 'react';
import {Link} from 'react-router-dom';
import {useAuth} from "../AuthProvider";

const HomePage = () => {
    const {user} = useAuth();

    return (
        <div>
            <h1>Welcome to the Home Page</h1>
            {user ? (
                <p>Hello, {user.username}! You are logged in.</p>
            ) : (
                <p>
                    Please <Link to="/login">login</Link> to access the content.
                </p>
            )}
        </div>
    );
};

export default HomePage;
