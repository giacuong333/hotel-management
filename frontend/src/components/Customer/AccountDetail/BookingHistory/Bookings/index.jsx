import React, { useCallback, useEffect, useState } from 'react';
import Booking from './Booking';
import axios from 'axios';

const Bookings = ({ type }) => {
    const [bookings, setBookings] = useState([]);

    const fetchBookings = useCallback(
        async (url) => {
            try {
                const response = await axios.get(url);
                if (response?.status === 200) {
                    const data = response?.data?.$values;
                    if (type === 'booking') {
                        setBookings(data.sort((b) => (b?.status === 3 ? 1 : -1)));
                    } else {
                        setBookings(data);
                    }
                }
            } catch (error) {
                console.log(error.message);
            }
        },
        [type],
    );

    useEffect(() => {
        if (type === 'booking') fetchBookings('http://localhost:5058/booking/customer_booking');
        else if (type === 'cancelled') fetchBookings('http://localhost:5058/booking/customer_cancelled_booking');
    }, [type, fetchBookings]);

    return (
        <ul className="d-flex flex-column gap-2">
            {bookings.map((booking) => (
                <Booking booking={booking} key={booking?.id} />
            ))}
        </ul>
    );
};

export default Bookings;
