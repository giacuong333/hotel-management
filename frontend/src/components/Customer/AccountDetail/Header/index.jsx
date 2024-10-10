import React from 'react';

const Header = () => {
    return (
        <header>
            <div className="py-3 border-bottom d-flex align-items-center justify-content-between">
                <div className="fw-semibold">Gia Cường Account</div>
                <button className="secondary-bg-color rounded-pill py-1 px-4 text-white cursor-pointer fw-semibold">
                    Sign out
                </button>
            </div>
        </header>
    );
};

export default Header;
