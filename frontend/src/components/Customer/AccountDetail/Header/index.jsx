import React from 'react';
import { useNavigate } from 'react-router';
import { useUser } from '~/providers/UserProvider';

const Header = () => {
    const { user, signOut } = useUser();
    const navigate = useNavigate();

    const handleSignOut = async () => {
        await signOut();
        navigate('/signin');
    };

    return (
        <header>
            <nav></nav>
            <div className="py-3 border-bottom d-flex align-items-center justify-content-between">
                <div className="fw-semibold text-capitalize">{user?.name} Account</div>
                <button
                    className="secondary-bg-color rounded-pill py-1 px-4 text-white cursor-pointer fw-semibold"
                    onClick={handleSignOut}
                >
                    Sign out
                </button>
            </div>
        </header>
    );
};

export default Header;
