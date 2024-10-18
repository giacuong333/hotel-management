import React, { useCallback, useEffect, useState } from 'react';
import axios from 'axios';

import DataTable from 'react-data-table-component';

import { FiEdit } from 'react-icons/fi';
import { BsTrash } from 'react-icons/bs';
import { FaSortAlphaDownAlt } from 'react-icons/fa';
import { IoSearchOutline } from 'react-icons/io5';
import { FiPlus } from 'react-icons/fi';

import RoomForm from './RoomForm';
import ToastContainer, { showToast } from '~/utils/showToast';
import FormGroup from '~/components/FormGroup';
import ConfirmPopup from '~/components/ConfirmPopup';
import formatCurrency from '~/utils/currencyPipe';
import { Button } from 'react-bootstrap';
import ImageForm from './ImageForm';
import { RotatingLines } from 'react-loader-spinner';

const columns = [
    {
        name: 'No',
        selector: (row) => row.no,
    },
    {
        name: 'Name',
        selector: (row) => row.name,
        sortable: true,
    },
    {
        name: 'Type',
        selector: (row) => row.type,
    },
    {
        name: 'Bed',
        selector: (row) => row.bedNum,
        sortable: true,
    },
    {
        name: 'Status',
        selector: (row) => row.status,
        sortable: true,
    },
    {
        name: 'Price',
        selector: (row) => row.price,
        sortable: true,
    },
    {
        name: 'Area',
        selector: (row) => row.area,
        sortable: true,
    },
    {
        name: 'Images',
        selector: (row) => row.images,
    },
    {
        name: 'Actions',
        selector: (row) => row.actions,
    },
];

