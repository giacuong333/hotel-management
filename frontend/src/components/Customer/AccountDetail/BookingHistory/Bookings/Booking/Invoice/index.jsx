import React from 'react';
import { useNavigate } from 'react-router';

const Invoice = () => {
    const navigate = useNavigate();

    return (
        <main className="">
            <div className="d-flex flex-column gap-4">
                <div className="d-flex align-items-center gap-2">
                    <small className="fw-semibold cursor-pointer" onClick={() => navigate(-1)}>
                        Booking History
                    </small>
                    <span>/</span>
                    <small className="fw-semibold secondary-color">Invoice</small>
                </div>
                <div>
                    <div className="bg-white shadow-sm p-5">
                        <div className="d-flex align-items-center justify-content-between">
                            <h1 className="text-uppercase">Invoice</h1>
                            <img
                                src="http://localhost:3000/static/media/luxestay_logo.b519c98a9069f3de9e39.b519c98a9069f3de9e39.png"
                                alt="Logo"
                            />
                        </div>
                        <div>
                            <p>ID: #2213</p>
                            <p>John Smith</p>
                        </div>
                        <div>
                            <div>
                                <h5>BILL TO</h5>
                                <p>Nhung Vy</p>
                                <p>nhungvy@gmail.com</p>
                                <p>0948800917</p>
                            </div>
                            <div></div>
                            <div></div>
                            <div></div>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
};

export default Invoice;
