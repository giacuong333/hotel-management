import React, { createContext, useContext, useEffect, useState } from 'react';
import axios from 'axios';

import { getAuthHeader } from '../../utils/getAuthHeader';

import { showToast } from '../../utils/showToast';

// Create the UserContext
const userContext = createContext();

const UserProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [isCreatingAccount, setIsCreatingAccount] = useState(false);
    const [isLogginginAccount, setIsLogginginAccount] = useState(false);

    useEffect(() => {
        const fetchUser = async () => {
            const token = localStorage.getItem('jwtToken');
            if (!token) return;

            try {
                setLoading(true);
                const response = await axios.get('http://localhost:5058/user/profile', {
                    headers: getAuthHeader(),
                });
                setUser(response.data.user); // Adjust this according to your API response
            } catch (err) {
                console.error('Failed to fetch user:', err);
                setUser(null); // Clear user if fetching fails
            } finally {
                setLoading(false);
            }
        };

        fetchUser();
    }, []);

    // User Sign In function
    const signIn = async (payload) => {
        try {
            setIsLogginginAccount(true);
            const response = await axios.post('http://localhost:5058/user/login', payload, {
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (response.status === 200) {
                const { token, user } = response.data;
                localStorage.setItem('jwtToken', token);
                setUser(user); // Set user after successful login
                return response;
            }
        } catch (error) {
            handleAuthError(error);
        } finally {
            setIsLogginginAccount(false);
        }
    };

    // User Sign Up function
    const signUp = async (payload) => {
        try {
            setIsCreatingAccount(true);
            const response = await axios.post('http://localhost:5058/user/register', payload, {
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            if (response.status === 201) {
                return response;
            }
        } catch (error) {
            handleAuthError(error);
        } finally {
            setIsCreatingAccount(false);
        }
    };

    // User Sign Out function
    const signOut = async () => {
        try {
            const response = await axios.post(
                'http://localhost:5058/user/logout',
                {}, // Empty body
                {
                    headers: {
                        ...getAuthHeader(),
                    },
                },
            );
            if (response.status === 200) {
                localStorage.removeItem('jwtToken');
                setUser(null); // Clear the user after logout
            }
        } catch (error) {
            console.error('Logout failed:', error);
        }
    };

    // Helper to handle API errors and show corresponding toast messages
    const handleAuthError = (error) => {
        if (error.response?.status === 404) {
            showToast('User not found.', 'error');
        } else if (error.response?.status === 401) {
            showToast('Invalid credentials.', 'error');
        } else if (error.response?.status === 409) {
            showToast('Email or phone number already exists.', 'error');
        } else if (error.response?.status === 500) {
            showToast('Server error, please try again later.', 'error');
        } else {
            showToast(error.message, 'error');
        }
        setError('Failed to process request. Please try again.');
    };

    return (
        <userContext.Provider
            value={{
                user,
                loading,
                error,
                signIn,
                signUp,
                signOut,
                isCreatingAccount,
                isLogginginAccount,
            }}
        >
            {children}
        </userContext.Provider>
    );
};

// Custom hook to use the User context
export const useUser = () => useContext(userContext);

export default UserProvider;
