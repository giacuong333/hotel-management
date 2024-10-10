import React from 'react';
import Background from './images/services_bg.png';
import DoubleQuote from './images/double_quote.svg';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

import Slider from 'react-slick';

const carouselSettings = {
    infinite: true,
    speed: 2000,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
    arrows: false,
    responsive: [
        {
            breakpoint: 1024,
            settings: {
                slidesToShow: 1,
            },
        },
        {
            breakpoint: 600,
            settings: {
                slidesToShow: 1,
            },
        },
    ],
};

const Testimonial = () => {
    return (
        <section
            style={{
                backgroundImage: `url(${Background})`,
                padding: '5rem',
            }}
        >
            <div className="container mx-auto">
                <Slider {...carouselSettings}>
                    <div className="row d-flex h-auto cursor-pointer">
                        <div className="col-4">
                            <div className="d-flex align-items-center">
                                <div className="col-6">
                                    <div className="" style={{ width: '80px' }}>
                                        <img src={DoubleQuote} alt="" className="w-full h-auto" />
                                    </div>
                                </div>
                                <div className="col-6">
                                    <div className="ps-3 border-dark-subtle border-start" style={{ width: '200px' }}>
                                        <img
                                            src="https://luxestay.wpthemeverse.com/wp-content/uploads/2024/07/testimonial_img.png"
                                            alt=""
                                            className="w-full h-auto"
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-8">
                            <div className="text-white px-5 w-full h-full d-flex flex-column justify-content-between">
                                <p className="fs-4">
                                    Climbing natural rock formations with ropes and harnesses. Scaling frozen waterfalls
                                    or ice-covered rock faces using specialized equipment. Descending snow-covered
                                    slopes on skis or a snowboard.
                                </p>
                                <p className="fs-4 pb-3 border-bottom border-white fw-light">
                                    Robert Garcia <small className="fs-6 text-secondary">CEO, Blogger</small>
                                </p>
                            </div>
                        </div>
                    </div>
                    <div className="row d-flex h-auto cursor-pointer">
                        <div className="col-4">
                            <div className="d-flex align-items-center">
                                <div className="col-6">
                                    <div className="" style={{ width: '80px' }}>
                                        <img src={DoubleQuote} alt="" className="w-full h-auto" />
                                    </div>
                                </div>
                                <div className="col-6">
                                    <div className="ps-3 border-dark-subtle border-start" style={{ width: '200px' }}>
                                        <img
                                            src="https://luxestay.wpthemeverse.com/wp-content/uploads/2024/07/testimonial_img.png"
                                            alt=""
                                            className="w-full h-auto"
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-8">
                            <div className="text-white px-5 w-full h-full d-flex flex-column justify-content-between">
                                <p className="fs-4">
                                    Climbing natural rock formations with ropes and harnesses. Scaling frozen waterfalls
                                    or ice-covered rock faces using specialized equipment. Descending snow-covered
                                    slopes on skis or a snowboard.
                                </p>
                                <p className="fs-4 pb-3 border-bottom border-white fw-light">
                                    Robert Garcia <small className="fs-6 text-secondary">CEO, Blogger</small>
                                </p>
                            </div>
                        </div>
                    </div>
                    <div className="row d-flex h-auto cursor-pointer">
                        <div className="col-4">
                            <div className="d-flex align-items-center">
                                <div className="col-6">
                                    <div className="" style={{ width: '80px' }}>
                                        <img src={DoubleQuote} alt="" className="w-full h-auto" />
                                    </div>
                                </div>
                                <div className="col-6">
                                    <div className="ps-3 border-dark-subtle border-start" style={{ width: '200px' }}>
                                        <img
                                            src="https://luxestay.wpthemeverse.com/wp-content/uploads/2024/07/testimonial_img.png"
                                            alt=""
                                            className="w-full h-auto"
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-8">
                            <div className="text-white px-5 w-full h-full d-flex flex-column justify-content-between">
                                <p className="fs-4">
                                    Climbing natural rock formations with ropes and harnesses. Scaling frozen waterfalls
                                    or ice-covered rock faces using specialized equipment. Descending snow-covered
                                    slopes on skis or a snowboard.
                                </p>
                                <p className="fs-4 pb-3 border-bottom border-white fw-light">
                                    Robert Garcia <small className="fs-6 text-secondary">CEO, Blogger</small>
                                </p>
                            </div>
                        </div>
                    </div>
                    <div className="row d-flex h-auto cursor-pointer">
                        <div className="col-4">
                            <div className="d-flex align-items-center">
                                <div className="col-6">
                                    <div className="" style={{ width: '80px' }}>
                                        <img src={DoubleQuote} alt="" className="w-full h-auto" />
                                    </div>
                                </div>
                                <div className="col-6">
                                    <div className="ps-3 border-dark-subtle border-start" style={{ width: '200px' }}>
                                        <img
                                            src="https://luxestay.wpthemeverse.com/wp-content/uploads/2024/07/testimonial_img.png"
                                            alt=""
                                            className="w-full h-auto"
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-8">
                            <div className="text-white px-5 w-full h-full d-flex flex-column justify-content-between">
                                <p className="fs-4">
                                    Climbing natural rock formations with ropes and harnesses. Scaling frozen waterfalls
                                    or ice-covered rock faces using specialized equipment. Descending snow-covered
                                    slopes on skis or a snowboard.
                                </p>
                                <p className="fs-4 pb-3 border-bottom border-white fw-light">
                                    Robert Garcia <small className="fs-6 text-secondary">CEO, Blogger</small>
                                </p>
                            </div>
                        </div>
                    </div>
                </Slider>
            </div>
        </section>
    );
};

export default Testimonial;
