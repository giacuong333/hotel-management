import React, { useEffect, useState } from "react";

const PaymentCallback = () => {
    const [status, setStatus] = useState("pending"); // pending, success, fail
    const [message, setMessage] = useState("");
    const [loading, setLoading] = useState(true);

    const fetchCallback = async () => {
        try {
            const queryParams = new URLSearchParams(window.location.search); // Lấy query params từ URL
            const response = await fetch(`http://localhost:5058/booking/proceed-payment/payment-callback?${queryParams.toString()}`, {
                method: "GET",
                headers: { "Content-Type": "application/json" },
            });
    
            console.log('Params: ', Object.fromEntries(queryParams.entries())); // In ra các query params gửi đi
    
            const data = await response.json(); // Chuyển đổi phản hồi thành JSON
    
            if (data?.status === "success") {
                setStatus("success"); // Cập nhật trạng thái thành công
                setMessage(data.message); // Hiển thị thông báo
            } else {
                setStatus("fail"); // Cập nhật trạng thái thất bại
                setMessage(data.message || "Thanh toán thất bại."); // Hiển thị thông báo lỗi
            }
        } catch (err) {
            setStatus("fail"); // Xử lý lỗi
            setMessage(err.message); // Thông báo lỗi nếu xảy ra lỗi trong fetch
        } finally {
            setLoading(false); // Tắt trạng thái loading
        }
    };
    useEffect(() => {
        fetchCallback()
    },[])
    

    if (loading) return <p>Đang xử lý kết quả thanh toán...</p>;

    return (
        <div>
            {status === "success" ? (
                <div style={{ color: "green" }}>
                    <h1>Thanh toán thành công!</h1>
                    <p>{message}</p>
                </div>
            ) : (
                <div style={{ color: "red" }}>
                    <h1>Thanh toán thất bại</h1>
                    <p>{message}</p>
                </div>
            )}
        </div>
    );
};

export default PaymentCallback;
