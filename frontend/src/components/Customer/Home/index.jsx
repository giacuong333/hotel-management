import React from 'react';
import NewsLetter from './NewsLetter';
import Services from './Services';
import Rooms from './Rooms';
import CheckAvailability from './CheckAvailability';

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
