import React, { createContext, useContext, useEffect, useState } from 'react';
import axios from 'axios';

import { getAuthHeader } from '../../utils/getAuthHeader';

import { showToast } from '../../utils/showToast';

// Create the role context
const roomContext = createContext();

const RoomProvider = ({ children }) => {
    const [rooms, setRooms] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    // For fetching
    useEffect(() => {
        fetchData('http://localhost:5058/room/empty');
    }, []);

    const fetchData = async (url) => {
        const token = localStorage.getItem('jwtToken');
        if (!token) return;

        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;

        try {
            setLoading(true);
            const headers = { headers: getAuthHeader() };
            const response = await axios.get(url, headers);
            response?.status === 200 && setRooms(response?.data?.$values || response?.data?.obj);
        } catch (err) {
            console.error('Failed to fetch room:', err);
            setRooms(null);
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
        <roomContext.Provider
            value={{
                rooms,
                fetchData,
                loading,
                error,
            }}
        >
            {children}
        </roomContext.Provider>
    );
};

// Custom hook to use the User context
export const useRoom = () => useContext(roomContext);

export default RoomProvider;
