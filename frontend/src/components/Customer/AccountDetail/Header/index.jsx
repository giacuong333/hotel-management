import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Logo from './images/luxestay_logo.b519c98a9069f3de9e39.png';
import { useUser } from '~/providers/UserProvider';
import { Button } from 'react-bootstrap';
import { FaBarsStaggered } from 'react-icons/fa6';
import { IoClose } from 'react-icons/io5';

const Header = () => {
    const [isNavVisible, setIsNavVisible] = useState(false);
    const { user, signOut } = useUser();
    const navigate = useNavigate();

    const handleSignOut = async () => {
        await signOut();
        navigate('/signin');
    };

    return (
        <nav className="bg-black p-3">
            {/* Large and medium screens */}
            <div className="d-md-flex d-none align-items-center justify-content-between container mx-auto py-4 px-0">
                <div className="fw-semibold text-capitalize text-white">{user?.name}</div>
                <ul className="d-flex align-items-center justify-content-center gap-5">
                    <li>
                        <Link className="text-uppercase text-white" to="/">
                            Home
                        </Link>
                    </li>
                    <li>
                        <Link className="text-uppercase text-white" to="/rooms">
                            Rooms
                        </Link>
                    </li>
                    <li>
                        <Link className="text-uppercase text-white" to="/">
                            <img src={Logo} alt="Logo" />
                        </Link>
                    </li>
                    <li>
                        <Link className="text-uppercase text-white" to="/about">
                            About
                        </Link>
                    </li>
                    <li>
                        <Link className="text-uppercase text-white">Pages</Link>
                    </li>
                </ul>
                <Button
                    className="customer-primary-button py-2 px-4 rounded-0 text-uppercase text-center text-black"
                    onClick={handleSignOut}
                >
                    Sign out
                </Button>
            </div>

            {/* small screens */}
            <div className="d-md-none d-flex flex-column gap-4 container mx-auto py-2 px-4 pr-0">
                <div className="d-flex align-items-center justify-content-between">
                    <Link className="text-uppercase text-white" to="/">
                        <img src={Logo} alt="Logo" />
                    </Link>
                    {isNavVisible ? (
                        <IoClose
                            size={38}
                            className={`secondary-color cursor-pointer`}
                            onClick={() => setIsNavVisible(false)}
                        />
                    ) : (
                        <FaBarsStaggered
                            size={38}
                            className={`secondary-color cursor-pointer`}
                            onClick={() => setIsNavVisible(true)}
                        />
                    )}
                </div>
                <ul className={`d-flex flex-column gap-4 small-nav ${isNavVisible ? 'show-nav' : 'hide-nav'}`}>
                    <li>
                        <Link className="text-uppercase text-white" to="/">
                            Home
                        </Link>
                    </li>
                    <li>
                        <Link className="text-uppercase text-white" to="/rooms">
                            Rooms
                        </Link>
                    </li>
                    <li>
                        <Link className="text-uppercase text-white" to="/about">
                            About
                        </Link>
                    </li>
                    <li>
                        <Link className="text-uppercase text-white">Pages</Link>
                    </li>
                    <li>
                        <Button
                            className="w-full customer-primary-button py-2 px-4 rounded-0 text-uppercase text-center text-black"
                            onClick={handleSignOut}
                        >
                            Sign out
                        </Button>
                    </li>
                </ul>
            </div>
        </nav>
    );
};

export default Header;
