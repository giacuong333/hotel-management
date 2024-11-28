import React from 'react';
import { Link } from 'react-router-dom';

const NotFoundPage = () => {
    return (
        <section className="container mx-auto" style={{ height: '100vh' }}>
            <div className="d-flex flex-column justify-content-center h-full mx-auto text-center">
                <span className="text-uppercase position-relative" style={{ fontSize: '16rem' }}>
                    <p> OOPS!</p>
                    <p
                        className="text-uppercase position-absolute bg-white fs-2 lh-sm px-5 text-secondary"
                        style={{ top: 'calc(100% - 120px)', left: '50%', transform: 'translateX(-50%)' }}
                    >
                        404 - The page can't be found
                    </p>
                </span>

                <Link
                    to="/"
                    className="mx-auto text-center text-uppercase fw-semibold px-4 py-3 text-white secondary-bg-color secondary-bg-color-hover"
                    style={{ width: 'fit-content' }}
                >
                    Go to homepage
                </Link>
            </div>
        </section>
    );
};

export default NotFoundPage;