const Room = () => {
    const [pending, setPending] = useState(true);
    const [showPanel, setShowPanel] = useState('');
    const [selectedRoom, setSelectedRoom] = useState(null);
    const [rooms, setRooms] = useState([]);

    const [deleteAll, setDeleteAll] = useState({ count: 0, payload: [], yes: false });
    const [showDeleteAllConfirm, setShowDeleteAllConfirm] = useState(false);
    const [deleteOne, setDeleteOne] = useState({ payload: null });
    const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

    const [searchInput, setSearchInput] = useState('');
    const [searchedRooms, setSearchedRooms] = useState([]);

    const [showImage, setShowImage] = useState(null);

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
                    setRooms(data);
                    setSearchedRooms(data);
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
        if (searchInput.trim() === '') {
            // If search input is empty, show all rooms
            setSearchedRooms(rooms);
        } else {
            // Otherwise, filter rooms based on search input
            const filteredRooms = rooms.filter(
                (room) =>
                    String(room.name).toLowerCase().includes(String(searchInput).toLowerCase()) ||
                    String(room.type).toLowerCase().includes(String(searchInput).toLowerCase()) ||
                    String(room.statusName).toLowerCase().includes(String(searchInput).toLowerCase()) ||
                    (room.price <= Number(searchInput) + 300 && room.price >= Number(searchInput) + 300) ||
                    room.price === Number(searchInput),
            );
            setSearchedRooms(filteredRooms);
        }
    }, [searchInput, rooms]);

    // For fetching
    useEffect(() => {
        const fetchRooms = async () => {
            try {
                const url = 'http://localhost:5058/room';
                const headers = { headers: { 'Content-Type': 'application/json' } };
                const response = await axios.get(url, headers);
                if (response?.status === 200) {
                    const data = response?.data?.obj?.map((room) => {
                        room.statusName = room.status === 1 ? 'Empty' : room.status === 2 ? 'Booked' : 'Staying';
                        room.formattedPrice = formatCurrency(room.price);
                        return room;
                    });
                    setRooms(data || []);
                    setSearchedRooms(data || []);
                }
            } catch (error) {
                console.log('Error fetching rooms:', error);
            } finally {
                setPending(false);
            }
        };

        const timeout = setTimeout(fetchRooms, 2000);

        return () => clearTimeout(timeout);
    }, []);

    const handleTrashClicked = (id) => {
        setDeleteOne({ payload: id });
        setShowDeleteConfirm(true);
    };

    // Delete a room
    const deleteRoom = async (payload) => {
        try {
            const response = await axios.delete(`http://localhost:5058/room/${payload}`, {
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            if (response?.status === 200) {
                showToast(response?.data?.obj?.message, 'success');
                setRooms((prev) => prev.filter((room) => room.id !== payload));
                setSearchInput('');
            }
        } catch (error) {
            if (error?.response?.status === 403) {
                showToast(error?.response?.data?.obj?.message, 'error');
            } else if (error?.response?.status === 401) {
                showToast('You need to log in', 'error');
            } else if (error?.response?.status === 409) {
                showToast(error?.response?.data?.message, 'error');
            } else {
                showToast(error?.response?.data?.obj?.message || 'Error deleting room', 'error');
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
        setRooms((prevRoom) => [...prevRoom, newRoom]);
        setSearchedRooms((prevRoom) => [...prevRoom, newRoom]);
    };

    const handleRoomUpdated = (updatedRoom) => {
        updatedRoom.statusName = updatedRoom.status === 1 ? 'Empty' : updatedRoom.status === 2 ? 'Booked' : 'Staying';
        updatedRoom.formattedPrice = formatCurrency(updatedRoom.price);
        setRooms((prevRooms) =>
            prevRooms.map((prevRoom) => (prevRoom.id === updatedRoom.id ? { ...updatedRoom } : prevRoom)),
        );
        setSearchedRooms((prevRooms) =>
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

    const handleImageActions = (roomId) => {
        setShowImage(roomId);
    };

    const data = searchedRooms?.map((room, index) => ({
        id: room?.id,
        no: index + 1,
        name: room?.name,
        type: room?.type,
        bedNum: room?.bedNum,
        status:
            room?.status === 1 ? (
                <p
                    className="p-1 px-2 rounded-pill text-white"
                    style={{ backgroundColor: '#80CBC4', fontSize: '10px' }}
                >
                    {room?.statusName}
                </p>
            ) : (
                <p
                    className="p-1 px-2 rounded-pill"
                    style={{ backgroundColor: '#ffd5e1', color: '#b74c4c', fontSize: '10px' }}
                >
                    {room?.statusName}
                </p>
            ),
        price: room?.formattedPrice,
        area: `${room?.area}m2`,
        images: (
            <Button
                type="button"
                variant="primary"
                className={`w-full p-1 customer-primary-button bg-hover-white text-hover-black`}
                onClick={() => handleImageActions(room?.id)}
            >
                Images
            </Button>
        ),
        actions: (
            <>
                <FiEdit
                    size={18}
                    className="cursor-pointer me-3"
                    onClick={() => handleEditClicked(room)}
                    style={{ color: '#80CBC4' }}
                />
                <BsTrash
                    size={18}
                    className="cursor-pointer"
                    onClick={() => handleTrashClicked(room.id)}
                    style={{ color: '#E57373' }}
                />
            </>
        ),
    }));

    return (
        <div>
            {/* Show gallery */}
            {showImage && <ImageForm onClose={() => setShowImage(null)} isShow={showImage} />}
            {/* Show a toast */}
            {ToastContainer}
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
                    <RoomForm
                        data={selectedRoom}
                        type={showPanel}
                        isShowed={showPanel}
                        onClose={() => setShowPanel(false)}
                        onRoomAdded={handleRoomAdded}
                        onRoomUpdated={handleRoomUpdated}
                    />
                )}

                {/* Show confirmation when clicking on delete all rooms */}
                {showDeleteAllConfirm && (
                    <ConfirmPopup
                        header="Are you sure you want to delete all the selected rooms?"
                        message="This action cannot be undone."
                        negativeChoice="Cancel"
                        positiveChoice="Delete"
                        isShow={showDeleteAllConfirm}
                        onYes={() => setDeleteAll((prev) => ({ ...prev, yes: true }))}
                        onClose={() => setShowDeleteAllConfirm(false)}
                    />
                )}

                {/* Show confirmation when clicking on delete a user*/}
                {showDeleteConfirm && (
                    <ConfirmPopup
                        header="Are you sure you want to delete the selected user?"
                        message="This action cannot be undone."
                        negativeChoice="Cancel"
                        positiveChoice="Delete"
                        isShow={showDeleteConfirm}
                        onYes={() => deleteRoom(deleteOne.payload)}
                        onClose={reset}
                    />
                )}
            </>
        </div>
    );
};

export default Room;
