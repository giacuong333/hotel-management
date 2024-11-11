import React, { useState, useEffect, useRef } from 'react';
import { convertByteArrayToBase64 } from "../../../utils/handleByteArray";
import Room from '../../Room';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';

const Rooms = () => {
    const[rooms, setRooms] = useState([]);

    const navigate = useNavigate();

    useEffect(() => {
            fetchRooms();
    }, [])

    const fetchRooms = async () => {
        try {
                const response = await axios.get('http://localhost:5058/room');
                
                if (response?.status === 200) {
                    const roomsData = response?.data?.$values || response?.data?.obj;

                    roomsData.filter(room => !room.deletedAt);
                    roomsData.sort((a, b) => (b.status === 1 ? 1 : 0) - (a.status === 1 ? 1 : 0));
                    
                    setRooms(roomsData);
                }
            } catch (error) {
                console.error('Failed to fetch rooms:', error);
            } 
    }

    const handleRoomClick = (id) => {
        navigate(`/room/${id}`); 
    };

    return (
        <section>
            <div className="container mx-auto">
                <div className="row py-5">
                    {rooms.map((room) => (
                        <div
                            key={room.id}
                            className="col-lg-4 cursor-pointer"
                            onClick={() => handleRoomClick(room.id)} 
                        >
                            <Room
                                room={room}
                            />
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Rooms;
