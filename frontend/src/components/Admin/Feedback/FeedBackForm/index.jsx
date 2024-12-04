import React, { useEffect, useState, useCallback } from 'react';
import axios from 'axios';

import FormGroup from '~/components/FormGroup';
import Overlay from '~/components/Overlay';
import Button from 'react-bootstrap/Button';
import ToastContainer, { showToast } from '~/utils/showToast';
import { isEmpty } from '~/utils/formValidation';

import { FaRegUser } from 'react-icons/fa6';
import { IoClose } from 'react-icons/io5';

const FeedBackForm = ({ data, type, onClose, isShowed }) => {
    const [fields, setFields] = useState({
        userName: data?.userName || '',
        roomName: data?.roomName || '',
        description: data?.description || '',
        creatAt: data?.createdAt || '',
    });

    console.log('Data', data);

    // Reset form fields whenever `type` or `data` changes
    useEffect(() => {
        setFields({
            userName: data?.userName || '',
            roomName: data?.roomName || '',
            description: data?.description || '',
            creatAt: data?.createdAt || '',
        });
    }, [type, data]);

    const handleClose = useCallback(() => {
        setFields({
            userName: '',
            roomName: '',
            description: '',
            createdAt: '',
        });
        onClose();
    }, [onClose]);

    return (
        <>
            {ToastContainer}
            <Overlay isShow={isShowed} onClose={handleClose} />
            <div
                style={{
                    maxWidth: '600px',
                    width: '90%',
                    height: '550px',
                    padding: '0 1rem',
                }}
                className={`confirm-popup ${isShowed ? 'show' : 'hide'}`}
            >
                <form
                    className="w-full h-full"
                    style={{
                        backgroundColor: '#fff',
                        padding: '2rem',
                        borderRadius: '1rem',
                    }}
                >
                    <div className="d-flex align-items-center justify-content-between">
                        <p className="fw-semibold fs-5 text-start text-capitalize">Details</p>
                        <IoClose size={28} className="cursor-pointer" onClick={handleClose} />
                    </div>
                    <div
                        className="hide-scrollbar w-full h-full pb-4"
                        style={{
                            overflowY: 'scroll',
                        }}
                    >
                        <FormGroup
                            label="Name"
                            id="username"
                            name="Name User"
                            type="text"
                            Icon={FaRegUser}
                            value={fields?.userName}
                            disabled={type === 'see'}
                            customParentInputStyle="p-1 pe-3 rounded-2"
                            customParentParentInputStyle="mt-2"
                        />
                        <FormGroup
                            label="Room Name"
                            id="roomName"
                            name="roomName"
                            type="text"
                            Icon={FaRegUser}
                            value={fields?.roomName}
                            disabled={type === 'see'}
                            customParentInputStyle="p-1 pe-3 rounded-2"
                            customParentParentInputStyle="mt-2"
                        />

                        <FormGroup
                            label="Description"
                            id="description"
                            name="description"
                            type="text"
                            value={fields?.description}
                            disabled={type === 'see'}
                            customParentInputStyle="p-1 pe-3 rounded-2"
                            customParentParentInputStyle="mt-2"
                        />
                        <FormGroup
                            label="CreatAt"
                            id="creatAt"
                            name="CreatAt"
                            type="text"
                            value={fields?.creatAt}
                            disabled={type === 'see'}
                            customParentInputStyle="p-1 pe-3 rounded-2"
                            customParentParentInputStyle="mt-2"
                        />
                    </div>
                </form>
            </div>
        </>
    );
};

export default FeedBackForm;
