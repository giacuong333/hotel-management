import React, { useEffect, useState } from 'react';
import Booking from './Booking';
import axios from 'axios';

const Bookings = ({ type }) => {
    const [bookings, setBookings] = useState([]);

    console.log('Bookings', bookings);

    // Fetch bookings
    useEffect(() => {
        if (type === 'booking') fetchBookings('http://localhost:5058/booking/customer_booking');
        else if (type === 'cancelled') fetchBookings('http://localhost:5058/booking/customer_cancelled_booking');
    }, [type]);

    const fetchBookings = async (url) => {
        try {
            const response = await axios.get(url);
            console.log('Response', response);
            if (response?.status === 200) {
                setBookings(response?.data?.$values);
            }
        } catch (error) {
            console.log(error.message);
        }
    };

    return (
        <ul className="d-flex flex-column gap-2">
            {bookings.map((booking) => (
                <Booking booking={booking} key={booking?.id} />
            ))}
        </ul>
    );
};

export default Bookings;
