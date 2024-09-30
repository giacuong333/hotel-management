import React from 'react';

import Room from '../../Room';
import { Link } from 'react-router-dom';

const Rooms = () => {
    return (
        <section>
            <div className="container mx-auto">
                <div className="row py-5">
                    <Link to={`/room/:id`} className="col-lg-4 cursor-pointer">
                        <Room
                            image={`https://luxestay.wpthemeverse.com/wp-content/uploads/2024/08/room4-600x500.png`}
                            price={399}
                            name="Beach Room"
                            area={60}
                            guest={8}
                            bed={3}
                            exploreMore
                        />
                    </Link>
                    <Link to={`/room/:id`} className="col-lg-4 cursor-pointer">
                        <Room
                            image={`https://luxestay.wpthemeverse.com/wp-content/uploads/2024/08/poolside-room-600x500.png`}
                            price={299}
                            name="Hill Room"
                            area={30}
                            guest={2}
                            bed={1}
                            exploreMore
                        />
                    </Link>
                    <Link to={`/room/:id`} className="col-lg-4 cursor-pointer">
                        <Room
                            image={`https://luxestay.wpthemeverse.com/wp-content/uploads/2024/08/room2-600x500.png`}
                            price={265}
                            name="City Room"
                            area={50}
                            guest={5}
                            bed={2}
                            exploreMore
                        />
                    </Link>
                    <Link to={`/room/:id`} className="col-lg-4 cursor-pointer">
                        <Room
                            image={`https://luxestay.wpthemeverse.com/wp-content/uploads/2024/08/room4-600x500.png`}
                            price={399}
                            name="Beach Room"
                            area={60}
                            guest={8}
                            bed={3}
                            exploreMore
                        />
                    </Link>
                    <Link to={`/room/:id`} className="col-lg-4 cursor-pointer">
                        <Room
                            image={`https://luxestay.wpthemeverse.com/wp-content/uploads/2024/08/poolside-room-600x500.png`}
                            price={299}
                            name="Hill Room"
                            area={30}
                            guest={2}
                            bed={1}
                            exploreMore
                        />
                    </Link>
                    <Link to={`/room/:id`} className="col-lg-4 cursor-pointer">
                        <Room
                            image={`https://luxestay.wpthemeverse.com/wp-content/uploads/2024/08/room2-600x500.png`}
                            price={265}
                            name="City Room"
                            area={50}
                            guest={5}
                            bed={2}
                            exploreMore
                        />
                    </Link>
                </div>
            </div>
        </section>
    );
};

export default Rooms;
