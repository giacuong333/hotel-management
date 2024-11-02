import React from 'react';

const Room = ({ room }) => {
    return (
        <li className="p-2 shadow-sm bg-white cursor-pointer flex-grow-1">
            <div style={{ width: '100%', height: '120px', overflow: 'hidden' }}>
                <img
                    alt="Room"
                    src="https://luxestay.wpthemeverse.com/wp-content/uploads/2024/08/poolside-room-600x500.png"
                    className="w-full h-full"
                    style={{ objectFit: 'cover', objectPosition: 'center' }}
                />
            </div>
            <div className="d-flex align-items-center justify-content-between mt-2">
                <span className="d-flex flex-column">
                    <small className="fw-semibold"># No.301</small>
                    <small>A/c King</small>
                </span>
                <small className="p-1 rounded-1 secondary-bg-color text-white">300k đ/day</small>
            </div>
        </li>
    );
};

export default Room;
