import React from 'react';
import NewsLetter from './NewsLetter';
import Services from './Services';
import Rooms from './Rooms';
import CheckAvailability from './CheckAvailability';
import Testimonial from './Testimonial';

const Home = () => {
    return (
        <section>
            <NewsLetter />
            <Services />
            <Rooms />
            <CheckAvailability />
            <Testimonial />
        </section>
    );
};

export default Home;
