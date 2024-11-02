import React from 'react';
import Top from './Top';
import AvailableRooms from './AvailableRooms';
import BookingDetails from './BookingDetails';
import BookingStatus from './BookingStatus';

const Home = () => {
    return (
        <section className="admin-outlet p-5 bg-light-subtle">
            <div className="d-flex flex-column gap-5">
                <Top />
                <AvailableRooms />
                <BookingStatus />
                <BookingDetails />
            </div>
        </section>
    );
};

export default Home;
