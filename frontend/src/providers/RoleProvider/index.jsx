import React, { createContext, useContext, useEffect, useState } from 'react';
import axios from 'axios';

import { getAuthHeader } from '../../utils/getAuthHeader';

import { showToast } from '../../utils/showToast';

// Create the role context
const roleContext = createContext();

const RoleProvider = ({ children }) => {
    const [roles, setRoles] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    // For fetching
    useEffect(() => {
        const fetchRoles = async () => {
            const token = localStorage.getItem('jwtToken');
            if (!token) return;

            axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;

            try {
                setLoading(true);
                const response = await axios.get('http://localhost:5058/role');
                console.log(response);
                if (response?.status === 200) {
                    setRoles(response?.data?.$values);
                }
            } catch (err) {
                console.error('Failed to fetch user:', err);
                setRoles(null); // Clear user if fetching fails
                handleAuthError(error);
            } finally {
                setLoading(false);
            }
        };

        fetchRoles();
    }, []);

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
        <roleContext.Provider
            value={{
                roles,
                loading,
                error,
            }}
        >
            {children}
        </roleContext.Provider>
    );
};

// Custom hook to use the User context
export const useRole = () => useContext(roleContext);

export default RoleProvider;
