import React, { useState, useEffect } from 'react';
import Room from '../../Room';
import axios from 'axios';
import { useLocation, useNavigate } from 'react-router-dom';
import { MdOutlineKeyboardArrowLeft, MdOutlineKeyboardArrowRight } from 'react-icons/md';

const Rooms = () => {
    const [rooms, setRooms] = useState([]);
    const [filteredRooms, setFilteredRooms] = useState([]);
    const [paginationRooms, setPaginationRooms] = useState([]);

    const [roomsPerPage] = useState(9);
    const [totalOfPages, setTotalOfPages] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);

    const navigate = useNavigate();
    const searchInput = useLocation().state;

    useEffect(() => {
        fetchRooms();
    }, []);

    useEffect(() => {
        const filtered = searchInput
            ? rooms.filter(
                  (room) =>
                      room?.name.toLowerCase().startsWith(searchInput.toLowerCase()) ||
                      room?.type.toLowerCase().includes(searchInput.toLowerCase()) ||
                      room?.bedNum == searchInput,
              )
            : rooms;
        setFilteredRooms(filtered);
        setCurrentPage(1);
    }, [searchInput, rooms]);

    useEffect(() => {
        setTotalOfPages(() => Math.ceil(filteredRooms.length / roomsPerPage));
    }, [filteredRooms, roomsPerPage]);

    useEffect(() => {
        const indexOfLastRoom = currentPage * roomsPerPage;
        const indexOfFirstRoom = indexOfLastRoom - roomsPerPage;
        setPaginationRooms(() => filteredRooms.slice(indexOfFirstRoom, indexOfLastRoom));
    }, [currentPage, filteredRooms, roomsPerPage]);

    const fetchRooms = async () => {
        try {
            const response = await axios.get('http://localhost:5058/room');
            if (response?.status === 200) {
                const roomsData = (response?.data?.$values || response?.data?.obj)?.filter((room) => !room.deletedAt);
                setRooms(roomsData);
            }
        } catch (error) {
            console.error('Failed to fetch rooms:', error);
        }
    };

    const handleRoomClick = (id) => navigate(`/room/${id}`);

    // Handle pagination
    const nextSlide = () => {
        currentPage < totalOfPages && setCurrentPage(currentPage + 1);
    };

    const prevSlide = () => {
        currentPage > 1 && setCurrentPage(currentPage - 1);
    };

    const clickSlide = (selected) => {
        setCurrentPage(selected);
    };

    return (
        <section>
            <div className="container mx-auto">
                <div className="row py-5">
                    {paginationRooms.map((room) => (
                        <div
                            key={room?.id}
                            className="col-lg-4 col-md-6 col-xs-1 cursor-pointer"
                            style={{ height: 'fit-content' }}
                            onClick={() => handleRoomClick(room?.id)}
                        >
                            <Room room={room} />
                        </div>
                    ))}
                </div>

                {/* data & pagination*/}
                <div className="d-flex align-items-center justify-content-center w-full py-5">
                    <div className="d-flex align-items-center justify-content-end gap-2">
                        <button
                            className={`p-2 px-3 rounded-2 cursor-pointer shadow-sm border ${
                                currentPage === 1 ? 'opacity-50 cursor-default pe-none' : ''
                            }`}
                            onClick={prevSlide}
                        >
                            <MdOutlineKeyboardArrowLeft />
                        </button>
                        {totalOfPages &&
                            [...Array(totalOfPages)].map((_, index) => {
                                const selected = index + 1;
                                return (
                                    <button
                                        key={index}
                                        className={`p-2 px-3 rounded-2 cursor-pointer shadow-sm border ${
                                            selected === currentPage ? 'secondary-bg-color text-white' : ''
                                        }`}
                                        onClick={() => clickSlide(selected)}
                                    >
                                        {index + 1}
                                    </button>
                                );
                            })}
                        <button
                            className={`p-2 px-3 rounded-2 cursor-pointer shadow-sm border ${
                                currentPage === totalOfPages ? 'opacity-50 cursor-default pe-none' : ''
                            }`}
                            onClick={nextSlide}
                        >
                            <MdOutlineKeyboardArrowRight />
                        </button>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Rooms;
