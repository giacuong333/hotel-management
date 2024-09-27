import React from 'react';

const Overlay = ({ isShow, onClose }) => {
    return (
        isShow && (
            <div
                style={{
                    position: 'fixed',
                    top: 0,
                    right: 0,
                    bottom: 0,
                    left: 0,
                    backgroundColor: 'rgba(0,0,0,.6)',
                    zIndex: 10,
                }}
                onClick={onClose}
            ></div>
        )
    );
};

export default Overlay;
