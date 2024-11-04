import React from 'react';
import NewsLetter from './NewsLetter';
import Services from './Services';
import Rooms from './Rooms';
import CheckAvailability from './CheckAvailability';
import Testimonial from './Testimonial';
import ExclusiveOffers from './ExclusiveOffers';

const Home = () => {
    return (
        <section>
            <NewsLetter />
            <Services />
            <Rooms />
            <CheckAvailability />
            <Testimonial />
            <ExclusiveOffers />
        </section>
    );
};

export default Home;
