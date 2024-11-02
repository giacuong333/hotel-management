import React from 'react';
import Room from './Room';

const AvailableRooms = () => {
    return (
        <div>
            <p className="text-capitalize fs-5 fw-semibold mb-2">Available Rooms</p>
            <ul className="d-flex flex-wrap align-items-center justify-content-evenly gap-3">
                <Room />
                <Room />
                <Room />
                <Room />
                <Room />
            </ul>
        </div>
    );
};

export default AvailableRooms;
