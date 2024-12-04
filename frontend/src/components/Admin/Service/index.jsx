import React, { useCallback, useEffect, useState } from 'react';
import axios from 'axios';

import DataTable from 'react-data-table-component';

import { FiEdit } from 'react-icons/fi';
import { BsTrash } from 'react-icons/bs';
import { FaSortAlphaDownAlt } from 'react-icons/fa';
import { IoSearchOutline } from 'react-icons/io5';
import { FiPlus } from 'react-icons/fi';

import PopupPanel from './ServiceForm';
import ToastContainer, { showToast } from '~/utils/showToast';
import FormGroup from '~/components/FormGroup';
import ConfirmPopup from '~/components/ConfirmPopup';
import { useUser } from '~/providers/UserProvider';
import { useCheckPermission } from '../../../providers/CheckPermissionProvider';
import formatCurrency from '~/utils/currencyPipe';
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
        name: 'Price',
        selector: (row) => row.price,
    },
    {
        name: 'Status',
        selector: (row) => (row.status === 1 ? 'Active' : 'InActice'),
    },
    {
        name: 'Actions',
        selector: (row) => row.actions,
    },
];

const Service = () => {
    const { createService, updateService, deleteService } = useCheckPermission();

    const [showPanel, setShowPanel] = useState('');
    const [selectedService, setSelectedService] = useState(null);
    const [services, setServices] = useState([]);
    const [deleteAll, setDeleteAll] = useState({ count: 0, payload: [], yes: false });
    const [showDeleteAllConfirm, setShowDeleteAllConfirm] = useState(false);
    const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

    const [searchInput, setSearchInput] = useState('');
    const [searchedServices, setSearchedServices] = useState([]);
    const [deleteOne, setDeleteOne] = useState();

    const { user } = useUser();

    // For deleting
    useEffect(() => {
        const deleteAllServices = async () => {
            try {
                // Create payload for deletion
                const payload = deleteAll.payload.map((serviceDelete) => ({ id: serviceDelete.id }));

                const response = await axios.delete('http://localhost:5058/service', { data: payload });
                console.log(response);
                if (response?.status === 200) {
                    showToast(response?.data?.message, 'success');
                    reset();
                    setServices(response?.data?.newServices?.$values);
                    setSearchedServices(response?.data?.newServices?.$values);
                }
            } catch (error) {
                console.log(error);
                showToast('One of the services is in use and cannot be deleted!', 'error');
            }
        };

        if (deleteAll.yes) deleteAllServices();
    }, [deleteAll.yes, deleteAll.payload, user.id]); // Include user.id in dependencies

    // For searching
    useEffect(() => {
        if (searchInput.trim() === '') {
            // If search input is empty, show all Services
            setSearchedServices(services);
        } else {
            // Otherwise, filter Services based on search input
            const filteredServices = services.filter((service) =>
                service.name.toLowerCase().includes(searchInput.toLowerCase()),
            );
            setSearchedServices(filteredServices);
        }
    }, [searchInput, services]);

    // For fetching
    useEffect(() => {
        const fetchServices = async () => {
            try {
                const response = await axios.get('http://localhost:5058/service', {
                    headers: {
                        'Content-Type': 'application/json',
                    },
                });

                if (response.status === 200) {
                    setServices(response.data.$values || []);
                    setSearchedServices(response.data.$values || []);
                }
            } catch (error) {
                console.log('Error fetching Services:', error);
            }
        };

        fetchServices();
    }, []);
    const handleTrashClicked = (id) => {
        setDeleteOne(id);
        setShowDeleteConfirm(true);
    };

    const deleteService_del = async (id) => {
        try {
            const response = await axios.delete(`http://localhost:5058/service/${id}`);
            if (response.status === 200) {
                showToast(response?.data?.message, 'success');
                setServices((prev) => prev.filter((service) => service.id !== id));
            }
        } catch (error) {
            console.error('Error deleting service:', error);
            showToast(error?.response?.data?.message || 'This service is in use and cannot be deleted!', 'error');
        } finally {
            reset();
        }
    };
    const handleEditClicked = (service) => {
        setSelectedService(service);
        setShowPanel('edit');
    };

    const handleAddClicked = async () => {
        setShowPanel('add');
    };

    const handleRowClicked = useCallback(async (e) => {
        const { id } = e;
        try {
            const response = await axios.get(`http://localhost:5058/service/${id}`, {
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            if (response.status === 200) {
                setSelectedService(response.data);

                setShowPanel('see');
            }
        } catch (error) {
            console.error('Error fetching Service details:', error);
        }
    }, []);

    const handleSelectedRowsChanged = ({ allSelected, selectedCount, selectedRows }) => {
        setDeleteAll({ count: selectedCount, payload: selectedRows });
    };

    const handleDeleteRowsSelected = () => {
        if (deleteAll.count !== 0) {
            setShowDeleteAllConfirm(true);
        }
    };

    const reset = () => {
        setDeleteAll({ count: 0, payload: [], yes: false });
        setShowDeleteAllConfirm(false);
        setShowDeleteConfirm(false);
        setDeleteOne();
        setSearchInput('');
    };

    const handleServiceAdded = (newService) => {
        setServices((prevServices) => [...prevServices, newService]);
        setSearchedServices((prevServices) => [...prevServices, newService]);
    };

    const handleServiceUpdated = (currentService) => {
        setServices((prevServices) =>
            prevServices.map((prevService) =>
                prevService.id === currentService.id ? { ...currentService } : prevService,
            ),
        );
        setSearchedServices((prevServices) =>
            prevServices.map((prevService) =>
                prevService.id === currentService.id ? { ...currentService } : prevService,
            ),
        );
    };

    const data = searchedServices?.map((service, index) => ({
        id: service.id,
        no: index + 1,
        name: service.name,
        price: formatCurrency(service.price),
        status: service.status,
        actions: (
            <>
                {updateService === 1 ? (
                    <FiEdit size={18} className="cursor-pointer me-3" onClick={() => handleEditClicked(service)} />
                ) : (
                    <></>
                )}
                {deleteService === 1 ? (
                    <BsTrash size={18} className="cursor-pointer" onClick={() => handleTrashClicked(service.id)} />
                ) : (
                    <></>
                )}
            </>
        ),
    }));

    return (
        <div>
            <div className="d-flex align-items-center justify-content-between w-full py-4">
                {deleteAll.count === 0 ? (
                    createService === 1 ? (
                        <FiPlus
                            size={30}
                            className="p-1 rounded-2 text-white secondary-bg-color cursor-pointer"
                            onClick={handleAddClicked}
                        />
                    ) : (
                        <></>
                    )
                ) : deleteService === 1 ? (
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
                    pointerOnHover
                    sortIcon={<FaSortAlphaDownAlt />}
                    onRowClicked={handleRowClicked}
                    onSelectedRowsChange={handleSelectedRowsChanged}
                />
                <>
                    {ToastContainer}
                    <PopupPanel
                        data={selectedService}
                        type={showPanel}
                        onClose={() => setShowPanel('')}
                        isShowed={showPanel}
                        onServiceAdded={handleServiceAdded}
                        onServiceUpdated={handleServiceUpdated}
                    />
                    <ConfirmPopup
                        header="Are you sure you want to delete all the selected reviews?"
                        message="This action cannot be undone."
                        negativeChoice="Cancel"
                        positiveChoice="Delete"
                        isShow={showDeleteAllConfirm}
                        onYes={() => setDeleteAll((prev) => ({ ...prev, yes: true }))}
                        onClose={() => setShowDeleteAllConfirm(false)}
                    />
                    <ConfirmPopup
                        header="Are you sure you want to delete the selected Service?"
                        message="This action cannot be undone."
                        negativeChoice="Cancel"
                        positiveChoice="Delete"
                        isShow={showDeleteConfirm}
                        onYes={() => deleteService_del(deleteOne)}
                        onClose={reset}
                    />
                </>
            </>
        </div>
    );
};

export default Service;
