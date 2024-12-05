import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const PaymentCallback = () => {
    const [status, setStatus] = useState('pending'); // pending, success, fail
    const [message, setMessage] = useState('');
    const [loading, setLoading] = useState(true);

    const fetchCallback = async () => {
        try {
            const queryParams = new URLSearchParams(window.location.search); // Lấy query params từ URL

            const bookingData = JSON.parse(sessionStorage.getItem('bookingData'));
            const servicesData = JSON.parse(sessionStorage.getItem('servicesData'));
            const receiptData = JSON.parse(sessionStorage.getItem('receiptData'));

            const dataToSend = {
                booking: bookingData,
                services: servicesData,
                receipt: receiptData,
            };

            const response = await axios.post(
                `http://localhost:5058/booking/proceed-payment/payment-callback`,
                dataToSend,
                {
                    params: Object.fromEntries(queryParams.entries()),
                    headers: { 'Content-Type': 'application/json' },
                },
            );

            console.log('Params: ', Object.fromEntries(queryParams.entries()));

            const data = response.data;

            if (data?.status === 'success') {
                setStatus('success'); // Cập nhật trạng thái thành công
                setMessage(data.message); // Hiển thị thông báo
            } else {
                setStatus('fail'); // Cập nhật trạng thái thất bại
                setMessage(data.message || 'Thanh toán thất bại.'); // Hiển thị thông báo lỗi
            }

            sessionStorage.removeItem('bookingData');
            sessionStorage.removeItem('servicesData');
            sessionStorage.removeItem('receiptData');
        } catch (err) {
            setStatus('fail'); // Xử lý lỗi
            setMessage(err.message); // Thông báo lỗi nếu xảy ra lỗi trong fetch
        } finally {
            setLoading(false); // Tắt trạng thái loading
        }
    };
    useEffect(() => {
        fetchCallback();
    }, []);

    if (loading) {
        return (
            <div className="d-flex justify-content-center align-items-center">
                <div className="spinner-border text-primary" role="status">
                    <span className="visually-hidden">Processing payment results...</span>
                </div>
            </div>
        );
    }

    return (
        <div className="d-flex flex-column justify-content-center align-items-center" style={{ minHeight: '30vh' }}>
            {status === 'success' ? (
                <div className="alert alert-success" style={{ width: '80%', maxWidth: '600px' }}>
                    <h1 className="text-center">Payment successful!</h1>
                    <p>{message}</p>
                </div>
            ) : (
                <div className="alert alert-danger" style={{ width: '80%', maxWidth: '600px' }}>
                    <h1 className="text-center">Payment failed!</h1>
                    <p className="text-center">{message}</p>
                </div>
            )}
            <Link to="/" className="text-center mx-auto w-full text-decoration-underline">
                Back to Home Page
            </Link>
        </div>
    );
};

export default PaymentCallback;
