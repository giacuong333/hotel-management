import React, { useState } from 'react';
import Image from './Image';
import ImageDetail from './ImageDetail';

const GalleryList = () => {
    const [isShowImage, setIsShowImage] = useState('');

    const showImage = (url) => {
        setIsShowImage(url);
    };

    const closeImage = () => {
        setIsShowImage('');
    };

    return (
        <>
            {isShowImage && <ImageDetail url={isShowImage} isShow={isShowImage} onClose={closeImage} />}
            <div className="row">
                <div
                    className="col-lg-6 p-1 image-hovered overflow-hidden cursor-pointer"
                    onClick={() =>
                        showImage('https://luxestay.wpthemeverse.com/wp-content/uploads/2024/08/room3_gallery1.png')
                    }
                >
                    <Image url="https://luxestay.wpthemeverse.com/wp-content/uploads/2024/08/room3_gallery1.png" />
                </div>
                <div
                    className="col-lg-6 p-1 image-hovered overflow-hidden cursor-pointer"
                    onClick={() =>
                        showImage('https://luxestay.wpthemeverse.com/wp-content/uploads/2024/08/room3_gallery2.png')
                    }
                >
                    <Image url="https://luxestay.wpthemeverse.com/wp-content/uploads/2024/08/room3_gallery2.png" />
                </div>
                <div
                    className="col-lg-6 p-1 image-hovered overflow-hidden cursor-pointer"
                    onClick={() =>
                        showImage('https://luxestay.wpthemeverse.com/wp-content/uploads/2024/08/deluxe-room.png')
                    }
                >
                    <Image url="https://luxestay.wpthemeverse.com/wp-content/uploads/2024/08/deluxe-room.png" />
                </div>
                <div
                    className="col-lg-6 p-1 image-hovered overflow-hidden cursor-pointer"
                    onClick={() =>
                        showImage('https://luxestay.wpthemeverse.com/wp-content/uploads/2024/08/superior-room.png')
                    }
                >
                    <Image url="https://luxestay.wpthemeverse.com/wp-content/uploads/2024/08/superior-room.png" />
                </div>
                <div className="col-lg-6 overflow-hidden">
                    <div className="row">
                        <div
                            className="col-lg-6 p-1 image-hovered overflow-hidden cursor-pointer"
                            onClick={() =>
                                showImage(
                                    'https://luxestay.wpthemeverse.com/wp-content/uploads/2024/08/family-suite.png',
                                )
                            }
                        >
                            <Image url="https://luxestay.wpthemeverse.com/wp-content/uploads/2024/08/family-suite.png" />
                        </div>
                        <div
                            className="col-lg-6 p-1 image-hovered overflow-hidden cursor-pointer"
                            onClick={() =>
                                showImage(
                                    'https://luxestay.wpthemeverse.com/wp-content/uploads/2024/08/garden-view-room.png',
                                )
                            }
                        >
                            <Image url="https://luxestay.wpthemeverse.com/wp-content/uploads/2024/08/garden-view-room.png" />
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default GalleryList;
