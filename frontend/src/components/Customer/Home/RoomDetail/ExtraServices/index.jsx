import React from 'react';
import Service from './Service';

const ExtraServices = () => {
    return (
        <ul className="d-flex flex-column gap-4">
            <Service id="room-cleaning" label="Room Cleaning" price="$ 20" />
            <Service id="airport-transport" label="Airport Transport" price="$ 15 / per person" />
            <Service id="bike-rental" label="Bike Rental" price="$ 20 / per person" />
            <Service id="massage" label="Massage" price="$ 100 / per person" />
            <Service id="parking" label="Parking" price="free" />
        </ul>
    );
};

export default ExtraServices;
