import React from 'react';
import { GoClock } from 'react-icons/go';
import { FaCalendarAlt } from 'react-icons/fa';
import { FaBlenderPhone } from 'react-icons/fa';
const CardTimeContact = () => {
    return (
        <div>
            <div className="p-lg-5" style={{ backgroundColor: '#E8BF96' }}>
                <div class="row">
                    <div class="col-sm-4" style={{borderLeft:"1px,solid"}}>
                        <div className="row ">
                            <div className="col-sm-2">
                                <FaCalendarAlt size={70} />
                            </div>
                            <div className="col-sm-8" style={{ lineHeight: '3rem', fontFamily: 'Nanum Myeongjo' }}>
                                <h3>Opening Date:</h3>
                                <p style={{ fontSize: '1.3rem' }}>Monday - Saturday</p>
                            </div>
                        </div>
                    </div>
                    <div class="col-sm-4">
                        <div className="row">
                            <div className="col-sm-2">
                                <GoClock size={68} />
                            </div>
                            <div className="col-sm-8" style={{ lineHeight: '3rem', fontFamily: 'Nanum Myeongjo' }}>
                                <h3>Opening Hours:</h3>
                                <p style={{ fontSize: '1.3rem' }}>06:00 am – 22:00 pm</p>
                            </div>
                        </div>
                    </div>
                    <div class="col-sm-4">
                        <div className="row">
                            <div className="col-sm-2">
                                <FaBlenderPhone size={70} />
                            </div>
                            <div className="col-sm-8" style={{ lineHeight: '3rem', fontFamily: 'Nanum Myeongjo' }}>
                                <h3>Phone Booking:</h3>
                                <p style={{ fontSize: '1.3rem' }}>+8498416537</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CardTimeContact;
