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
import { useCheckPermission } from '~/providers/CheckPermissionProvider';

const Booking = () => {
    const [pending, setPending] = useState(true);
    const [deleteAll, setDeleteAll] = useState({ count: 0, payload: [], yes: false });
    const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
    const [showDeleteAllConfirm, setShowDeleteAllConfirm] = useState(false);
    const [clearSelectedRows, setClearSelectedRows] = useState(false);
    const [showPanel, setShowPanel] = useState('');
    const [selectedBookings, setSelectedBooking] = useState(null);
    const [bookings, setBookings] = useState([]);
    const [deleteOne, setDeleteOne] = useState({ payload: null });
    const [searchInput, setSearchInput] = useState('');
    const [searchedBookings, setSearchedBookings] = useState([]);
    const {
        readBooking: hasPermissionRead,
        createBooking: hasPermissionCreate,
        updateBooking: hasPermissionUpdate,
        deleteBooking: hasPermissionDelete,
    } = useCheckPermission();

    // For deleting selected bookings
    useEffect(() => {
        const deleteAllBookings = async () => {
            try {
                // Create payload for deletion (id list)
                const payload = deleteAll.payload.map((bookingDelete) => ({ id: bookingDelete.id }));
                console.log('Payload', payload);
                const response = await axios.delete('http://localhost:5058/booking', { data: payload });
                console.log(response);
                if (response?.status === 200) {
                    const data = response?.data?.obj?.updatedBookings?.$values.map((booking) => {
                        booking.statusName =
                            booking.status === 0
                                ? 'Cancle'
                                : booking.status === 1
                                ? 'Confirmed'
                                : booking.status === 2
                                ? 'Check-in'
                                : 'Check-out';
                        return booking;
                    });
                    showToast(response?.data?.obj?.message || response?.data?.message, 'success');
                    setBookings(data);
                    setSearchedBookings(data);
                    reset();
                }
            } catch (error) {
                console.log(error);
                showToast(error?.response?.data?.message || 'Something went wrong while deleting bookings', 'error');
            } finally {
                reset();
            }
        };

        deleteAll.yes && deleteAllBookings();
    }, [deleteAll.yes, deleteAll.payload]);

    // For searching
    useEffect(() => {
        const timeout = setTimeout(() => {
            if (searchInput.trim() === '') {
                setSearchedBookings(bookings);
            } else {
                const filteredRooms = bookings.filter((booking) => {
                    const searchValue =
                        searchInput === 'Cancel'
                            ? 0
                            : searchInput === 'Confirmed'
                            ? 1
                            : searchInput === 'Check-in'
                            ? 2
                            : 3;
                    return (
                        String(booking?.customer?.name).toLowerCase().includes(String(searchInput).toLowerCase()) ||
                        String(booking?.customer?.phoneNumber).includes(String(searchInput)) ||
                        booking?.status === Number(searchValue)
                    );
                });
                setSearchedBookings(filteredRooms);
            }
        }, 300);

        return () => clearTimeout(timeout);
    }, [searchInput, bookings]);

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
            } catch (error) {
                console.log('Error fetching bookings:', error);
                showToast(
                    error?.response?.obj?.message ||
                        error?.response?.message ||
                        'Something went wrong while fetching bookings',
                    'error',
                );
            } finally {
                setPending(false);
            }

            return () => controller.abort();
        };

        const timeout = setTimeout(fetchBookings, 2000);
        return () => clearTimeout(timeout);
    }, []);

    const handleTrashClicked = (id) => {
        setDeleteOne({ payload: id });
        setShowDeleteConfirm(true);
    };

    // Delete a booking
    const deleteBooking = async (payload) => {
        try {
            const url = 'http://localhost:5058/booking';
            const response = await axios.delete(`${url}/${payload}`);
            console.log(response);
            if (response?.status === 200) {
                showToast(response?.data?.obj?.message || response?.data?.message, 'success');
                setBookings((prev) => prev.filter((booking) => booking.id !== payload));
            }
        } catch (error) {
            console.log(error);
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

    const handleAddClicked = () => {
        setShowPanel('add');
        setSelectedBooking(null);
    };

    const handleRowClicked = useCallback(async (e) => {
        const { id } = e;
        try {
            const url = 'http://localhost:5058/booking';
            const headers = { headers: { 'Content-Type': 'application/json' } };
            const response = await axios.get(`${url}/${id}`, headers);
            console.log(response);
            if (response?.status === 200) {
                setShowPanel('see');
                setSelectedBooking(response?.data?.obj);
            }
        } catch (error) {
            console.error('Error fetching user details:', error);
        }
    }, []);

    const handleSelectedRowsChanged = ({ allSelected, selectedCount, selectedRows }) => {
        setDeleteAll({ count: selectedCount, payload: selectedRows });
        setClearSelectedRows(false);
    };

    const handleDeleteRowsSelected = () => {
        deleteAll.count !== 0 && setShowDeleteAllConfirm(true);
    };

    const handleBookingAdded = (newRoom) => {
        newRoom.statusName = newRoom.status === 1 ? 'Empty' : newRoom.status === 2 ? 'Booked' : 'Staying';
        newRoom.formattedPrice = formatCurrency(newRoom.price);
        setBookings((prevRoom) => [...prevRoom, newRoom]);
        setSearchedBookings((prevRoom) => [...prevRoom, newRoom]);
    };

    const reset = () => {
        setDeleteAll({ count: 0, payload: [], yes: false });
        setShowDeleteAllConfirm(false);
        setShowDeleteConfirm(false);
        setClearSelectedRows(true);
        setDeleteOne({ payload: null });
        setSearchInput('');
    };

    const columns = [
        {
            name: 'No',
            selector: (row) => row.no,
        },
        {
            name: 'Customer',
            selector: (row) => row.customer,
            sortable: true,
        },
        {
            name: 'Phone Number',
            selector: (row) => row.phoneNumber,
            sortable: true,
        },
        {
            name: 'Check In',
            selector: (row) => row.checkIn,
            sortable: true,
        },
        {
            name: 'Check Out',
            selector: (row) => row.checkOut,
            sortable: true,
        },
    ];

    if (hasPermissionUpdate) {
        columns.push({
            name: 'Status',
            selector: (row) => row.statusName,
            sortable: true,
        });
    }

    if (hasPermissionDelete) {
        columns.push({
            name: 'Actions',
            selector: (row) => row.actions,
        });
    }

    const data = searchedBookings?.map((booking, index) => ({
        id: booking?.id,
        no: index + 1,
        customer: booking?.customer?.name,
        phoneNumber: booking?.customer?.phoneNumber,
        checkIn: booking?.checkIn,
        checkOut: booking?.checkOut,
        statusName:
            hasPermissionUpdate && booking?.status !== 0 ? (
                <p
                    className="p-1 px-2 rounded-pill text-white"
                    style={{ backgroundColor: '#80CBC4', fontSize: '10px' }}
                >
                    Confirmed
                </p>
            ) : (
                <p
                    className="p-1 px-2 rounded-pill"
                    style={{ backgroundColor: '#ffd5e1', color: '#b74c4c', fontSize: '10px' }}
                >
                    Cancel
                </p>
            ),
        actions: hasPermissionDelete ? (
            <BsTrash
                size={18}
                className="cursor-pointer"
                onClick={() => handleTrashClicked(booking?.id)}
                style={{ color: '#E57373' }}
            />
        ) : (
            <></>
        ),
    }));

    return (
        <div>
            {/* Show a toast */}
            {ToastContainer}
            <div className="d-flex align-items-center justify-content-between w-full py-4">
                {deleteAll.count === 0 ? (
                    hasPermissionCreate ? (
                        <FiPlus
                            size={30}
                            className="p-1 rounded-2 text-white secondary-bg-color cursor-pointer"
                            onClick={handleAddClicked}
                        />
                    ) : (
                        <></>
                    )
                ) : hasPermissionDelete ? (
                    <BsTrash
                        size={30}
                        className="p-1 rounded-2 text-white secondary-bg-color cursor-pointer"
                        onClick={handleDeleteRowsSelected}
                    />
                ) : (
                    <></>
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
            <>
                <DataTable
                    columns={columns}
                    data={data}
                    selectableRows
                    striped
                    highlightOnHover
                    pagination
                    sortIcon={<FaSortAlphaDownAlt />}
                    onRowClicked={handleRowClicked}
                    onSelectedRowsChange={handleSelectedRowsChanged}
                    progressPending={pending}
                    clearSelectedRows={clearSelectedRows}
                    progressComponent={
                        <RotatingLines
                            visible={true}
                            height="50"
                            width="50"
                            strokeColor="#e8bf96"
                            strokeWidth="5"
                            animationDuration="0.75"
                            ariaLabel="rotating-lines-loading"
                            wrapperStyle={{}}
                            wrapperClass=""
                        />
                    }
                />

                {/* Show Form */}
                {showPanel && (
                    <BookingForm
                        data={selectedBookings}
                        type={showPanel}
                        isShowed={showPanel}
                        onClose={() => setShowPanel(false)}
                        onRoomAdded={handleBookingAdded}
                    />
                )}

                {/* Show confirmation when clicking on delete all bookings */}
                {showDeleteAllConfirm && (
                    <ConfirmPopup
                        header="Are you sure you want to delete all the selected bookings?"
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
            </>
        </div>
    );
};

export default Booking;
