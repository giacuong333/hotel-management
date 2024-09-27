import React from 'react';

import ExtraServices from './ExtraServices';
import GalleryList from './GalleryList';

import { FaDollarSign } from 'react-icons/fa6';
import { BiArea } from 'react-icons/bi';
import { LuUsers2 } from 'react-icons/lu';
import { IoBedOutline } from 'react-icons/io5';
import { TbAirConditioning } from 'react-icons/tb';
import { IoTvOutline } from 'react-icons/io5';
import { GiHollowCat } from 'react-icons/gi';
import { BsBox } from 'react-icons/bs';
import { PiBathtub } from 'react-icons/pi';
import { PiHairDryer } from 'react-icons/pi';
import { CgSmartHomeRefrigerator } from 'react-icons/cg';
import { IoWifiOutline } from 'react-icons/io5';
import NoSmoking from './images/noSmoking.svg';
import Belonging from './images/belonging.svg';

const RoomDetail = () => {
    return (
        <section>
            <div
                className="container mx-auto"
                style={{
                    padding: '4rem 0',
                }}
            >
                <div className="row">
                    <div className="col-lg-8 px-lg-0">
                        <div className="px-4">
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
                                        <FaDollarSign />
                                        <p className="font-weight-bold">120.000 VND</p>
                                    </span>
                                </div>
                            </div>

                            <div className="border-bottom py-5">
                                <div className="d-flex align-items-center justify-content-start gap-4">
                                    <span className="d-flex flex-nowrap align-items-center gap-2">
                                        <BiArea size={24} /> 60m2
                                    </span>
                                    <span className="d-flex flex-nowrap align-items-center gap-2">
                                        <LuUsers2 size={24} /> 6 Guests
                                    </span>
                                    <span className="d-flex flex-nowrap align-items-center gap-2">
                                        <IoBedOutline size={24} /> 3 Beds
                                    </span>
                                </div>

                                <div className="mt-3 d-flex flex-column gap-4">
                                    <h3>Premier Room</h3>
                                    <p style={{ letterSpacing: '1px' }}>
                                        The term “Premier Room” generally refers to a high-end hotel room or
                                        accommodation that offers advanced amenities and services compared to standard
                                        rooms. Premier Rooms often feature:
                                    </p>
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

                            <div className="py-5">
                                <h3>House Rules</h3>
                                <div className="row">
                                    <div className="col-lg-6 text-start">
                                        <span className="d-flex align-items-center justify-content-start gap-3 fs-5 my-4">
                                            <img src={NoSmoking} alt="" />
                                            <p>No smoking</p>
                                        </span>
                                        <span className="d-flex align-items-center justify-content-start gap-3 fs-5 my-4">
                                            <img src={Belonging} alt="" />
                                            <p>Keep belongings safe</p>
                                        </span>
                                    </div>
                                </div>
                            </div>

                            <div className="w-full">
                                <GalleryList />
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-4">
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
                                <span className="d-flex flex-column gap-2">
                                    <p>Rooms</p>
                                    <select
                                        aria-label="Date and time"
                                        type="datetime-local"
                                        className="customer-datetime-picker room-detail"
                                    >
                                        <option value="">1</option>
                                    </select>
                                </span>
                                <span className="d-flex flex-column gap-2">
                                    <p>Guests</p>
                                    <select
                                        aria-label="Date and time"
                                        type="datetime-local"
                                        className="customer-datetime-picker room-detail"
                                    >
                                        <option value="">1 Adult</option>
                                    </select>
                                </span>
                            </div>
                            <div className="d-flex flex-column gap-4">
                                <p className="text-start fs-3 py-2 pt-0">Extra Services</p>
                                <ExtraServices />
                                <div className="bg-white border p-3">
                                    <p className="fs-4">Your Price</p>
                                    <p className="fs-5">$ 619</p>
                                </div>
                                <div className="d-flex align-items-center gap-1">
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
                </div>
            </div>
        </section>
    );
};

export default RoomDetail;
