import React from 'react';

import BackgroundImage from './images/footer_bg.png';

import RoomList from './RoomList';

const Rooms = () => {
    return (
        <section
            style={{
                background: `url(${BackgroundImage})`,
                backgroundPosition: 'center',
                backgroundSize: 'cover',
                height: 'fit-content',
                paddingBottom: '4rem',
            }}
        >
            <div className="container mx-auto py-5">
                <div className="row pb-5">
                    <div className="col-lg-6">
                        <p
                            className="text-uppercase text-start"
                            style={{
                                fontSize: '3.2rem',
                            }}
                        >
                            YOUR COMFORT IS OUR PRIORITY
                        </p>
                    </div>
                    <div className="col-lg-6">
                        <p
                            className="text-start"
                            style={{
                                lineHeight: '2.4rem',
                                fontSize: '1rem',
                            }}
                        >
                            Our Comfort Is Our Priority” expresses a commitment to providing the highest level of
                            comfort and satisfaction for our customers. Whether you’re staying with us, using our
                            services, or purchasing our products, we prioritize your needs and ensure a relaxing and
                            enjoyable experience.
                        </p>
                    </div>
                </div>
            </div>
            <div className="w-full pl-76">
                <div className="row d-lg-flex d-block align-items-center gap-4 flex-nowrap overflow-hidden">
                    <RoomList />
                </div>
            </div>
        </section>
    );
};

export default Rooms;
