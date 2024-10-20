import React from 'react';
import Overlay from '../Overlay';

import { IoClose } from 'react-icons/io5';

const ConfirmPopup = ({ header, message, positiveChoice, negativeChoice, onYes, isShow, onClose }) => {
    return (
        isShow && (
            <>
                <Overlay isShow={isShow} onClose={onClose} />
                <div
                    style={{
                        position: 'fixed',
                        top: '50%',
                        left: '50%',
                        zIndex: 20,
                        transform: 'translate(-50%, -50%)',
                        maxWidth: '500px',
                        maxHeight: '400px',
                        padding: '5rem 3rem',
                        background: 'rgb(255, 253, 252)',
                    }}
                    className="rounded-4"
                >
                    <IoClose
                        size={30}
                        className="text-end p-1 rounded-circle cursor-pointer text-white"
                        style={{
                            position: 'absolute',
                            top: 18,
                            right: 18,
                            backgroundColor: 'rgb(232, 191, 150)',
                        }}
                        onClick={onClose}
                    />
                    <div className="d-flex flex-column gap-5">
                        <div className="px-lg-5 px-0 d-flex flex-column gap-3">
                            <p className="fs-4 fw-semibold text-center">{header}</p>
                            <p className="text-secondary text-center">{message}</p>
                        </div>
                        <div className="d-flex align-items-center gap-2">
                            <button
                                onClick={onClose}
                                className="w-full py-2 px-4 rounded-3 text-uppercase primary-bg-color primary-bg-color-hover border"
                            >
                                {negativeChoice}
                            </button>
                            <button
                                onClick={onYes}
                                className="w-full py-2 px-4 rounded-3 text-uppercase customer-primary-button text-white align-middle"
                            >
                                {positiveChoice}
                            </button>
                        </div>
                    </div>
                </div>
            </>
        )
    );
};

export default ConfirmPopup;
