import React from 'react';
import NewsLetter from './NewsLetter';
import Services from './Services';
import Rooms from './Rooms';
import CheckAvailability from './CheckAvailability';
import { Route, Routes } from 'react-router';
import RoomDetail from './RoomDetail';

const Home = () => {
    return (
        <section>
            <NewsLetter />
            <Services />
            <Rooms />
            <CheckAvailability />
        </section>
    );
};

export default Home;
