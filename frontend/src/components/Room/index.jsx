import React, { useEffect, useRef, useState } from 'react';
import { convertByteArrayToBase64 } from '../../utils/handleByteArray';
import { BiArea } from 'react-icons/bi';
import { IoBedOutline } from 'react-icons/io5';
import formatCurrency from '~/utils/currencyPipe';
import axios from 'axios';
import RightArrow from './images/rightArrow.svg';
import LeftArrow from './images/leftArrow.svg';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import Slider from 'react-slick';

const carouselSettings = {
    infinite: true,
    speed: 2000,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 1500,
    responsive: [
        {
            breakpoint: 1024,
            settings: {
                slidesToShow: 1,
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

const Room = ({ room }) => {
    const slideRef = useRef(null);
    const [gallery, setGallery] = useState([]);

    console.log('Room', room);

    useEffect(() => {
        fetchGallery();
    }, [room.id]);

    const fetchGallery = async () => {
        try {
            const response = await axios.get(`http://localhost:5058/gallery/${room.id}`);

            if (response?.status === 200) {
                const gallery = response?.data?.$values || null;
                room.thumbnail && gallery.unshift({ image: room?.thumbnail });
                setGallery(gallery);
            }
        } catch (error) {
            console.error('Failed to fetch gallery:', error);
        }
    };

    return (
        <div>
            <div className="position-relative w-full h-full">
                <Slider {...carouselSettings} ref={slideRef}>
                    {gallery.map((item) => {
                        return (
                            <img
                                key={item?.id}
                                src={convertByteArrayToBase64(item.image)}
                                alt="Room Thumbnail Is Not Available"
                                className="w-full h-full"
                            />
                        );
                    })}
                </Slider>

                {/* Arrows */}
                <div
                    className="cursor-pointer"
                    style={{
                        position: 'absolute',
                        top: '50%',
                        transform: 'translateY(-50%)',
                        left: 20,
                    }}
                    onClick={() => slideRef.current.slickPrev()}
                >
                    <img src={LeftArrow} alt="Left Arrow" />
                </div>
                <div
                    className="cursor-pointer"
                    style={{
                        position: 'absolute',
                        top: '50%',
                        transform: 'translateY(-50%)',
                        right: 20,
                    }}
                    onClick={() => slideRef.current.slickNext()}
                >
                    <img src={RightArrow} alt="Right Arrow" />
                </div>

                <div
                    className="bg-white d-inline-flex align-items-center gap-2 px-4 py-3 shadow border"
                    style={{
                        position: 'absolute',
                        bottom: '1rem',
                        left: '1rem',
                        zIndex: 10,
                    }}
                >
                    <span className="text-uppercase">From </span>
                    <span className="d-flex align-items-center">
                        <p className="font-weight-bold">{formatCurrency(room?.price)}</p>
                    </span>
                </div>
            </div>

            <div className="border-bottom py-5">
                <div className="d-flex align-items-center justify-content-start gap-4">
                    <span className="d-flex flex-nowrap align-items-center gap-2">
                        <BiArea size={24} /> {room?.area}m2
                    </span>
                    <span className="d-flex flex-nowrap align-items-center gap-2">
                        <IoBedOutline size={24} /> {room?.bedNum} Beds
                    </span>
                </div>

                <div className="mt-3 d-flex flex-column gap-4">
                    <h3>{room?.name}</h3>
                    <p style={{ letterSpacing: '1px', lineHeight: '2rem' }}>{room?.description}</p>
                </div>

                <button
                    className="text-capitalize text-center py-1 secondary-button-hover mt-3 bg-transparent"
                    style={{
                        fontSize: '1rem',
                        width: 'fit-content',
                    }}
                >
                    Explore more
                </button>
            </div>
        </div>
    );
};

export default Room;
