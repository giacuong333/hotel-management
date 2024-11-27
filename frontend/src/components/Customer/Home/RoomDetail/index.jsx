import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import Slider from 'react-slick';

import ExtraServices from './ExtraServices';
import GalleryList from './GalleryList';
import Reviews from './Reviews';
import formatCurrency from '~/utils/currencyPipe';
import { convertByteArrayToBase64 } from '~/utils/handleByteArray';
import { useUser } from '../../../../providers/UserProvider';
import ToastContainer, { showToast } from '~/utils/showToast';
import formatDate from '~/utils/formatDate';

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
import RightArrow from './images/rightArrow.svg';
import LeftArrow from './images/leftArrow.svg';
import DatePicker from 'react-datepicker';
import { Alert } from 'bootstrap/dist/js/bootstrap.bundle.min';

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

const RoomDetail = () => {
    const { id } = useParams();
    const [roomDetail, setRoomDetail] = useState({});
    const [gallery, setGallery] = useState([]);
    const [ bookedDates, setBookedDates ] = useState([]);
    const [ checkInDate, setCheckInDate ] = useState();
    const [ checkOutDate, setCheckOutDate ] = useState();
    const [selectedServices, setSelectedServices] = useState([]);

    const { user } = useUser();
    const isAuthenticated = user !== null;

    const navigate = useNavigate();
    const slideRef = useRef(null);

    useEffect(() => {
        if (!id) {
            console.error('Room ID is undefined.');
            return;
        }
        fetchRoom();
        fetchGallery();
        fetchBookedDates();
    }, [id]);

    useEffect(()=>{
        console.log(bookedDates);
    },[bookedDates])

    useEffect(()=>{
        console.log("Check-in: ", checkInDate);
        console.log("Check-out: ", checkOutDate);
    }, [checkInDate, checkOutDate])

    useEffect(()=>{
        console.log('Selected Services:', selectedServices);
    }, [selectedServices])

    const fetchGallery = async () => {
        try {
            const response = await axios.get(`http://localhost:5058/gallery/${id}`);
            if (response?.status === 200) {
                const gallery = response?.data?.$values || null;
                roomDetail.thumbnail && gallery.unshift({ image: roomDetail?.thumbnail });
                setGallery(gallery);
            }
        } catch (error) {
            console.error('Failed to fetch gallery:', error);
        }
    };

    const fetchRoom = async () => {
        try {
            const response = await axios.get(`http://localhost:5058/room/${id}`);
            if (response?.status === 200) {
                const roomData = response?.data || null;
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

    const fetchBookedDates = async () => {
        try {
            const response = await axios.get(`http://localhost:5058/booking/room/${id}`);
            console.log("Reponse: ", response);
            
            if (response?.status === 200) {
                const bookingData = response?.data?.$values || response?.data?.obj;;
                console.log("Booking data: ", bookingData);
                
                if (bookingData) {
                    const allBookedDates = bookingData.map((booking) => {
                        return getDatesInRange(booking.checkIn, booking.checkOut);
                      });
            
                      // Dùng flatMap để chuyển đổi mảng 2 chiều thành mảng 1 chiều
                    setBookedDates(allBookedDates.flat());
                } else {
                    console.error('Undefined value:', response.data);
                }
            }
        } catch (error) {
            console.error('Failed to fetch booked dates:', error);
        }
    };

    const handleBookNow = () => {
        navigate('/proceed-payment');
    };

    const getDatesInRange = (startDate, endDate) => {
        let dates = [];
        let currentDate = new Date(startDate);
        const end = new Date(endDate);

        while (currentDate <= end) {
            dates.push(new Date(currentDate));
            currentDate.setDate(currentDate.getDate() + 1);
        }

        return dates;
    };

    const handleCheckInDateChange = (date) => {
        setCheckInDate(date);
    }

    const handleCheckOutDateChange = (date) => {
        setCheckOutDate(date);
    }

    const handleServicesChange = (services) => {
        setSelectedServices(services);
    };

    const calculateDays = (checkInDate, checkOutDate) => {
        if(!checkInDate || !checkOutDate) {
            return 0
        }
        // Chuyển chuỗi ngày thành đối tượng Date
        const checkIn = new Date(checkInDate);
        const checkOut = new Date(checkOutDate);
    
        // Tính chênh lệch thời gian (millisecond)
        const timeDifference = checkOut - checkIn;
    
        // Tính số ngày (chênh lệch thời gian chia cho số milliseconds trong 1 ngày)
        const days = timeDifference / (24 * 60 * 60 * 1000);
    
        // Nếu check-in bằng hoặc sau check-out thì trả về 0
        return days > 0 ? days : 0;
    };

    return (
        <section>
            <div className="container mx-auto">
                {ToastContainer}
                <div className="row">
                    <div className="col-lg-8 px-lg-0">
                        <div className="px-2 pt-4">
                            <div className="position-relative w-full h-full">
                                <Slider {...carouselSettings} ref={slideRef}>
                                    {gallery.map((item) => {
                                        return (
                                            <img
                                                src={convertByteArrayToBase64(item.image)}
                                                alt="Room Thumbnail Is Not Available"
                                                className="w-full h-full"
                                            />
                                        );
                                    })}
                                </Slider>
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

                                {/* Arrows */}
                                <div
                                    className="cursor-pointer"
                                    style={{
                                        position: 'absolute',
                                        top: '50%',
                                        transform: 'translateY(-50%)',
                                        left: 20,
                                    }}
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        slideRef.current.slickPrev();
                                    }}
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
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        slideRef.current.slickNext();
                                    }}
                                >
                                    <img src={RightArrow} alt="Right Arrow" />
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

                    <div className="col-lg-4 pt-4">
                        <div className="customer-third-bg-color p-4">
                            <p className="text-center fs-3 p-2 pt-0">Your Reservation</p>
                            <div className="py-3 d-flex flex-column gap-4">
                                <span className="d-flex flex-column gap-2">
                                    <p>Check-in</p>
                                    <DatePicker
                                        selected={checkInDate} 
                                        onChange={handleCheckInDateChange} 
                                        dateFormat="yyyy-MM-dd" 
                                        className="customer-datetime-picker room-detail" 
                                        placeholderText="Choose check-in date" 
                                    />
                                </span>
                                <span className="d-flex flex-column gap-2">
                                    <p>Check-out</p>
                                    <DatePicker
                                        selected={checkOutDate} 
                                        onChange={handleCheckOutDateChange} 
                                        dateFormat="yyyy-MM-dd" 
                                        className="customer-datetime-picker room-detail" 
                                        placeholderText="Choose check-out date" 
                                    />
                                </span>
                                <span className="d-flex flex-column gap-2">
                                    <p className="fs-5 fw-bold">Total days booked: {calculateDays(checkInDate, checkOutDate)}</p>
                                </span>
                            </div>
                            <div className="d-flex flex-column gap-4">
                                <p className="text-start fs-3 py-2 pt-0">Extra Services</p>
                                <ExtraServices onServicesChange={handleServicesChange} />
                                <div className="bg-white border p-3">
                                    <p className="fs-5">Your Price</p>
                                    <p className="fs-5 fw-bold">
                                        {formatCurrency(
                                            roomDetail.price * calculateDays(checkInDate, checkOutDate) + selectedServices.reduce((total, service) => total + service.price * service.quantity, 0)
                                        )}
                                    </p>
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
