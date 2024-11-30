import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';

import { useUser } from '../../../../providers/UserProvider';
import { formatDate } from '~/utils/formatDate';
import formatCurrency from '~/utils/currencyPipe';

const ProccedPayment = () => {
    const { user } = useUser();
    const isAuthenticated = user !== null;

    const [ username, setUsername ] = useState("");
    const [ phoneNumber, setPhoneNumber ] = useState("");
    const [ email, setEmail ] = useState("");

    const location = useLocation();
    const { room, checkInDate, checkOutDate, totalPrice, services } = location.state || {};

    const handlePaymentClick = async () => {
        // Kiểm tra xem người dùng có điền đầy đủ thông tin nếu chưa đăng nhập
        if (!isAuthenticated && (!username || !phoneNumber || !email)) {
            alert("Please fill out all required fields.");
            return;
        }
    
        try {
            // Tạo một đối tượng chứa dữ liệu
            const bookingData = {
                customerName: username ?? null,
                customerPhoneNumber: phoneNumber ?? null,
                customerEmail: email ?? null,
                checkIn: checkInDate,
                checkOut: checkOutDate,
                roomId: room?.id,
                customerId: isAuthenticated ? user.id : null, // Nếu cần gửi ID khách hàng
                status: 1, // Trạng thái mặc định là 1
            };
    
            // Tạo mảng dịch vụ (nếu có)
            const servicesData = services.map(service => ({
                serviceId: service.id,
                quantity: service.quantity
            }));
    
            // Gửi request đến API bằng Axios
            const response = await axios.post('http://localhost:5058/booking', {
                booking: bookingData, // Gửi booking và services dưới dạng JSON
                services: servicesData
            }, {
                headers: {
                    'Content-Type': 'application/json', // Đảm bảo API nhận JSON
                }
            });
    
            if (response.status === 200) {
                alert(`Booking created successfully! Booking ID: ${response.data.booking.id}`);
            } else {
                alert("Failed to create booking." + response.status);
            }
        } catch (error) {
            console.error("Error creating booking:", error);
            alert("Failed to create booking. Please try again.");
        }
    };
    
    
    return (
        <div style={{ padding: '20px' }}>
            <h2>Booking Details</h2>
            <div style={{ marginBottom: '10px' }}>
                <strong>Room:</strong> {room?.name} (ID: {room?.id})
            </div>
            <div style={{ marginBottom: '10px' }}>
                <strong>Check-In Date:</strong> {formatDate(checkInDate)}
            </div>
            <div style={{ marginBottom: '10px' }}>
                <strong>Check-Out Date:</strong> {formatDate(checkOutDate)}
            </div>
            <strong>Selected Services:</strong>
            {services?.length > 0 ? (
                services.map((service, index) => (
                <div key={index}>{service.name} * {service.quantity}</div>
                ))
            ) : (
                <div>No services selected</div>
            )}
            <div style={{ marginBottom: '10px' }}>
                <h4>Total Price: {formatCurrency(totalPrice)}</h4> 
            </div>

            <h2>User Info</h2>
            {isAuthenticated ? (
                <div style={{ marginBottom: '10px' }}>
                    <strong>User:</strong> {user?.name} (ID: {user?.id})
                </div>
            ) : (
                <div style={{ marginBottom: '10px', maxWidth: '300px' }}>
                    <div class="mb-3">
                        <label htmlFor="username" class="form-label">Username</label>
                        <input type="text" class="form-control" id="username"
                            value={username}
                            onChange={(value) => setUsername(value)}
                        />
                    </div>
                    <div class="mb-3">
                        <label htmlFor="phonenumber" class="form-label" 
                        data-mdb-input-mask-init data-mdb-input-mask="+84 999-999-999">Phone number</label>
                        <input type="text" class="form-control" id="phonenumber"
                            value={phoneNumber}
                            onChange={(value) => setPhoneNumber(value)}
                        />
                    </div>
                    <div class="mb-3">
                        <label htmlFor="email" class="form-label">Email</label>
                        <input type="email" class="form-control" id="email"
                            value={email}
                            onChange={(value) => setEmail(value)}
                        />
                    </div>
                </div>
            )}

            <button 
                type="button" class="btn btn-primary"
                onClick={handlePaymentClick}
            >Pay</button>
        </div>
    );
}

export default ProccedPayment;