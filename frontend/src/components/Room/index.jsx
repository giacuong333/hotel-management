import React from 'react';

import { convertByteArrayToBase64 } from '../../utils/handleByteArray';

import { BiArea } from 'react-icons/bi';
import { IoBedOutline } from 'react-icons/io5';

const Room = ({ room }) => {
    return (
        <div>
            <div className="position-relative w-full h-full">
                <img src={room.thumbnail? convertByteArrayToBase64(room.thumbnail) 
                    : `https://luxestay.wpthemeverse.com/wp-content/uploads/2024/08/room4-600x500.png`} 
                    alt={room.name} className="w-full h-full" />

                <div
                    className="d-inline-flex align-items-center gap-2 p-2"
                    style={{
                        position: 'absolute',
                        top: '1rem',
                        right: '1rem',
                        zIndex: 10,
                        backgroundColor: 
                            room.status === 1 ? '#C2FFC7' : '#FFB38E'
                    }}
                >
                    <span className="fw-bold">
                        {room.status === 1 ? "Available" : "Unvailable"}
                    </span>
                </div>

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
                        <p className="font-weight-bold">{room.price.toLocaleString('en-US')} VND</p>
                    </span>
                </div>
            </div>

            <div className="border-bottom py-5">
                <div className="d-flex align-items-center justify-content-start gap-4">
                    <span className="d-flex flex-nowrap align-items-center gap-2">
                        <BiArea size={24} /> {room.area}m2
                    </span>
                    <span className="d-flex flex-nowrap align-items-center gap-2">
                        <IoBedOutline size={24} /> {room.bedNum} Beds
                    </span>
                </div>

                <div className="mt-3 d-flex flex-column gap-4">
                    <h3>{room.name}</h3>
                    <p style={{ letterSpacing: '1px', lineHeight: '2rem'}}>
                        {room.description}
                    </p>
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
