import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { formatDate } from '~/utils/formatDate';
import formatCurrency from '~/utils/currencyPipe';

const PaymentCallback = () => {
    const [status, setStatus] = useState('pending'); // pending, success, fail
    const [message, setMessage] = useState('');
    const [loading, setLoading] = useState(true);
    const [booking, setBooking] = useState();

    const bookingData = JSON.parse(sessionStorage.getItem('bookingData'));
    const servicesData = JSON.parse(sessionStorage.getItem('servicesData'));
    const receiptData = JSON.parse(sessionStorage.getItem('receiptData'));
    const otherDatas = JSON.parse(sessionStorage.getItem('otherDatas'));
    const room = otherDatas?.room ? otherDatas?.room : null;
    const services = otherDatas?.services ? otherDatas?.services : null;
    const discount = otherDatas?.discount ? otherDatas?.discount : null;

    const fetchCallback = async () => {
        try {
            const queryParams = new URLSearchParams(window.location.search); // Lấy query params từ URL

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
                setBooking(data.booking);
            } else {
                setStatus('fail'); // Cập nhật trạng thái thất bại
                setMessage(data.message || 'Thanh toán thất bại.'); // Hiển thị thông báo lỗi
            }

            // sessionStorage.removeItem('bookingData');
            // sessionStorage.removeItem('servicesData');
            // sessionStorage.removeItem('receiptData');
            // sessionStorage.removeItem('otherDatas');
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

    useEffect(() => {
        console.log("Created booking:", booking ? booking : "undefined");
        console.log("Room:", room ? room : "undefined");
        console.log("Service usage:", services ? services : "undefined");
        console.log("Receipt:", receiptData);
        console.log("Discount:", discount ? discount : "undefined");

        if (booking && room && receiptData)
            sendEmail();
    }, [booking]);

    const sendEmail = async() => {
        const serviceId = 'service_dl9j8fj';
        const templateId = 'template_do71dr7';
        const publicKey = '-YGCD_oq8tCU13wWB';

        const message = `Booking ID: ${booking?.id}
        Customer name: ${booking?.customerName}
        Customer phonenumber: ${booking?.customerPhoneNumber}
        Customer email: ${booking?.customerEmail}
        -----------------------------------------
        Room ID: ${room?.id}
        Room name: ${room?.name}
        Room price: ${formatCurrency(room?.price)}
        Check-in date: ${formatDate(booking?.checkIn)}
        Check-out date: ${formatDate(booking?.checkOut)}
        -----------------------------------------
        Total: ${formatCurrency(receiptData?.total)}`

        const data = {
            service_id: serviceId,
            template_id: templateId,
            user_id: publicKey,
            template_params: {
                from_name: 'LuxStay',
                to_name: booking?.customerName,
                to_email: booking?.customerEmail,
                message: message
            }
        }

        try {
            const response = await axios.post('https://api.emailjs.com/api/v1.0/email/send', data);
            console.log(response?.data);
        } catch (error) {
            console.error(error.message);
        }
    }

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
                    <p>We sent you the information of your booking, please check your email.</p>
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
