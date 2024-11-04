import React, { useState } from 'react';
import { FaFacebook } from 'react-icons/fa6';
import { FaInstagram } from 'react-icons/fa';
import { FaLinkedin } from 'react-icons/fa';
import { FaXTwitter } from 'react-icons/fa6';

import Background from './images/footer_bg.png';
import Image1 from './images/footer_img1-150x150.png';
import Image2 from './images/footer_img2.png';
import Image3 from './images/footer_img3.png';
import Image4 from './images/footer_img4.png';
import Image5 from './images/footer_img5.png';
import { Link } from 'react-router-dom';
import Tippy from '@tippyjs/react';
import { IoIosArrowDown } from 'react-icons/io';

const ExclusiveOffers = () => {
    const [openSubNav, setOpenSubNav] = useState(false);

    return (
        <section
            className=""
            style={{
                backgroundImage: `url(${Background})`,
                backgroundPosition: 'center',
                backgroundSize: 'cover',
                backgroundRepeat: 'no-repeat',
                padding: '60px 0',
            }}
        >
            <div className="container mx-auto px-5">
                <div
                    style={{
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '40px',
                        alignItems: 'center',
                        margin: 'auto',
                        marginBottom: '80px',
                        maxWidth: '600px',
                    }}
                >
                    <p className="text-uppercase text-center" style={{ fontSize: '2.4rem' }}>
                        Subscribe now to FOR updates and exclusive offers!
                    </p>
                    <div
                        className="border-bottom border-black p-2 d-flex align-items-center justify-content-between"
                        style={{
                            width: '70%',
                        }}
                    >
                        <input
                            type="email"
                            style={{ backgroundColor: 'transparent', outline: 'none', border: 'none', flex: '1' }}
                            placeholder="Your email"
                        />
                        <button className="text-uppercase text-black-50" style={{ backgroundColor: 'transparent' }}>
                            Subscribe
                        </button>
                    </div>
                    <ul
                        style={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            gap: '20px',
                        }}
                    >
                        <li>
                            <FaFacebook
                                size={40}
                                className="p-2 rounded-circle cursor-pointer social-medias-hover animation-effect"
                            />
                        </li>
                        <li>
                            <FaInstagram
                                size={40}
                                className="p-2 rounded-circle cursor-pointer social-medias-hover animation-effect"
                            />
                        </li>
                        <li>
                            <FaLinkedin
                                size={40}
                                className="p-2 rounded-circle cursor-pointer social-medias-hover animation-effect"
                            />
                        </li>
                        <li>
                            <FaXTwitter
                                size={40}
                                className="p-2 rounded-circle cursor-pointer social-medias-hover animation-effect"
                            />
                        </li>
                    </ul>
                </div>

                <div>
                    <ul className="d-flex flex-wrap align-items-center justify-content-center gap-5 mb-5">
                        <li className="text-uppercase">
                            <Link to="/" className="text-black customer-primary-color-hover animation-effect">
                                Home
                            </Link>
                        </li>
                        <li className="text-uppercase">
                            <Link to="/rooms" className="text-black customer-primary-color-hover animation-effect">
                                Rooms
                            </Link>
                        </li>
                        <li className="text-uppercase">
                            <Link to="/about" className="text-black customer-primary-color-hover animation-effect">
                                About Us
                            </Link>
                        </li>
                        <li className="customer-primary-color-hover animation-effect text-uppercase">
                            <Tippy
                                content={
                                    <ul className="p-2 bg-dark">
                                        <li className="text-capitalize">
                                            <Link
                                                to="/offer"
                                                className="text-black customer-primary-color-hover animation-effect py-1 d-block"
                                            >
                                                Offers & Promotions
                                            </Link>
                                        </li>
                                        <li className="text-capitalize">
                                            <Link
                                                to="/contact"
                                                className="text-black customer-primary-color-hover animation-effect py-1 d-block"
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
                                    className="text-black customer-primary-color-hover animation-effect"
                                >
                                    Pages
                                    <IoIosArrowDown
                                        className={`ms-1 animation-effect text-black  ${
                                            openSubNav ? 'rotate-default' : 'rotate-180'
                                        }`}
                                    />
                                </Link>
                            </Tippy>
                        </li>
                        <li className="text-uppercase">
                            <Link to="/contacts" className="text-black customer-primary-color-hover animation-effect">
                                Contacts
                            </Link>
                        </li>
                    </ul>
                    <ul className="d-flex align-items-center justify-content-center gap-5 flex-wrap">
                        <li style={{ maxWidth: '200px', height: '300px' }}>
                            <img
                                src={Image1}
                                alt=""
                                loading="lazy"
                                className="w-full h-full"
                                style={{ objectFit: 'cover', objectPosition: 'center' }}
                            />
                        </li>
                        <li style={{ maxWidth: '200px', height: '300px' }}>
                            <img
                                src={Image2}
                                alt=""
                                loading="lazy"
                                className="w-full h-full"
                                style={{ objectFit: 'cover', objectPosition: 'center' }}
                            />
                        </li>
                        <li style={{ maxWidth: '200px', height: '300px' }}>
                            <img
                                src={Image3}
                                alt=""
                                loading="lazy"
                                className="w-full h-full"
                                style={{ objectFit: 'cover', objectPosition: 'center' }}
                            />
                        </li>
                        <li style={{ maxWidth: '200px', height: '300px' }}>
                            <img
                                src={Image4}
                                alt=""
                                loading="lazy"
                                className="w-full h-full"
                                style={{ objectFit: 'cover', objectPosition: 'center' }}
                            />
                        </li>
                        <li style={{ maxWidth: '200px', height: '300px' }}>
                            <img
                                src={Image5}
                                alt=""
                                loading="lazy"
                                className="w-full h-full"
                                style={{ objectFit: 'cover', objectPosition: 'center' }}
                            />
                        </li>
                    </ul>
                </div>
            </div>
        </section>
    );
};

export default ExclusiveOffers;
