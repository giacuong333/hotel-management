import React, { createContext, useContext, useEffect, useState } from 'react';
import axios from 'axios';

import { getAuthHeader } from '../../utils/getAuthHeader';

import { showToast } from '../../utils/showToast';

// Create the service context
const serviceContext = createContext();

const ServiceProvider = ({ children }) => {
    const [services, setServices] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    // For fetching
    useEffect(() => {
        fetchData('http://localhost:5058/service/active');
    }, []);

    const fetchData = async (url) => {
        const token = localStorage.getItem('jwtToken');
        if (!token) return;

        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;

        try {
            setLoading(true);
            const headers = { headers: getAuthHeader() };
            const response = await axios.get(url, headers);
            response?.status === 200 && setServices(response?.data?.service || response?.data?.$values);
        } catch (err) {
            console.error('Failed to fetch service:', err);
            setServices(null);
            handleAuthError(error);
        } finally {
            setLoading(false);
        }
    };

    // Helper to handle API errors and show corresponding toast messages
    const handleAuthError = (error) => {
        if (error.response?.status === 404) {
            showToast('Room not found.', 'error');
        } else if (error.response?.status === 500) {
            showToast('Server error, please try again later.', 'error');
        } else {
            showToast(error.message, 'error');
        }
        setError('Failed to process request. Please try again.');
    };

    return (
        <serviceContext.Provider
            value={{
                services,
                fetchData,
                loading,
                error,
            }}
        >
            {children}
        </serviceContext.Provider>
    );
};

// Custom hook to use the User context
export const useService = () => useContext(serviceContext);

export default ServiceProvider;
