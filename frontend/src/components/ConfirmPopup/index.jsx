import React from 'react';
import Overlay from '../Overlay';

import { IoClose } from 'react-icons/io5';

const ConfirmPopup = ({
    customCloseBtn,
    customePositiveChoiceBtn,
    header,
    message,
    positiveChoice,
    negativeChoice,
    onYes,
    isShow,
    onClose,
}) => {
    return (
        <>
            <Overlay isShow={isShow} onClose={onClose} />
            <div
                style={{
                    maxWidth: '500px',
                    maxHeight: '400px',
                    padding: '5rem 3rem',
                    background: 'rgb(255, 253, 252)',
                }}
                className={`rounded-4 confirm-popup ${isShow ? 'show' : 'hide'}`}
            >
                <IoClose
                    size={30}
                    className="text-end p-1 rounded-circle cursor-pointer text-white"
                    style={{
                        position: 'absolute',
                        top: 18,
                        right: 18,
                        backgroundColor: 'rgb(232, 191, 150)',
                        ...customCloseBtn,
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
                            style={{ ...customePositiveChoiceBtn }}
                        >
                            {positiveChoice}
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
};

export default ConfirmPopup;
