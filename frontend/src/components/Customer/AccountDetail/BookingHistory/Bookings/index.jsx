import React, { useState } from 'react';
import Booking from './Booking';

const Bookings = () => {
    const [bookings, setBookings] = useState([]);
    return (
        <ul className="d-flex flex-column gap-2">
            <Booking />
            <Booking />
            <Booking />
            <Booking />
            <Booking />
            <Booking />
        </ul>
    );
};

export default Bookings;
