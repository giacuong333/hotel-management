import axios from 'axios';
import React, { useState, useEffect } from 'react';
import Room from './Room';

const AvailableRooms = () => {
    const [availables, setAvailables] = useState([]);

    useEffect(() => {
        const fetchData = async (url, setter) => {
            try {
                const response = await axios.get(url, { headers: { 'Content-Type': 'application/json' } });
                if (response.status === 200) {
                    setter(response.data?.$values);
                }
            } catch (error) {
                console.log('Error fetching:', error);
            }
        };

        fetchData('http://localhost:5058/dashboard/availablerooms', setAvailables);
    }, []);
    return (
        <div>
            <p className="text-capitalize fs-5 fw-semibold mb-2">Available Rooms</p>
            <ul className="d-flex flex-wrap align-items-center justify-content-evenly gap-3">
                {availables.slice(0, 5).map((room) => {
                    console.log('name room:', room.Name);
                    console.log(availables);
                    return <Room key={room.id} id={room.id} name={room.name || ''} price={room.price} />;
                })}
            </ul>
        </div>
    );
};

export default AvailableRooms;
