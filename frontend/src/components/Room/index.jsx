import React from 'react';
import { BiArea } from 'react-icons/bi';
import { FaDollarSign } from 'react-icons/fa';
import { IoBedOutline } from 'react-icons/io5';
import { LuUsers2 } from 'react-icons/lu';
import { Link } from 'react-router-dom';

const Room = ({ image, price, area, guest, bed, name, description, exploreMore }) => {
    return (
        <div>
            <div className="position-relative w-full h-full">
                <img src={image} alt={name} className="w-full h-full" />
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
                        <p className="font-weight-bold">{price}</p>
                    </span>
                </div>
            </div>

            <div className="border-bottom py-5">
                <div className="d-flex align-items-center justify-content-start gap-4">
                    <span className="d-flex flex-nowrap align-items-center gap-2">
                        <BiArea size={24} /> {area}m2
                    </span>
                    <span className="d-flex flex-nowrap align-items-center gap-2">
                        <LuUsers2 size={24} /> {guest} Guests
                    </span>
                    <span className="d-flex flex-nowrap align-items-center gap-2">
                        <IoBedOutline size={24} /> {bed} Beds
                    </span>
                </div>

                <div className="mt-3 d-flex flex-column gap-4">
                    <h3>{name}</h3>
                    <p style={{ letterSpacing: '1px', lineHeight: '2rem' }}>
                        The term “Premier Room” generally refers to a high-end hotel room or accommodation that offers
                        advanced amenities and services compared to standard rooms. Premier Rooms often feature:
                    </p>
                </div>

                {exploreMore && (
                    <button
                        className="text-capitalize text-center py-1 secondary-button-hover mt-3 bg-transparent"
                        style={{
                            fontSize: '1rem',
                            width: 'fit-content',
                        }}
                    >
                        Explore more
                    </button>
                )}
            </div>
        </div>
    );
};

export default Room;
