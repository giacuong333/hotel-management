import React from 'react';

import Image from '../Image';
import Overlay from '~/components/Overlay';

const ImageDetail = ({ url, name, isShow, onClose }) => {
    return (
        isShow && (
            <>
                <Overlay isShow={isShow} onClose={onClose} />
                <div className="image-detail">
                    <Image url={url} name={name} />
                </div>
            </>
        )
    );
};

export default ImageDetail;
