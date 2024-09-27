import React from 'react';

const Image = ({ url, name }) => {
    return (
        <div className="w-full overflow-hidden">
            <img src={url} alt={name} className="w-full h-full object-fit-cover" />
        </div>
    );
};

export default Image;
