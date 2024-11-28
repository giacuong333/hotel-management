import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { convertByteArrayToBase64 } from '../../../../../utils/handleByteArray';
import Room from './Room';
import Room1 from '../images/room1.png';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import Slider from 'react-slick';

const carouselSettings = {
    infinite: true,
    speed: 2000,
    slidesToShow: 2,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
    responsive: [
        {
            breakpoint: 1024,
            settings: {
                slidesToShow: 2,
            },
        },
        {
            breakpoint: 600,
            settings: {
                slidesToShow: 1,
            },
        },
    ],
};

const RoomList = () => {
    const slideRef = useRef(null);
    const [rooms, setRooms] = useState([]);

    useEffect(() => {
        fetchRooms();
    }, []);

    const fetchRooms = async () => {
        try {
            const response = await axios.get('http://localhost:5058/room');

            if (response?.status === 200) {
                const roomsData = response?.data?.$values || response?.data?.obj;
                roomsData.filter((room) => room.status === 1 && !room.deletedAt);
                setRooms(roomsData);
            }
        } catch (error) {
            console.error('Failed to fetch room:', error);
        }
    };

    return (
        <div className="position-relative">
            <Slider {...carouselSettings} ref={slideRef}>
                {rooms.map((room) => {
                    console.log('Room: ', room);
                    return (
                        <Room
                            key={room?.id}
                            image={room?.thumbnail ? convertByteArrayToBase64(room?.thumbnail) : Room1}
                            price={room?.price}
                            name={room?.name}
                            area={room?.area}
                            bed={room?.bedNum}
                            id={room?.id}
                        />
                    );
                })}
            </Slider>
            <div
                className="position-absolute"
                tabIndex="0"
                role="button"
                aria-label="Previous slide"
                style={{
                    top: '50%',
                    left: 12,
                    transform: 'translateY(-50%)',
                }}
                onClick={() => slideRef.current.slickPrev()}
            >
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    xmlnsXlink="http://www.w3.org/1999/xlink"
                    x="0px"
                    y="0px"
                    width="22.25px"
                    height="41.25px"
                    viewBox="0 0 22.25 41.25"
                    enableBackground="new 0 0 22.25 41.25"
                    xmlSpace="preserve"
                >
                    <polyline
                        fill="none"
                        stroke="#000000"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeMiterlimit="10"
                        points="21.67,5.45 21.67,0.67 0.67,20.67 21.67,40.67 21.67,35.88 "
                    ></polyline>
                </svg>
            </div>
        </div>
    );
};

export default RoomList;
