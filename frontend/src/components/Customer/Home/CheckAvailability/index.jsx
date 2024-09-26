import React from 'react';

import BackgroundImage from './images/availability_bg.png';

const CheckAvailability = () => {
    return (
        <section
            style={{
                backgroundImage: `url(${BackgroundImage})`,
                backgroundPosition: 'center',
                backgroundSize: 'cover',
                backgroundRepeat: 'no-repeat',
                padding: '60px 0',
            }}
        >
            <form className="container mx-auto px-lg-0 px-5 d-lg-flex d-block align-items-center justify-content-between gap-2">
                <div className="my-lg-0 my-5">
                    <p className="text-white" style={{ fontSize: '1.2rem' }}>
                        Check-in
                    </p>
                    <input aria-label="Date and time" type="datetime-local" className="customer-datetime-picker" />
                </div>
                <div className="my-lg-0 my-5">
                    <p className="text-white" style={{ fontSize: '1.2rem' }}>
                        Check-out
                    </p>
                    <input aria-label="Date and time" type="datetime-local" className="customer-datetime-picker" />
                </div>
                <div className="my-lg-0 my-5">
                    <p className="text-white" style={{ fontSize: '1.2rem' }}>
                        Rooms
                    </p>
                    <select name="" id="" className="customer-datetime-picker">
                        <option value="">1</option>
                    </select>
                </div>
                <div className="my-lg-0 my-5">
                    <p className="text-white" style={{ fontSize: '1.2rem' }}>
                        Guests
                    </p>
                    <select name="" id="" className="customer-datetime-picker">
                        <option value="">1 Adults</option>
                    </select>
                </div>
                <div className="text-center">
                    <button
                        className="text-uppercase customer-primary-button rounded-circle cursor-pointer bg-hover-black primary-bd-color"
                        style={{
                            width: '160px',
                            height: '160px',
                        }}
                    >
                        Check <br /> Availability
                    </button>
                </div>
            </form>
        </section>
    );
};

export default CheckAvailability;
