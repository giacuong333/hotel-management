import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';

import { useUser } from '../../../../providers/UserProvider';
import { formatDate, convertToISO } from '~/utils/formatDate';
import formatCurrency from '~/utils/currencyPipe';

const ProccedPayment = () => {
    const { user } = useUser();
    const isAuthenticated = user !== null;

    const [ username, setUsername ] = useState("");
    const [ phoneNumber, setPhoneNumber ] = useState("");
    const [ email, setEmail ] = useState("");
    const [ discounts, setDiscounts ] = useState([]);
    const [ selectedDiscount, setSelectedDiscount ] = useState();

    const location = useLocation();
    const { room, checkInDate, checkOutDate, totalPrice, services } = location.state || {};

    useEffect(()=>{
        fetchDiscount();
    }, [])

    useEffect(()=>{
        console.log("Selected discount: ", selectedDiscount);
    }, [selectedDiscount])

    const fetchDiscount = async () => {
        try {
            const response = await axios.get(`http://localhost:5058/discount/active`);
            if (response?.status === 200) {
                const discountsData = response?.data?.$values || null;
                discountsData.map(discount => {
                    console.log(discount);
                })
                setDiscounts(discountsData);
            }
        } catch (error) {
            console.error('Failed to fetch discount:', error);
        }
    };

    const handlePaymentClick = async () => {
        // Kiểm tra xem người dùng có điền đầy đủ thông tin nếu chưa đăng nhập
        if (!isAuthenticated && (!username || !phoneNumber || !email)) {
            alert("Please fill out all required fields.");
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
            const servicesData = services.map(service => ({
                serviceId: service.id,
                quantity: service.quantity
            }));

            const receiptData = {
                total: selectedDiscount ? applyDiscount(selectedDiscount.value) : totalPrice,
                discountId: selectedDiscount?.id ?? null
            }

            sessionStorage.setItem("bookingData", JSON.stringify(bookingData));
            sessionStorage.setItem("servicesData", JSON.stringify(servicesData));
            sessionStorage.setItem("receiptData", JSON.stringify(receiptData));
    
            // Gửi request đến API bằng Axios
            const response = await axios.post('http://localhost:5058/booking', {
                booking: bookingData, // Gửi booking và services dưới dạng JSON
                services: servicesData,
                receipt: receiptData
            }, {
                headers: {
                    'Content-Type': 'application/json', // Đảm bảo API nhận JSON
                }
            });
    
            if (response.status === 200) {
                window.location.href = response.data;
            } else {
                alert("Failed to create booking." + response.status);
            }
        } catch (error) {
            console.error("Error creating booking:", error);
            alert("Failed to create booking. Please try again.");
        }
    };
    
    const handleChooseDiscount = (discount) => {
        setSelectedDiscount(discount);
    }

    const applyDiscount = (value) => {
        return totalPrice  * ((100 - value)/100);
    }

    return (
        <div className="container py-4">
            <h2 className="mb-4">Booking Details</h2>
            <div className="row">
                {/* Room Details */}
                <div className="col-md-6">
                    <div className="card mb-4">
                        <div className="card-body">
                            <h5 className="card-title">Room Details</h5>
                            <p className="card-text">
                                <strong>Room:</strong> {room?.name} (ID: {room?.id})
                            </p>
                            <p className="card-text">
                                <strong>Check-In Date:</strong> {formatDate(checkInDate)}
                            </p>
                            <p className="card-text">
                                <strong>Check-Out Date:</strong> {formatDate(checkOutDate)}
                            </p>
                        </div>
                    </div>
                </div>
    
                {/* Selected Services and Discount */}
                <div className="col-md-6">
                    <div className="card mb-4">
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
                            ))) : (
                                <p className="text-muted mb-3">No discount available.</p>
                            )}
                        </div>
                    </div>
                </div>
            </div>
    
            {/* Total Price */}
            <div className="row">
                <div className="col-md-6 col-12">
                    <div className="card">
                        <div className="card-body text-start">
                            <h4>Total Price: {formatCurrency(totalPrice)}</h4>
                        </div>
                    </div>
                </div>
            </div>
    
            {/* User Info */}
            <h2 className="mt-5 mb-4">User Info</h2>
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
                        <div className="col-md-6 col-12">
                            <label htmlFor="username" className="form-label">Username</label>
                            <input
                                type="text"
                                className="form-control"
                                id="username"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                            />
                        </div>
                        <div className="col-md-6 col-12">
                            <label htmlFor="phonenumber" className="form-label">Phone number</label>
                            <input
                                type="text"
                                className="form-control"
                                id="phonenumber"
                                value={phoneNumber}
                                onChange={(e) => setPhoneNumber(e.target.value)}
                            />
                        </div>
                        <div className="col-md-6 col-12">
                            <label htmlFor="email" className="form-label">Email</label>
                            <input
                                type="email"
                                className="form-control"
                                id="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>

                        {/* Payment Button */}
                        <div className="text-start mt-4">
                            <button
                                type="button"
                                className="btn btn-primary fs-5"
                                onClick={handlePaymentClick}
                            >
                                Pay
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );      
}

export default ProccedPayment;