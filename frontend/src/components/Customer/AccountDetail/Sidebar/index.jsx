import React, { useEffect, useRef, useState } from 'react';
import { Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { MdOutlineFileUpload } from 'react-icons/md';
import { useUser } from '~/providers/UserProvider';
import axios from 'axios';

const menu = [
    {
        id: 1,
        title: 'Personal information',
        path: '/account/personal',
    },
    {
        id: 2,
        title: 'Payments',
        path: '/account/payments',
    },
    {
        id: 3,
        title: 'Booking history',
        path: '/account/bookinghistory',
    },
    {
        id: 4,
        title: 'Change password',
        path: '/account/password',
    },
];

const Sidebar = () => {
    const [selectedItemId, setSelectedItemId] = useState(null);
    const [avatar, setAvatar] = useState(null);
    const avatarRef = useRef();
    const { user } = useUser();

    useEffect(() => {
        return () => avatar && URL.revokeObjectURL(avatar.preview);
    }, [avatar]);

    console.log('Logged user', user);

    const handleInputChange = async () => {
        const file = avatarRef.current.files[0];
        // Preview
        file.preview = URL.createObjectURL(file);
        setAvatar(file);

        const payload = new FormData();
        payload.append('avatar', file);
        payload.append('userId', user?.id);
        try {
            const url = 'http://localhost:5058/user/avatar';
            const response = await axios.post(url, payload);
            console.log(response);
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <aside>
            <div className="">
                <div className="d-flex flex-column gap-1 mb-5">
                    <div className="d-flex align-items-end gap-2">
                        <div className="" style={{ width: '80px', height: '80px' }}>
                            <img
                                src={
                                    avatar?.preview ||
                                    `data:image/jpeg;base64,${user?.avatar}` ||
                                    'https://cellphones.com.vn/sforum/wp-content/uploads/2023/10/avatar-trang-2.jpg'
                                }
                                alt=""
                                className="w-full h-full rounded-circle border"
                                style={{ objectFit: 'cover', objectPosition: 'center' }}
                            />
                        </div>
                        <input type="file" ref={avatarRef} hidden onChange={handleInputChange} />
                        <Button
                            variant="outline-secondary"
                            className="py-0 px-2 d-flex align-items-center gap-1"
                            onClick={() => avatarRef.current.click()}
                        >
                            <MdOutlineFileUpload />
                            <small>Upload</small>
                        </Button>
                    </div>
                    <p className="fw-semibold fs-5">Gia Cường</p>
                    <small className="text-black-50">legiacuong@gmail.com</small>
                </div>
                <ul className="d-flex flex-column gap-4">
                    {menu.map((item) => {
                        return (
                            <li key={item.id} className="fw-semibold cursor-pointer">
                                <Link
                                    to={item.path}
                                    className={`animation-effect ${
                                        selectedItemId === item.id ? 'secondary-color' : 'text-black'
                                    }`}
                                    onClick={() => setSelectedItemId(item.id)}
                                >
                                    {item.title}
                                </Link>
                            </li>
                        );
                    })}
                </ul>
            </div>
        </aside>
    );
};

export default Sidebar;
