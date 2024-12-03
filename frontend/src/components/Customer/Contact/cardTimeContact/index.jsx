import React from 'react';
import { GoClock } from 'react-icons/go';
import { FaCalendarAlt } from 'react-icons/fa';
import { FaBlenderPhone } from 'react-icons/fa';
const CardTimeContact = () => {
    return (
        <div>
            <div className='container pb-5'>
            <div className="p-lg-5 " style={{ backgroundColor: '#E8BF96' }}>
                <div class="row ">
                    <div class="col-sm-4" >
                        <div className="row " style={{borderRight:"1px solid"}}>
                            <div className="col-sm-3 px-lg-4">
                                <FaCalendarAlt size={70} />
                            </div>
                            <div className="col-sm-8" style={{ lineHeight: '3rem', fontFamily: 'Nanum Myeongjo' }}>
                                <h3>Opening Date:</h3>
                                <p style={{ fontSize: '1.3rem' }}>Monday - Saturday</p>
                            </div>
                        </div>
                    </div>
                    <div class="col-sm-4">
                        <div className="row" style={{borderRight:"1px solid"}}>
                            <div className="col-sm-3 px-lg-4">
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
                            <div className="col-sm-3 px-lg-4" >
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
           
        </div>
    );
};

export default CardTimeContact;
