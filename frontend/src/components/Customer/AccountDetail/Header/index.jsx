import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Logo from './images/luxestay_logo.b519c98a9069f3de9e39.png';
import { useUser } from '~/providers/UserProvider';
import { Button } from 'react-bootstrap';

const Header = () => {
    const { user, signOut } = useUser();
    const navigate = useNavigate();

    const handleSignOut = async () => {
        await signOut();
        navigate('/signin');
    };

    return (
        <nav className="bg-black p-3">
            <div className="d-flex align-items-center justify-content-between container mx-auto py-4 px-0">
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
        </nav>
    );
};

export default Header;
