import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Tippy from '@tippyjs/react';
import { IoIosArrowDown } from 'react-icons/io';
import { FaBars } from 'react-icons/fa6';
import { FaRegUserCircle } from 'react-icons/fa';
import { MdOutlineManageAccounts } from 'react-icons/md';
import Logo from '../images/luxestay_logo.png';
import { useUser } from '../../../../providers/UserProvider';
import { CgLogOut } from 'react-icons/cg';

const Nav = () => {
    const [openSubNav, setOpenSubNav] = useState(false);
    const [showNav, setShowNav] = useState(false);
    const navigate = useNavigate();
    const { user, signOut } = useUser();

    const handleSignOut = async () => {
        await signOut();
        navigate('/signin');
    };

    return (
        <nav className="px-lg-5 py-lg-3 d-lg-flex align-items-center justify-content-between">
            <div className="d-flex align-items-center justify-content-lg-start justify-content-between gap-lg-5 navbar-bg px-lg-0 px-3 py-lg-0 py-2">
                <Link to="/">
                    <img src={Logo} alt="Logo" className="logo-size" />
                </Link>
                <FaBars
                    size={38}
                    className="customer-primary-color d-lg-none d-inline-block pointer"
                    style={{ cursor: 'pointer' }}
                    onClick={() => setShowNav((prev) => !prev)}
                />
                <ul className="d-lg-flex d-none align-items-center justify-content-start gap-5">
                    <li className="text-uppercase">
                        <Link to="/" className="text-white customer-primary-color-hover animation-effect">
                            Home
                        </Link>
                    </li>
                    <li className="text-uppercase">
                        <Link to="/rooms" className="text-white customer-primary-color-hover animation-effect">
                            Rooms
                        </Link>
                    </li>
                    <li className="text-uppercase">
                        <Link to="/about" className="text-white customer-primary-color-hover animation-effect">
                            About
                        </Link>
                    </li>
                    <li className="customer-primary-color-hover animation-effect text-uppercase">
                        <Tippy
                            content={
                                <ul className="p-2 bg-dark">
                                    <li className="text-capitalize">
                                        <Link
                                            to="/offer"
                                            className="text-white customer-primary-color-hover animation-effect py-1 d-block"
                                        >
                                            Offers & Promotions
                                        </Link>
                                    </li>
                                    <li className="text-capitalize">
                                        <Link
                                            to="/contact"
                                            className="text-white customer-primary-color-hover animation-effect py-1 d-block"
                                        >
                                            Contacts
                                        </Link>
                                    </li>
                                </ul>
                            }
                            interactive={true}
                            placement="bottom-end"
                            trigger="click"
                            theme="dark-border"
                            arrow={false}
                            className="bg-dark rounded-0"
                        >
                            <Link
                                onClick={() => setOpenSubNav((prev) => !prev)}
                                className="text-white customer-primary-color-hover animation-effect"
                            >
                                Pages
                                <IoIosArrowDown
                                    className={`ms-1 animation-effect  ${openSubNav ? 'rotate-default' : 'rotate-180'}`}
                                />
                            </Link>
                        </Tippy>
                    </li>
                </ul>
            </div>
            {/* For small screen */}
            <ul
                className={`d-lg-none d-block bg-black px-3 animation-effect ${
                    showNav ? 'max-h-20 opacity-100' : 'max-h-0 opacity-0'
                }`}
                style={{ overflow: 'hidden' }}
            >
                <li className="text-uppercase py-2">
                    <Link to="/" className="text-white customer-primary-color-hover animation-effect">
                        Home
                    </Link>
                </li>
                <li className="text-uppercase py-2">
                    <Link to="/rooms" className="text-white customer-primary-color-hover animation-effect">
                        Rooms
                    </Link>
                </li>
                <li className="text-uppercase py-2">
                    <Link to="/about" className="text-white customer-primary-color-hover animation-effect">
                        About
                    </Link>
                </li>
                <li className="customer-primary-color-hover animation-effect text-uppercase py-2">
                    <Tippy
                        content={
                            <ul className="p-2 bg-dark">
                                <li className="text-capitalize">
                                    <Link
                                        to="/offer"
                                        className="text-white customer-primary-color-hover animation-effect py-1 d-block"
                                    >
                                        Offers & Promotions
                                    </Link>
                                </li>
                                <li className="text-capitalize">
                                    <Link
                                        to="/contact"
                                        className="text-white customer-primary-color-hover animation-effect py-1 d-block"
                                    >
                                        Contacts
                                    </Link>
                                </li>
                            </ul>
                        }
                        interactive={true}
                        placement="right-end"
                        trigger="click"
                        theme="dark-border"
                        arrow={false}
                        className="bg-black rounded-0"
                    >
                        <Link
                            onClick={() => setOpenSubNav((prev) => !prev)}
                            className="text-white customer-primary-color-hover animation-effect"
                        >
                            Pages
                            <IoIosArrowDown
                                className={`ms-1 animation-effect  ${openSubNav ? 'rotate-90' : 'rotate90'}`}
                            />
                        </Link>
                    </Tippy>
                </li>
                {user !== null && (
                    <li className="text-uppercase py-2">
                        <Link to="/account" className="text-white customer-primary-color-hover animation-effect">
                            Account
                        </Link>
                    </li>
                )}
                <li className="py-2">
                    {user !== null ? (
                        <div className="d-flex align-items-center gap-1">
                            <Link
                                variant="primary"
                                className="customer-primary-button py-2 px-3 rounded-0 text-uppercase flex-grow-1 text-center"
                                onClick={handleSignOut}
                            >
                                Log out
                            </Link>
                        </div>
                    ) : (
                        <div className="d-flex align-items-center gap-1">
                            <Link
                                variant="primary"
                                to="/signin"
                                className="customer-primary-button py-2 px-3 rounded-0 text-uppercase flex-grow-1 text-center"
                            >
                                Sign in
                            </Link>
                            <Link
                                variant="primary"
                                to="/signup"
                                className="customer-primary-button py-2 px-3 rounded-0 text-uppercase flex-grow-1 text-center"
                            >
                                Sign up
                            </Link>
                        </div>
                    )}
                </li>
            </ul>
            {user !== null ? (
                <Tippy
                    interactive={true}
                    placement="bottom-end"
                    trigger="click"
                    arrow={false}
                    className="rounded-0 bg-dark"
                    content={
                        <ul className="bg-dark">
                            <li className="text-capitalize">
                                <Link
                                    to="/account"
                                    className="text-white customer-primary-color-hover animation-effect py-2 px-3 d-block"
                                >
                                    <MdOutlineManageAccounts size={20} /> Account
                                </Link>
                            </li>
                            <li className="text-capitalize">
                                <Link
                                    className="text-white customer-primary-color-hover animation-effect py-2 px-3 d-block"
                                    onClick={handleSignOut}
                                >
                                    <CgLogOut size={20} /> Log out
                                </Link>
                            </li>
                        </ul>
                    }
                >
                    <div className="text-white d-lg-flex d-none align-items-center gap-2 cursor-pointer">
                        <p>Hello {user.name}</p>
                        <FaRegUserCircle size={24} />
                    </div>
                </Tippy>
            ) : (
                <div className="d-lg-flex d-none align-items-center justify-content-center gap-1">
                    <Link
                        variant="primary"
                        to="/signin"
                        className="customer-primary-button py-2 px-3 rounded-0 text-uppercase"
                    >
                        Sign in
                    </Link>
                    <Link
                        variant="primary"
                        to="/signup"
                        className="customer-primary-button py-2 px-3 rounded-0 text-uppercase"
                    >
                        Sign up
                    </Link>
                </div>
            )}
        </nav>
    );
};

export default Nav;
