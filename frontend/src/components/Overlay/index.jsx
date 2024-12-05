import React from 'react';

const Overlay = ({ isShow, onClose }) => {
    return <div className={`overlay ${isShow ? 'show' : 'hide'}`} onClick={onClose}></div>;
};

export default Overlay;
