import axios from 'axios';
import React, { useEffect, useRef, useState } from 'react';
import { IoClose } from 'react-icons/io5';
import Overlay from '~/components/Overlay';
import ToastContainer, { showToast } from '~/utils/showToast';
import Image from './Image';

// isShow is roomId
const ImageForm = ({ isShow, onClose }) => {
    const [images, setImages] = useState(null);
    const [menuVisible, setMenuVisible] = useState(false);
    const [menuPosition, setMenuPosition] = useState({ x: 0, y: 0 });
    const [menuItems, setMenuItems] = useState([{ label: 'Delete' }]);
    const [idDelete, setIdDelete] = useState(null);
    const inputRef = useRef(null);

    useEffect(() => {
        isShow && fetchGallery();
    }, [isShow]);

    const fetchGallery = async () => {
        try {
            const url = 'http://localhost:5058/gallery';
            const response = await axios.get(`${url}/${isShow}`);
            response?.status === 200 && setImages(response?.data?.obj?.$values);
            console.log(response);
        } catch (error) {
            showToast(
                error?.repsonse?.data?.message ||
                    error?.response?.message ||
                    'Something went wrong while fetching gallery',
                'error',
            );
        }
    };

    const handleAddClick = () => inputRef.current.click();

    // Upload image
    const handleInputChange = async () => {
        const file = inputRef.current.files[0];
        const payload = new FormData();
        payload.append('file', file);
        payload.append('roomId', isShow);

        try {
            const url = 'http://localhost:5058/gallery';
            const response = await axios.post(url, payload);
            response?.status === 201 && fetchGallery();
        } catch (error) {
            showToast(error?.response?.data?.message || error?.response?.message || 'Something went wrong', 'error');
        }
    };

    // Delete image
    const handleDelete = async () => {
        try {
            const url = 'http://localhost:5058/gallery';
            const response = await axios.delete(`${url}/${idDelete}`);
            response?.status === 200 && fetchGallery() && setMenuVisible(false);
        } catch (error) {
            showToast(
                error?.response?.data?.obj?.message ||
                    error?.repsonse?.message ||
                    'Something went wrong while deleting',
                'error',
            );
        }
    };

    // Context Menu
    const handleContextMenu = (e, id) => {
        e.preventDefault();
        setMenuPosition({ x: e.pageX, y: e.pageY });
        setMenuVisible(true);
        setIdDelete(id);
    };

    const handleClick = () => {
        menuVisible && setMenuVisible(false);
    };

    return (
        <>
            {/* Show toast if error */}
            {ToastContainer}
            {/* Context menu */}
            {menuVisible && (
                <div
                    className="bg-light shadow-sm rounded-1"
                    style={{
                        position: 'absolute',
                        top: `${menuPosition.y}px`,
                        left: `${menuPosition.x}px`,
                        zIndex: 30,
                    }}
                >
                    {menuItems.map((item, index) => {
                        return (
                            <button
                                key={index}
                                className="cursor-pointer bg-white customer-primary-button py-1 px-4 text-white"
                                onClick={handleDelete}
                            >
                                {item.label}
                            </button>
                        );
                    })}
                </div>
            )}
            <div>
                <Overlay isShow={isShow !== null} onClose={onClose} />
                <div
                    style={{
                        position: 'fixed',
                        top: '50%',
                        left: '50%',
                        zIndex: 20,
                        transform: 'translate(-50%, -50%)',
                        padding: '2rem',
                        backgroundColor: '#fff',
                        height: '600px',
                        width: '1000px',
                    }}
                    className="rounded-5 border shadow"
                >
                    <IoClose
                        size={30}
                        className="p-1 rounded-circle cursor-pointer text-white customer-primary-button bg-hover-white text-hover-black"
                        style={{
                            position: 'absolute',
                            top: 0,
                            right: -38,
                            zIndex: 20,
                        }}
                        onClick={onClose}
                    />
                    <input type="file" hidden ref={inputRef} onChange={handleInputChange} />
                    <button
                        size={30}
                        className="p-2 rounded-pill cursor-pointer text-white customer-primary-button bg-hover-white text-hover-black"
                        style={{
                            position: 'absolute',
                            top: 'calc(0px + 30px + 6px)',
                            right: -36,
                            zIndex: 20,
                        }}
                        onClick={handleAddClick}
                    >
                        A<br />d<br />d
                    </button>
                    <div className="container mx-auto">
                        <div className="row">
                            {images?.map((image) => (
                                <div
                                    key={image.id}
                                    className="col-lg-4 col-sm-6 p-1"
                                    onContextMenu={(e) => handleContextMenu(e, image.id)}
                                    onClick={handleClick}
                                >
                                    <Image url={`data:image/jpeg;base64,${image.image}`} />
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default ImageForm;
