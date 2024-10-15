import React, { useCallback, useEffect, useState } from 'react';
import axios from 'axios';

import DataTable from 'react-data-table-component';

import { BsTrash } from 'react-icons/bs';
import { FaSortAlphaDownAlt } from 'react-icons/fa';
import { IoSearchOutline } from 'react-icons/io5';
import { FiPlus } from 'react-icons/fi';

import BookingForm from './BookingForm';
import ToastContainer, { showToast } from '~/utils/showToast';
import FormGroup from '~/components/FormGroup';
import ConfirmPopup from '~/components/ConfirmPopup';
import formatCurrency from '~/utils/currencyPipe';
import { RotatingLines } from 'react-loader-spinner';
import { Button } from 'react-bootstrap';

const Booking = () => {
    const [pending, setPending] = useState(true);
    const [showPanel, setShowPanel] = useState('');
    const [selectedRoom, setSelectedRoom] = useState(null);
    const [rooms, setBookings] = useState([]);

    const [deleteAll, setDeleteAll] = useState({ count: 0, payload: [], yes: false });
    const [showDeleteAllConfirm, setShowDeleteAllConfirm] = useState(false);
    const [deleteOne, setDeleteOne] = useState({ payload: null });
    const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

    const [searchInput, setSearchInput] = useState('');
    const [searchedBookings, setSearchedBookings] = useState([]);

    // For deleting selected rooms
    useEffect(() => {
        const deleteAllRooms = async () => {
            try {
                // Create payload for deletion (id list)
                const payload = deleteAll.payload.map((room) => ({ id: room.id }));
                const response = await axios.delete('http://localhost:5058/room', { data: payload });
                console.log(response);
                if (response?.status === 200) {
                    const data = response?.data?.obj?.updatedRooms?.$values.map((room) => {
                        room.statusName = room.status === 1 ? 'Empty' : room.status === 2 ? 'Booked' : 'Staying';
                        room.formattedPrice = formatCurrency(room.price);
                        return room;
                    });
                    showToast(response?.data?.obj?.message || response?.data?.message, 'success');
                    setBookings(data);
                    setSearchedBookings(data);
                    reset();
                }
            } catch (error) {
                console.log(error);
                showToast(error?.response?.data?.message, 'error');
            } finally {
                reset();
            }
        };

        deleteAll.yes && deleteAllRooms();
    }, [deleteAll.yes, deleteAll.payload]);

    // For searching
    useEffect(() => {
        const timeout = setTimeout(() => {
            if (searchInput.trim() === '') {
                setSearchedBookings(rooms);
            } else {
                const filteredRooms = rooms.filter(
                    (room) =>
                        String(room.name).toLowerCase().includes(String(searchInput).toLowerCase()) ||
                        String(room.type).toLowerCase().includes(String(searchInput).toLowerCase()) ||
                        String(room.statusName).toLowerCase().includes(String(searchInput).toLowerCase()) ||
                        (room.price <= Number(searchInput) + 300 && room.price >= Number(searchInput) + 300) ||
                        room.price === Number(searchInput),
                );
                setSearchedBookings(filteredRooms);
            }
        }, 300);

        return () => clearTimeout(timeout);
    }, [searchInput, rooms]);

    // For fetching
    useEffect(() => {
        const fetchBookings = async () => {
            const controller = new AbortController();
            try {
                const url = 'http://localhost:5058/booking';
                const headers = { headers: { 'Content-Type': 'application/json' } };
                const response = await axios.get(url, headers);
                if (response?.status === 200) {
                    const data = response?.data?.obj?.$values;
                    setBookings(data || []);
                    setSearchedBookings(data || []);
                }
                console.log(response);
            } catch (error) {
                console.log('Error fetching rooms:', error);
                showToast(
                    error?.response?.obj?.message ||
                        error?.response?.message ||
                        error?.response?.data?.message ||
                        'Something went wrong while fetching bookings',
                    'error',
                );
            } finally {
                setPending(false);
            }
            return () => controller.abort();
        };

        const timeout = setTimeout(fetchBookings, 1000);
        return () => clearTimeout(timeout);
    }, []);

    const handleTrashClicked = (id) => {
        setDeleteOne({ payload: id });
        setShowDeleteConfirm(true);
    };

    // Delete a room
    const deleteBooking = async (payload) => {
        try {
            const url = 'http://localhost:5058/booking';
            const response = await axios.delete(`${url}/${payload}`);
            if (response?.status === 200) {
                showToast(response?.data?.obj?.message || response?.data?.message, 'success');
                setBookings((prev) => prev.filter((booking) => booking.id !== payload));
                setSearchInput('');
            }
        } catch (error) {
            if (error?.response?.status === 403) {
                showToast(error?.response?.data?.message, 'error');
            } else if (error?.response?.status === 401) {
                showToast('You need to log in', 'error');
            } else if (error?.response?.status === 409) {
                showToast(error?.response?.data?.message, 'error');
            } else {
                showToast(error?.response?.data?.obj?.message || 'Error deleting booking', 'error');
            }
        } finally {
            reset();
        }
    };

    const handleEditClicked = (user) => {
        setSelectedRoom(user);
        setShowPanel('edit');
    };

    const handleAddClicked = () => {
        setShowPanel('add');
        setSelectedRoom(null);
    };

    const handleRowClicked = useCallback(async (e) => {
        const { id } = e;
        try {
            const response = await axios.get(`http://localhost:5058/room/${id}`, {
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            console.log('Response', response);
            if (response?.status === 200) {
                setShowPanel('see');
                setSelectedRoom(response?.data?.obj);
            }
        } catch (error) {
            console.error('Error fetching user details:', error);
        }
    }, []);

    const handleSelectedRowsChanged = ({ allSelected, selectedCount, selectedRows }) => {
        setDeleteAll({ count: selectedCount, payload: selectedRows });
    };

    const handleDeleteRowsSelected = () => {
        deleteAll.count !== 0 && setShowDeleteAllConfirm(true);
    };

    const handleRoomAdded = (newRoom) => {
        newRoom.statusName = newRoom.status === 1 ? 'Empty' : newRoom.status === 2 ? 'Booked' : 'Staying';
        newRoom.formattedPrice = formatCurrency(newRoom.price);
        setBookings((prevRoom) => [...prevRoom, newRoom]);
        setSearchedBookings((prevRoom) => [...prevRoom, newRoom]);
    };

    const handleRoomUpdated = (updatedRoom) => {
        updatedRoom.statusName = updatedRoom.status === 1 ? 'Empty' : updatedRoom.status === 2 ? 'Booked' : 'Staying';
        updatedRoom.formattedPrice = formatCurrency(updatedRoom.price);
        setBookings((prevRooms) =>
            prevRooms.map((prevRoom) => (prevRoom.id === updatedRoom.id ? { ...updatedRoom } : prevRoom)),
        );
        setSearchedBookings((prevRooms) =>
            prevRooms.map((prevRoom) => (prevRoom.id === updatedRoom.id ? { ...updatedRoom } : prevRoom)),
        );
    };

    const reset = () => {
        setDeleteAll({ count: 0, payload: [], yes: false });
        setShowDeleteAllConfirm(false);
        setDeleteOne({ payload: null });
        setShowDeleteConfirm(false);
        setSearchInput('');
    };

    return (
        <div>
            {/* Show a toast */}
            {ToastContainer}

            {/* Show confirmation when clicking on delete all rooms */}
            {showDeleteAllConfirm && (
                <ConfirmPopup
                    header="Are you sure you want to delete all the selected rooms?"
                    message="This action cannot be undone."
                    negativeChoice="Cancel"
                    positiveChoice="Delete"
                    isShow={showDeleteAllConfirm}
                    onYes={() => setDeleteAll((prev) => ({ ...prev, yes: true }))}
                    onClose={reset}
                />
            )}

            {/* Show confirmation when clicking on delete a booking*/}
            {showDeleteConfirm && (
                <ConfirmPopup
                    header="Are you sure you want to delete the selected booking?"
                    message="This action cannot be undone."
                    negativeChoice="Cancel"
                    positiveChoice="Delete"
                    isShow={showDeleteConfirm}
                    onYes={() => deleteBooking(deleteOne.payload)}
                    onClose={reset}
                />
            )}

            <div className="d-flex align-items-center justify-content-between w-full py-4">
                {deleteAll.count === 0 ? (
                    <FiPlus
                        size={30}
                        className="p-1 rounded-2 text-white secondary-bg-color cursor-pointer"
                        onClick={handleAddClicked}
                    />
                ) : (
                    <BsTrash
                        size={30}
                        className="p-1 rounded-2 text-white secondary-bg-color cursor-pointer"
                        onClick={handleDeleteRowsSelected}
                    />
                )}

                <FormGroup
                    id="search"
                    name="search"
                    value={searchInput}
                    type="text"
                    placeHolder="Search..."
                    Icon={IoSearchOutline}
                    customParentInputStyle="pe-2 rounded-1"
                    onChange={(e) => setSearchInput(e.target.value)}
                />
            </div>

            <div className="row">
                <div className="col-lg-3 col-md-4 col-sm-6 mt-4">
                    <div className="secondary-bg-color rounded-2 text-white shadow p-3">
                        <div className="pb-2">
                            <p className="fw-semibold">David Anderson</p>
                            <p>Service</p>
                            <p>Counselling</p>
                            <div className="d-flex align-items-center gap-3">
                                <div className="">
                                    <p>Date</p>
                                    <small>27 May 2021</small>
                                </div>
                                <div className="">
                                    <p>Time</p>
                                    <small>11:00 - 12:00</small>
                                </div>
                            </div>
                        </div>
                        <div className="py-2 border-top d-flex align-items-center justify-content-between">
                            <p className="text-capitalize cursor-pointer">Accept Booking</p>
                            <p className="text-capitalize text-secondary cursor-pointer">Decline</p>
                        </div>
                    </div>
                </div>
                <div className="col-lg-3 col-md-4 col-sm-6 mt-4">
                    <div className="secondary-bg-color rounded-2 text-white shadow p-3">
                        <div className="pb-2">
                            <p className="fw-semibold">David Anderson</p>
                            <p>Service</p>
                            <p>Counselling</p>
                            <div className="d-flex align-items-center gap-3">
                                <div className="">
                                    <p>Date</p>
                                    <small>27 May 2021</small>
                                </div>
                                <div className="">
                                    <p>Time</p>
                                    <small>11:00 - 12:00</small>
                                </div>
                            </div>
                        </div>
                        <div className="py-2 border-top d-flex align-items-center justify-content-between">
                            <p className="text-capitalize cursor-pointer">Accept Booking</p>
                            <p className="text-capitalize text-secondary cursor-pointer">Decline</p>
                        </div>
                    </div>
                </div>
                <div className="col-lg-3 col-md-4 col-sm-6 mt-4">
                    <div className="secondary-bg-color rounded-2 text-white shadow p-3">
                        <div className="pb-2">
                            <p className="fw-semibold">David Anderson</p>
                            <p>Service</p>
                            <p>Counselling</p>
                            <div className="d-flex align-items-center gap-3">
                                <div className="">
                                    <p>Date</p>
                                    <small>27 May 2021</small>
                                </div>
                                <div className="">
                                    <p>Time</p>
                                    <small>11:00 - 12:00</small>
                                </div>
                            </div>
                        </div>
                        <div className="py-2 border-top d-flex align-items-center justify-content-between">
                            <p className="text-capitalize cursor-pointer">Accept Booking</p>
                            <p className="text-capitalize text-secondary cursor-pointer">Decline</p>
                        </div>
                    </div>
                </div>
                <div className="col-lg-3 col-md-4 col-sm-6 mt-4">
                    <div className="secondary-bg-color rounded-2 text-white shadow p-3">
                        <div className="pb-2">
                            <p className="fw-semibold">David Anderson</p>
                            <p>Service</p>
                            <p>Counselling</p>
                            <div className="d-flex align-items-center gap-3">
                                <div className="">
                                    <p>Date</p>
                                    <small>27 May 2021</small>
                                </div>
                                <div className="">
                                    <p>Time</p>
                                    <small>11:00 - 12:00</small>
                                </div>
                            </div>
                        </div>
                        <div className="py-2 border-top d-flex align-items-center justify-content-between">
                            <p className="text-capitalize cursor-pointer">Accept Booking</p>
                            <p className="text-capitalize text-secondary cursor-pointer">Decline</p>
                        </div>
                    </div>
                </div>
                <div className="col-lg-3 col-md-4 col-sm-6 mt-4">
                    <div className="secondary-bg-color rounded-2 text-white shadow p-3">
                        <div className="pb-2">
                            <p className="fw-semibold">David Anderson</p>
                            <p>Service</p>
                            <p>Counselling</p>
                            <div className="d-flex align-items-center gap-3">
                                <div className="">
                                    <p>Date</p>
                                    <small>27 May 2021</small>
                                </div>
                                <div className="">
                                    <p>Time</p>
                                    <small>11:00 - 12:00</small>
                                </div>
                            </div>
                        </div>
                        <div className="py-2 border-top d-flex align-items-center justify-content-between">
                            <p className="text-capitalize cursor-pointer">Accept Booking</p>
                            <p className="text-capitalize text-secondary cursor-pointer">Decline</p>
                        </div>
                    </div>
                </div>
                <div className="col-lg-3 col-md-4 col-sm-6 mt-4">
                    <div className="secondary-bg-color rounded-2 text-white shadow p-3">
                        <div className="pb-2">
                            <p className="fw-semibold">David Anderson</p>
                            <p>Service</p>
                            <p>Counselling</p>
                            <div className="d-flex align-items-center gap-3">
                                <div className="">
                                    <p>Date</p>
                                    <small>27 May 2021</small>
                                </div>
                                <div className="">
                                    <p>Time</p>
                                    <small>11:00 - 12:00</small>
                                </div>
                            </div>
                        </div>
                        <div className="py-2 border-top d-flex align-items-center justify-content-between">
                            <p className="text-capitalize cursor-pointer">Accept Booking</p>
                            <p className="text-capitalize text-secondary cursor-pointer">Decline</p>
                        </div>
                    </div>
                </div>
                <div className="col-lg-3 col-md-4 col-sm-6 mt-4">
                    <div className="secondary-bg-color rounded-2 text-white shadow p-3">
                        <div className="pb-2">
                            <p className="fw-semibold">David Anderson</p>
                            <p>Service</p>
                            <p>Counselling</p>
                            <div className="d-flex align-items-center gap-3">
                                <div className="">
                                    <p>Date</p>
                                    <small>27 May 2021</small>
                                </div>
                                <div className="">
                                    <p>Time</p>
                                    <small>11:00 - 12:00</small>
                                </div>
                            </div>
                        </div>
                        <div className="py-2 border-top d-flex align-items-center justify-content-between">
                            <p className="text-capitalize cursor-pointer">Accept Booking</p>
                            <p className="text-capitalize text-secondary cursor-pointer">Decline</p>
                        </div>
                    </div>
                </div>
                <div className="col-lg-3 col-md-4 col-sm-6 mt-4">
                    <div className="secondary-bg-color rounded-2 text-white shadow p-3">
                        <div className="pb-2">
                            <p className="fw-semibold">David Anderson</p>
                            <p>Service</p>
                            <p>Counselling</p>
                            <div className="d-flex align-items-center gap-3">
                                <div className="">
                                    <p>Date</p>
                                    <small>27 May 2021</small>
                                </div>
                                <div className="">
                                    <p>Time</p>
                                    <small>11:00 - 12:00</small>
                                </div>
                            </div>
                        </div>
                        <div className="py-2 border-top d-flex align-items-center justify-content-between">
                            <p className="text-capitalize cursor-pointer">Accept Booking</p>
                            <p className="text-capitalize text-secondary cursor-pointer">Decline</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Booking;
