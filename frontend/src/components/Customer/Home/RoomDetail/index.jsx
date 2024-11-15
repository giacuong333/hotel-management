import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';

import ExtraServices from './ExtraServices';
import GalleryList from './GalleryList';
import { useUser } from '../../../../providers/UserProvider';

import { BiArea } from 'react-icons/bi';
import { IoBedOutline } from 'react-icons/io5';
import { TbAirConditioning } from 'react-icons/tb';
import { IoTvOutline } from 'react-icons/io5';
import { GiHollowCat } from 'react-icons/gi';
import { BsBox } from 'react-icons/bs';
import { PiBathtub } from 'react-icons/pi';
import { PiHairDryer } from 'react-icons/pi';
import { CgSmartHomeRefrigerator } from 'react-icons/cg';
import { IoWifiOutline } from 'react-icons/io5';
import Reviews from './Reviews';
import formatCurrency from '~/utils/currencyPipe';

const RoomDetail = () => {
    const [roomDetail, setRoomDetail] = useState({});
    const { user } = useUser();
    const isAuthenticated = user !== null;

    const { id } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        if (!id) {
            console.error('Room ID is undefined.');
            return;
        }
        fetchRoom();
    }, [id]);

    const fetchRoom = async () => {
        try {
            const response = await axios.get(`http://localhost:5058/room/${id}`);

            if (response?.status === 200) {
                const roomData = response?.data || null;

                console.log(roomData);

                if (roomData) {
                    setRoomDetail(roomData);
                } else {
                    console.error('Undefined value:', response.data);
                }
            }
        } catch (error) {
            console.error('Failed to fetch room:', error);
        }
    };

    const handleBookNow = () => {
        if (isAuthenticated) {
            navigate('/proceed-payment');
        } else {
            navigate('/signin');
        }
    };

    return (
        <section>
            <div className="container mx-auto">
                <div className="row">
                    <div className="col-lg-8 px-lg-0">
                        <div className="px-2 pt-4">
                            <div className="position-relative w-full h-full">
                                <img
                                    src="https://luxestay.wpthemeverse.com/wp-content/uploads/2024/08/classic-room.png"
                                    alt=""
                                    className="w-full h-full"
                                />
                                <div
                                    className="bg-white d-inline-flex align-items-center gap-2 px-4 py-3"
                                    style={{
                                        position: 'absolute',
                                        bottom: '1rem',
                                        left: '1rem',
                                        zIndex: 10,
                                    }}
                                >
                                    <span className="text-uppercase">From </span>
                                    <span className="d-flex align-items-center">
                                        <p className="font-weight-bold">{formatCurrency(roomDetail?.price)}</p>
                                    </span>
                                </div>
                            </div>

                            <div className="border-bottom py-5">
                                <div className="d-flex align-items-center justify-content-start gap-4">
                                    <span className="d-flex flex-nowrap align-items-center gap-2">
                                        <BiArea size={24} /> {roomDetail?.area}m2
                                    </span>
                                    <span className="d-flex flex-nowrap align-items-center gap-2">
                                        <IoBedOutline size={24} /> {roomDetail?.bedNum} Beds
                                    </span>
                                </div>

                                <div className="mt-3 d-flex flex-column gap-4">
                                    <h3>{roomDetail?.name}</h3>
                                    <p style={{ letterSpacing: '1px' }}>{roomDetail?.description}</p>
                                </div>
                            </div>

                            <div className="border-bottom py-5">
                                <h3>Amenities</h3>
                                <div className="row">
                                    <div className="col-lg-6 text-start">
                                        <span className="d-flex align-items-center justify-content-start gap-3 fs-5 my-4">
                                            <TbAirConditioning size={30} />
                                            <p>Air Conditioner</p>
                                        </span>
                                        <span className="d-flex align-items-center justify-content-start gap-3 fs-5 my-4">
                                            <IoTvOutline size={30} />
                                            <p>Cable TV</p>
                                        </span>
                                        <span className="d-flex align-items-center justify-content-start gap-3 fs-5 my-4">
                                            <GiHollowCat size={30} />
                                            <p>Pet Friendly</p>
                                        </span>
                                        <span className="d-flex align-items-center justify-content-start gap-3 fs-5 my-4">
                                            <BsBox size={30} />
                                            <p>Safe Box</p>
                                        </span>
                                    </div>

                                    <div className="col-lg-6 text-start">
                                        <span className="d-flex align-items-center justify-content-start gap-3 fs-5 my-4">
                                            <PiBathtub size={30} />
                                            <p>Bathtub</p>
                                        </span>
                                        <span className="d-flex align-items-center justify-content-start gap-3 fs-5 my-4">
                                            <PiHairDryer size={30} />
                                            <p>Hair Dryer</p>
                                        </span>
                                        <span className="d-flex align-items-center justify-content-start gap-3 fs-5 my-4">
                                            <CgSmartHomeRefrigerator size={30} />
                                            <p>Refrigerator</p>
                                        </span>
                                        <span className="d-flex align-items-center justify-content-start gap-3 fs-5 my-4">
                                            <IoWifiOutline size={30} />
                                            <p>Wifi & Internet</p>
                                        </span>
                                    </div>
                                </div>
                            </div>

                            <div className="w-full">
                                <GalleryList />
                            </div>
                        </div>
                    </div>

                    {roomDetail?.status === 1 ? (
                        <div className="col-lg-4 pt-4">
                            <div className="customer-third-bg-color p-4">
                                <p className="text-center fs-3 p-2 pt-0">Your Reservation</p>
                                <div className="py-3 d-flex flex-column gap-4">
                                    <span className="d-flex flex-column gap-2">
                                        <p>Check-in</p>
                                        <input
                                            aria-label="Date and time"
                                            type="datetime-local"
                                            className="customer-datetime-picker room-detail"
                                        />
                                    </span>
                                    <span className="d-flex flex-column gap-2">
                                        <p>Check-out</p>
                                        <input
                                            aria-label="Date and time"
                                            type="datetime-local"
                                            className="customer-datetime-picker room-detail"
                                        />
                                    </span>
                                </div>
                                <div className="d-flex flex-column gap-4">
                                    <p className="text-start fs-3 py-2 pt-0">Extra Services</p>
                                    <ExtraServices />
                                    <div className="bg-white border p-3">
                                        <p className="fs-5">Your Price</p>
                                        <p className="fs-5 fw-bold">619 VND</p>
                                    </div>
                                    <div className="d-flex align-items-center gap-1" onClick={handleBookNow}>
                                        <button
                                            variant="primary"
                                            className="customer-primary-button p-3 rounded-0 text-uppercase flex-grow-1 text-center text-uppercase text-white"
                                        >
                                            Book Now
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ) : (
                        <div className="col-lg-4 pt-4 d-flex">
                            <h3>Unavailable</h3>
                        </div>
                    )}
                </div>

                <div className="row my-5">
                    <div className="col-lg-8 px-lg-0 px-4">
                        <Reviews />
                    </div>
                </div>
            </div>
        </section>
    );
};

export default RoomDetail;
