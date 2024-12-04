import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';

import { useUser } from '../../../../providers/UserProvider';
import { formatDate, convertToISO } from '~/utils/formatDate';
import formatCurrency from '~/utils/currencyPipe';
import { IoMdCalendar } from 'react-icons/io';
import { HiArrowLongLeft } from 'react-icons/hi2';
import { RxQuestionMarkCircled } from 'react-icons/rx';
import FormGroup from '~/components/FormGroup';
import { FaRegUser } from 'react-icons/fa';
import { FiPhone } from 'react-icons/fi';
import { MdOutlineEmail } from 'react-icons/md';
import { CgCloseO } from 'react-icons/cg';

const ProccedPayment = () => {
    const { user } = useUser();
    const isAuthenticated = user !== null;

    const [username, setUsername] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [email, setEmail] = useState('');
    const [discounts, setDiscounts] = useState([]);
    const [selectedDiscount, setSelectedDiscount] = useState();
    const [fields, setFields] = useState({ username: '', email: '', phoneNumber: '' });
    const [errors, setErrors] = useState({});

    const location = useLocation();
    const { room, checkInDate, checkOutDate, totalPrice, services } = location.state || {};
    const navigate = useNavigate();

    useEffect(() => {
        fetchDiscount();
    }, []);

    useEffect(() => {
        console.log('Selected discount: ', selectedDiscount);
    }, [selectedDiscount]);

    const fetchDiscount = async () => {
        try {
            const response = await axios.get(`http://localhost:5058/discount/active`);
            if (response?.status === 200) {
                const discountsData = response?.data?.$values || null;
                discountsData.map((discount) => {
                    console.log(discount);
                });
                setDiscounts(discountsData);
            }
        } catch (error) {
            console.error('Failed to fetch discount:', error);
        }
    };

    const handlePaymentClick = async () => {
        // Kiểm tra xem người dùng có điền đầy đủ thông tin nếu chưa đăng nhập
        if (!isAuthenticated && (!username || !phoneNumber || !email)) {
            alert('Please fill out all required fields.');
            return;
        }

        try {
            // Tạo một đối tượng chứa dữ liệu
            const bookingData = {
                customerName: username?.trim() ? username : null,
                customerPhoneNumber: phoneNumber?.trim() ? phoneNumber : null,
                customerEmail: email?.trim() ? email : null,
                checkIn: convertToISO(formatDate(checkInDate)),
                checkOut: convertToISO(formatDate(checkOutDate)),
                roomId: room?.id,
                customerId: isAuthenticated ? user.id : null, // Nếu cần gửi ID khách hàng
                status: 1, // Trạng thái mặc định là 1
            };

            // Tạo mảng dịch vụ (nếu có)
            const servicesData = services.map((service) => ({
                serviceId: service.id,
                quantity: service.quantity,
            }));

            const receiptData = {
                total: selectedDiscount ? applyDiscount(selectedDiscount.value) : totalPrice,
                discountId: selectedDiscount?.id ?? null,
            };

            sessionStorage.setItem('bookingData', JSON.stringify(bookingData));
            sessionStorage.setItem('servicesData', JSON.stringify(servicesData));
            sessionStorage.setItem('receiptData', JSON.stringify(receiptData));

            // Gửi request đến API bằng Axios
            const response = await axios.post(
                'http://localhost:5058/booking',
                {
                    booking: bookingData, // Gửi booking và services dưới dạng JSON
                    services: servicesData,
                    receipt: receiptData,
                },
                {
                    headers: {
                        'Content-Type': 'application/json', // Đảm bảo API nhận JSON
                    },
                },
            );

            if (response.status === 200) {
                window.location.href = response.data;
            } else {
                alert('Failed to create booking.' + response.status);
            }
        } catch (error) {
            console.error('Error creating booking:', error);
            alert('Failed to create booking. Please try again.');
        }
    };

    const handleChooseDiscount = (discount) => {
        setSelectedDiscount(discount);
    };

    const applyDiscount = (value) => {
        return totalPrice * ((100 - value) / 100);
    };

    const handleFieldChange = (key, value) => {};

    const handleFieldInput = (key) => {};

    return (
        <>
            <div className="container-fluid text-bg-light border-bottom">
                <div className="row">
                    <div className="col-12 p-4 d-flex align-items-center justify-content-between">
                        <button
                            className="shadow-sm py-3 px-4 fw-semibold rounded-pill bg-white border cursor-pointer d-inline-block d-flex align-items-center justify-content-start gap-2 text-dark"
                            onClick={() => navigate(-1)}
                        >
                            <HiArrowLongLeft size={24} />
                            <p className="">Back</p>
                        </button>
                        <button className="shadow-sm py-3 px-4 fw-semibold rounded-pill bg-white border cursor-pointer d-inline-block d-flex align-items-center justify-content-start gap-2 text-dark">
                            <RxQuestionMarkCircled size={24} />
                            <p className="">Help</p>
                        </button>
                    </div>
                </div>
            </div>

            <div className="container py-4">
                <div className="row">
                    <div className="d-flex align-items-center gap-2 py-4 border-bottom">
                        <small className="fw-semibold text-secondary cursor-pointer" onClick={() => navigate(-1)}>
                            Property detail
                        </small>
                        <span>/</span>
                        <small className="fw-semibold secondary-color">Reservation</small>
                    </div>
                </div>

                <div className="row">
                    <h2 className="py-4">Confirm your reservation</h2>
                </div>

                <div className="row gx-5">
                    {/* Room Details */}
                    <div className="col-md-7">
                        <div className="row">
                            <div className="card mb-3 px-3 py-2 shadow-sm rounded-4">
                                <div className="card-body">
                                    <h5 className="card-title mb-4">Booking summary</h5>
                                    <div className="d-flex flex-column gap-3">
                                        <div className="d-flex align-items-center justify-content-start gap-3">
                                            <IoMdCalendar
                                                size={40}
                                                className="text-secondary p-2 border rounded-circle"
                                            />
                                            <span>
                                                <p className="fw-semibold text-secondary">Check in:</p>
                                                <p className="fw-semibold dark">{formatDate(checkInDate)}</p>
                                            </span>
                                        </div>
                                        <div className="d-flex align-items-center justify-content-start gap-3">
                                            <IoMdCalendar
                                                size={40}
                                                className="text-secondary p-2 border rounded-circle"
                                            />
                                            <span>
                                                <p className="fw-semibold text-secondary">Check out:</p>
                                                <p className="fw-semibold dark">{formatDate(checkOutDate)}</p>
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Customer information */}
                        <div className="row">
                            <div className="card mb-3 px-3 py-2 shadow-sm rounded-4">
                                <div className="card-body">
                                    <h5 className="card-title mb-4">Customer information</h5>
                                    <div className="d-flex flex-column gap-3">
                                        <FormGroup
                                            label="Username"
                                            id="username"
                                            name="username"
                                            type="text"
                                            error={errors.username}
                                            Icon={FaRegUser}
                                            value={fields?.username}
                                            customLabelStyle="fw-semibold text-secondary"
                                            customParentInputStyle="p-1 pe-3 rounded-pill shadow-sm"
                                            onChange={(e) => handleFieldChange('username', e.target.value)}
                                            onInput={() => handleFieldInput('username')}
                                        />
                                        <FormGroup
                                            label="Phone number"
                                            id="phoneNumber"
                                            name="phoneNumber"
                                            type="text"
                                            error={errors.phoneNumber}
                                            Icon={FiPhone}
                                            value={fields?.phoneNumber}
                                            customLabelStyle="fw-semibold text-secondary"
                                            customParentInputStyle="p-1 pe-3 rounded-pill shadow-sm"
                                            onChange={(e) => handleFieldChange('phoneNumber', e.target.value)}
                                            onInput={() => handleFieldInput('phoneNumber')}
                                        />
                                        <FormGroup
                                            label="Email"
                                            id="email"
                                            name="email"
                                            type="email"
                                            error={errors.email}
                                            Icon={MdOutlineEmail}
                                            value={fields?.email}
                                            customLabelStyle="fw-semibold text-secondary"
                                            customParentInputStyle="p-1 pe-3 rounded-pill shadow-sm"
                                            onChange={(e) => handleFieldChange('email', e.target.value)}
                                            onInput={() => handleFieldInput('email')}
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Cancellation policy */}
                        <div className="row">
                            <div className="card mb-3 px-3 py-2 shadow-sm rounded-4">
                                <div className="card-body d-flex align-items-center justify-content-start gap-3">
                                    <div className="p-2 rounded-circle" style={{ backgroundColor: '#ffd5e1' }}>
                                        <CgCloseO size={30} className="text-danger" />
                                    </div>
                                    <div>
                                        <h6>Cancellation policy</h6>
                                        <small className="fw-semibold">
                                            Free cancellation within 2 days.{' '}
                                            <span className="text-secondary fw-normal">
                                                Cancellation after 2 days will take 50%
                                            </span>
                                        </small>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Proceed to payment */}
                        <div className="row">
                            <div className="card mb-3 px-3 py-2 shadow-sm rounded-4">
                                <div className="card-body d-flex flex-column gap-3">
                                    <p className="fw-semibold text-dark">
                                        By selecting the button below, I agree to the LuxStay's Rules, LuxStay's
                                        Rebooking and Refund Policy, and that LuxStay can charge my payment method if I
                                        am responsible for damage.
                                    </p>
                                    <p className="fw-semibold text-dark">
                                        I also agree to the{' '}
                                        <span className="fw-semibold text-decoration-underline customer-primary-color cursor-pointer">
                                            updated Terms of Services
                                        </span>
                                        {', '}
                                        <span className="fw-semibold text-decoration-underline customer-primary-color cursor-pointer">
                                            Payments Terms of Services
                                        </span>
                                        , and I acknowledge the{' '}
                                        <span className="fw-semibold text-decoration-underline customer-primary-color cursor-pointer">
                                            Privacy Policy
                                        </span>
                                    </p>
                                    <div>
                                        <button
                                            type="button"
                                            className="rounded-pill p-3 shadow-sm text-white border cursor-pointer customer-primary-button"
                                            onClick={handlePaymentClick}
                                        >
                                            Confirm and Proceed to Payment
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Total Price
                        <div className="row">
                            <div className="col-md-6 col-12">
                                <div className="card">
                                    <div className="card-body text-start">
                                        <h4>Total Price: {formatCurrency(totalPrice)}</h4>
                                    </div>
                                </div>
                            </div>
                        </div> */}

                        {/* User Info */}
                        {/* <h2 className="mt-5 mb-4">User Info</h2> */}
                        <div className="row g-3">
                            {isAuthenticated ? (
                                <>
                                    <div className="col-12">
                                        <p>
                                            <strong>User:</strong> {user?.name} (ID: {user?.id})
                                        </p>
                                    </div>
                                </>
                            ) : (
                                <div className="col">
                                    {/* <div className="col-md-6 col-12">
                                        <label htmlFor="username" className="form-label">
                                            Username
                                        </label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            id="username"
                                            value={username}
                                            onChange={(e) => setUsername(e.target.value)}
                                        />
                                    </div>
                                    <div className="col-md-6 col-12">
                                        <label htmlFor="phonenumber" className="form-label">
                                            Phone number
                                        </label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            id="phonenumber"
                                            value={phoneNumber}
                                            onChange={(e) => setPhoneNumber(e.target.value)}
                                        />
                                    </div>
                                    <div className="col-md-6 col-12">
                                        <label htmlFor="email" className="form-label">
                                            Email
                                        </label>
                                        <input
                                            type="email"
                                            className="form-control"
                                            id="email"
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                        />
                                    </div> */}

                                    {/* Payment Button */}
                                    {/* <div className="text-start mt-4">
                                        <button
                                            type="button"
                                            className="btn btn-primary fs-5"
                                            onClick={handlePaymentClick}
                                        >
                                            Pay
                                        </button>
                                    </div> */}
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Selected Services and Discount */}
                    <div className="col-md-5">
                        <div className="shadow-sm rounded-4 border overflow-hidden">
                            <img
                                src={
                                    room?.thumbnail ||
                                    'https://luxestay.wpthemeverse.com/wp-content/uploads/2024/08/superior-room.png'
                                }
                                alt="Room"
                                style={{
                                    objectFit: 'contain',
                                    objectPosition: 'center',
                                    width: '100%',
                                }}
                            />
                            <div>
                                <div className="py-3 px-4 border-bottom">
                                    <h5 className="text-capitalize">{room?.name}</h5>
                                    <small className="fw-semibold text-secondary">{room?.description}</small>
                                </div>
                                <div className="py-3 px-4 border-bottom">
                                    <h6 className="text-capitalize">Price details</h6>
                                    <div className="d-flex align-items-center justify-content-between border-bottom pb-3">
                                        <p className="text-secondary">
                                            {formatCurrency(room?.price)} x {'1 nights'}
                                        </p>
                                        <p className="text-secondary">{formatCurrency(totalPrice)}</p>
                                    </div>
                                    <div className="d-flex align-items-center justify-content-between pt-3">
                                        <h5 className="fw-semibold">Total</h5>
                                        <h5 className="fw-semibold">{formatCurrency(totalPrice)}</h5>
                                    </div>
                                </div>
                            </div>
                        </div>
                        {/* <div className="card mb-4">
                            <div className="card-body">
                                <h5 className="card-title">Selected Services</h5>
                                {services?.length > 0 ? (
                                    <ul className="list-group mb-3">
                                        {services.map((service, index) => (
                                            <li key={index} className="list-group-item">
                                                {service.name} x {service.quantity}
                                            </li>
                                        ))}
                                    </ul>
                                ) : (
                                    <p className="text-muted mb-3">No services selected</p>
                                )}

                                <h5 className="card-title">Discounts</h5>
                                {discounts.length > 0 ? (
                                    discounts.map((discount, index) => (
                                        <div className="form-check" key={index}>
                                            <input
                                                className="form-check-input"
                                                type="radio"
                                                name="flexRadioDefault"
                                                id={discount.id}
                                                onChange={() => handleChooseDiscount(discount)}
                                            />
                                            <label className="form-check-label" htmlFor={discount.id}>
                                                {discount.name}: {discount.value}%
                                            </label>
                                        </div>
                                    ))
                                ) : (
                                    <p className="text-muted mb-3">No discount available.</p>
                                )}
                            </div>
                        </div> */}
                    </div>
                </div>
            </div>
        </>
    );
};

export default ProccedPayment;
