import Tippy from '@tippyjs/react';
import React, { useState } from 'react';

import { IoIosArrowDown } from 'react-icons/io';
import { CiUser } from 'react-icons/ci';
import { RiContactsBook3Line } from 'react-icons/ri';
import { IoSettingsOutline } from 'react-icons/io5';
import { CgLogOut } from 'react-icons/cg';
import { useUser } from '../../../providers/UserProvider';
import { useNavigate } from 'react-router';

const Header = () => {
    const [visible, setVisible] = useState(false);
    const { user, signOut } = useUser();
    const navigate = useNavigate();

    const show = () => setVisible(true);
    const hide = () => setVisible(false);

    const handleSignOut = async () => {
        await signOut();
        navigate('/signin');
    };

    return (
        <header className="admin-header shadow-sm">
            <div className="h-full text-end">
                <Tippy
                    interactive={true}
                    placement="bottom-end"
                    arrow={false}
                    visible={visible}
                    onClickOutside={hide}
                    className="bg-white rounded-0 shadow-sm px-0"
                    content={
                        <ul className="text-start text-secondary">
                            <li className="d-flex align-items-center gap-2 px-4 py-3 cursor-pointer customer-primary-color-hover">
                                <CiUser size={20} />
                                <p
                                    style={{
                                        fontSize: '1rem',
                                    }}
                                >
                                    My Profile
                                </p>
                            </li>
                            <li className="d-flex align-items-center gap-2 px-4 py-3 cursor-pointer customer-primary-color-hover">
                                <RiContactsBook3Line size={20} />
                                <p
                                    style={{
                                        fontSize: '1rem',
                                    }}
                                >
                                    My Contacts
                                </p>
                            </li>
                            <li className="d-flex align-items-center gap-2 px-4 py-3 cursor-pointer customer-primary-color-hover">
                                <IoSettingsOutline size={20} />
                                <p
                                    style={{
                                        fontSize: '1rem',
                                    }}
                                >
                                    Account Settings
                                </p>
                            </li>
                            <li
                                className="d-flex align-items-center gap-2 px-4 py-3 cursor-pointer customer-primary-color-hover border-top"
                                onClick={handleSignOut}
                            >
                                <CgLogOut size={20} />
                                <p
                                    style={{
                                        fontSize: '1rem',
                                    }}
                                >
                                    Log Out
                                </p>
                            </li>
                        </ul>
                    }
                >
                    <div
                        className="d-inline-flex align-items-center h-full gap-2 cursor-pointer"
                        onClick={visible ? hide : show}
                    >
                        <div className="text-end text-capitalize">
                            <p
                                style={{
                                    fontWeight: '600',
                                }}
                            >
                                {user?.name}
                            </p>
                            <p
                                className="text-secondary text-capitalize"
                                style={{
                                    fontSize: '0.8rem',
                                }}
                            >
                                {user?.role?.name}
                            </p>
                        </div>
                        <div
                            className="rounded-circle border overflow-hidden"
                            style={{
                                width: '60px',
                                height: '60px',
                            }}
                        >
                            <img
                                src={
                                    `data:image/jpeg;base64,${user?.avatar}` ||
                                    'https://cdn-icons-png.flaticon.com/512/6596/6596121.png'
                                }
                                alt="Avatar"
                                className="w-full h-full"
                                style={{
                                    objectFit: 'cover',
                                    objectPosition: 'center',
                                }}
                            />
                        </div>
                        <IoIosArrowDown size={20} className="text-secondary" />
                    </div>
                </Tippy>
            </div>
        </header>
    );
};

export default Header;
