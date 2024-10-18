import React, { createContext, useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { getAuthHeader } from '../../utils/getAuthHeader';
import { showToast } from '../../utils/showToast';
import { useNavigate } from 'react-router';

// Create the UserContext
const userContext = createContext();

const UserProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [isCreatingAccount, setIsCreatingAccount] = useState(false);
    const [isLogginginAccount, setIsLogginginAccount] = useState(false);
    // const navigate = useNavigate();

    // useEffect(() => {
    //     const interceptor = axios.interceptors.response.use(
    //         (response) => response,
    //         (error) => {
    //             if (error.response?.status === 401) {
    //                 showToast('Session expired. Please log in again.', 'error');
    //                 localStorage.removeItem('jwtToken');
    //                 delete axios.defaults.headers.common['Authorization'];
    //                 setUser(null);
    //                 navigate('/');
    //             }
    //             return Promise.reject(error);
    //         },
    //     );
    //     return () => axios.interceptors.response.eject(interceptor);
    // }, [navigate]);

    useEffect(() => {
        fetchUser();
    }, []);

    const fetchUser = async () => {
        const token = localStorage.getItem('jwtToken');
        if (!token) return;

        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;

        try {
            setLoading(true);
            const url = 'http://localhost:5058/user/profile';
            const headers = { headers: getAuthHeader() };
            const response = await axios.get(url, headers);
            setUser(response.data.user);
        } catch (err) {
            console.error('Failed to fetch user:', err);
            setUser(null);
        } finally {
            setLoading(false);
        }
    };

    // User Sign In function
    const signIn = async (payload) => {
        try {
            setIsLogginginAccount(true);
            const url = 'http://localhost:5058/user/login';
            const headers = { headers: { 'Content-Type': 'application/json' } };
            const response = await axios.post(url, payload, headers);
            if (response.status === 200) {
                const { token } = response.data;
                localStorage.setItem('jwtToken', token);
                axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
                await fetchUser();
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
            const url = 'http://localhost:5058/user/register';
            const headers = { headers: { 'Content-Type': 'application/json' } };
            const response = await axios.post(url, payload, headers);
            if (response.status === 201) return response;
        } catch (error) {
            handleAuthError(error);
        } finally {
            setIsCreatingAccount(false);
        }
    };

    // User Sign Out function
    const signOut = async () => {
        try {
            setLoading(true);
            const url = 'http://localhost:5058/user/logout';
            const headers = { headers: { ...getAuthHeader() } };
            const response = await axios.post(url, {}, headers);
            if (response.status === 200) {
                localStorage.removeItem('jwtToken');
                delete axios.defaults.headers.common['Authorization'];
                setUser(null);
            }
        } catch (error) {
            console.error('Logout failed:', error);
        } finally {
            setLoading(false);
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
                fetchUser,
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
