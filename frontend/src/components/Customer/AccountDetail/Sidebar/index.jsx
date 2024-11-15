import React, { useEffect, useRef, useState } from 'react';
import { Button } from 'react-bootstrap';
import { Link, useLocation } from 'react-router-dom';
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
    const [avatar, setAvatar] = useState(null);
    const avatarRef = useRef();
    const { user } = useUser();
    const currentPath = useLocation().pathname;

    useEffect(() => {
        return () => avatar && URL.revokeObjectURL(avatar.preview);
    }, [avatar]);

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
                                    (user?.avatar !== null && `data:image/jpeg;base64,${user?.avatar}`) ||
                                    'https://cdn-icons-png.flaticon.com/512/6596/6596121.png'
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
                    <p className="fw-semibold fs-5 text-capitalize">{user?.name}</p>
                    <small className="text-black-50">{user?.email}</small>
                </div>
                <ul className="d-flex flex-column gap-4">
                    {menu.map((item) => {
                        return (
                            <li key={item.id} className="fw-semibold cursor-pointer">
                                <Link
                                    to={item.path}
                                    className={`animation-effect ${
                                        currentPath.includes(item.path) ? 'secondary-color' : 'text-black'
                                    }`}
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
