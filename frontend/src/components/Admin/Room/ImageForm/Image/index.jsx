import React from 'react';

const Image = ({ url, customStyle }) => {
    return (
        <div className="w-full h-full rounded-5 overflow-hidden cursor-pointer shadow border">
            <img
                src={url}
                alt="Room"
                style={{ objectFit: 'cover', objectPosition: 'center', width: '100%', height: '100%' }}
                className={customStyle ? customStyle : ''}
            />
        </div>
    );
};

export default Image;
