import React, { useCallback, useEffect, useState } from 'react';
import axios from 'axios';

import DataTable from 'react-data-table-component';

import { FiEdit } from 'react-icons/fi';
import { BsTrash } from 'react-icons/bs';
import { FaSortAlphaDownAlt } from 'react-icons/fa';
import { IoSearchOutline } from 'react-icons/io5';
import { FiPlus } from 'react-icons/fi';
import DiscountForm from './DiscountForm';
import ToastContainer, { showToast } from '~/utils/showToast';
import FormGroup from '~/components/FormGroup';
import ConfirmPopup from '~/components/ConfirmPopup';

import Button from 'react-bootstrap/Button';
import { useCheckPermission } from '~/providers/CheckPermissionProvider';
import { RotatingLines } from 'react-loader-spinner';

const Discount = () => {
    const [showPanel, setShowPanel] = useState('');
    const [selectedDiscount, setSelectedDiscount] = useState(null);
    const [discount, setDiscounts] = useState([]);
    const [clearSelectedRows, setClearSelectedRows] = useState(false);
    const [deleteAll, setDeleteAll] = useState({ count: 0, payload: [], yes: false });
    const [showDeleteAllConfirm, setShowDeleteAllConfirm] = useState(false);
    const [deleteOne, setDeleteOne] = useState({ payload: null });
    const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
    const [pendingDelete, setPendingDelete] = useState(false);

    const [searchInput, setSearchInput] = useState('');
    const [searchedDiscounts, setSearchedDiscounts] = useState([]);
    const {
        createDiscount: hasPermissionCreate,
        updateDiscount: hasPermissionUpdate,
        deleteDiscount: hasPermissionDelete,
    } = useCheckPermission();
    const columns = [
        {
            name: 'No',
            selector: (row) => row.no,
        },
        {
            name: 'Name Discount',
            selector: (row) => row.name,
        },
        {
            name: 'Value Discount',
            selector: (row) => row.value,
        },
        {
            name: 'Status',
            selector: (row) => row.status,
        },
        {
            name: 'Start At',
            selector: (row) => row.startAt,
        },
        {
            name: 'End At',
            selector: (row) => row.endAt,
        },
    ];
    if (hasPermissionUpdate || hasPermissionDelete) {
        columns.push({
            name: 'Actions',
            selector: (row) => row.actions,
        });
    }
    const data = searchedDiscounts?.map((discount, index) => ({
        id: discount?.id,
        no: index + 1,
        name: discount?.name,
        value: discount?.value + '%',
        status: discount?.status === true ? 'Active' : 'UnActive',
        startAt: discount?.startAt,
        endAt: discount?.endAt,
        actions: (
            <>
                {hasPermissionUpdate ? (
                    <FiEdit size={18} className="cursor-pointer me-3" onClick={() => handleEditClicked(discount)} />
                ) : (
                    ''
                )}
                {hasPermissionDelete ? (
                    <BsTrash size={18} className="cursor-pointer" onClick={() => handleTrashClicked(discount.id)} />
                ) : (
                    ''
                )}
            </>
        ),
    }));

    console.log('Discounts', searchedDiscounts);

    const handleEditClicked = (discount) => {
        setSelectedDiscount(discount);
        setShowPanel('edit');
    };

    const handleAddClicked = () => {
        setShowPanel('add');
        setSelectedDiscount(null);
    };

    const handleRowClicked = useCallback(async (e) => {
        const { id } = e;

        try {
            const response = await axios.get(`http://localhost:5058/discount/${id}`, {
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            if (response.status === 200) {
                setSelectedDiscount(response.data);
                setShowPanel('see');
            }
        } catch (error) {
            console.error('Error fetching Discount details:', error);
        }
    }, []);

    const handleDeleteRowsSelected = () => {
        deleteAll.count !== 0 && setShowDeleteAllConfirm(true);
    };

    const handleDiscountAdded = (newDiscount) => {
        setDiscounts((prevDiscounts) => [...prevDiscounts, newDiscount]);
        setSearchedDiscounts((prevDiscounts) => [...prevDiscounts, newDiscount]);
    };

    const handleDiscountUpdated = (currentDiscount) => {
        setDiscounts((prevDiscounts) =>
            prevDiscounts.map((prevDiscount) =>
                prevDiscount.id === currentDiscount.id ? { ...currentDiscount } : prevDiscount,
            ),
        );
        setSearchedDiscounts((prevDiscounts) =>
            prevDiscounts.map((prevDiscount) =>
                prevDiscount.id === currentDiscount.id ? { ...currentDiscount } : prevDiscount,
            ),
        );
    };

    const reset = () => {
        setDeleteAll({ count: 0, payload: [], yes: false });
        setShowDeleteAllConfirm(false);
        setDeleteOne({ payload: null });
        setShowDeleteConfirm(false);
    };
    //Search  Discount
    // For searching
    useEffect(() => {
        if (searchInput.trim() === '') {
            setSearchedDiscounts(discount);
        } else {
            const filteredDiscount = discount.filter(
                (discount) =>
                    discount.name.toLowerCase().includes(searchInput.toLowerCase()) ||
                    discount.value.toString().toLowerCase().includes(searchInput.toLowerCase()),
            );
            setSearchedDiscounts(filteredDiscount);
        }
    }, [searchInput, discount]);
    //Search Discount
    //List Discount
    useEffect(() => {
        const ListDiscounts = async () => {
            try {
                const response = await axios.get('http://localhost:5058/discount');
                setDiscounts(response?.data?.$values);
            } catch (error) {
                console.error(error);
            }
        };
        ListDiscounts();
    }, []);
    //List Discount
    //Delete Discount
    const handleTrashClicked = (id) => {
        setDeleteOne({ payload: id });
        setShowDeleteConfirm(true);
    };
    const handleDeleteConfirm = () => {
        if (!deleteOne || !deleteOne.payload) {
            console.error('Invalid deleteOne payload:', deleteOne);
            return;
        }
        deleteDiscount(deleteOne.payload);
    };
    const deleteDiscount = async (payload) => {
        try {
            const response = await axios.delete(`http://localhost:5058/discount/${payload}`);
            if (response.status === 200) {
                showToast(response?.data?.message, 'success');
                setDiscounts((prev) => prev.filter((discount) => discount.id !== payload));
                setSearchInput('');
            }
        } catch (error) {
            console.error('Error deleting Discount:', error);
            if (error?.response?.status === 403) {
                showToast(error?.response?.data?.message, 'error');
            } else if (error?.response?.status === 401) {
                showToast('You need to log in', 'error');
            } else {
                showToast(error?.response?.data?.message || 'Error deleting Discount', 'error');
            }
        } finally {
            reset();
        }
    };
    useEffect(() => {
        const deleteAllDiscount = async () => {
            try {
                setPendingDelete(true);
                // Create payload for deletion
                const payload = deleteAll.payload.map((discountDelete) => discountDelete.id);
                console.log('Delete payload', payload);
                const url = 'http://localhost:5058/discount';
                const response = await axios.delete(url, { data: payload });
                console.log('Delete response', response);
                if (response?.status === 200) {
                    showToast(response?.data?.message, 'success');
                    setDiscounts(response?.data?.newDiscounts?.$values);
                    setSearchedDiscounts(response?.data?.newDiscounts?.$values);
                    reset();
                }
            } catch (error) {
                showToast(error?.response?.data?.message || 'Error deleting Discount', 'error');
            } finally {
                setPendingDelete(false);
            }
        };

        if (deleteAll.yes) {
            deleteAllDiscount();
        }
    }, [deleteAll.yes, deleteAll.payload]);
    //Delete Discount
    const handleSelectedRowsChanged = ({ allSelected, selectedCount, selectedRows }) => {
        setDeleteAll({ count: selectedCount, payload: selectedRows });
        setClearSelectedRows(false);
    };
    return (
        <div>
            <div className="d-flex align-items-center justify-content-between w-full py-4">
                {deleteAll.count === 0 ? (
                    hasPermissionCreate ? (
                        <FiPlus
                            size={30}
                            className="p-1 rounded-2 text-white secondary-bg-color cursor-pointer"
                            onClick={handleAddClicked}
                        />
                    ) : (
                        ''
                    )
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
            <DataTable
                columns={columns}
                data={data}
                selectableRows
                onRowClicked={handleRowClicked}
                onSelectedRowsChange={handleSelectedRowsChanged}
                clearSelectedRows={clearSelectedRows}
                pagination
            />
            {/* Show a toast */}
            {ToastContainer}

            {/* Show Form */}
            {showPanel && (
                <DiscountForm
                    data={selectedDiscount}
                    type={showPanel}
                    isShowed={showPanel}
                    onClose={() => setShowPanel(false)}
                    onDiscountAdded={handleDiscountAdded}
                    onDiscountUpdated={handleDiscountUpdated}
                />
            )}
            {showDeleteAllConfirm && (
                <ConfirmPopup
                    header="Are you sure you want to delete all the selected Discounts?"
                    message="This action cannot be undone."
                    negativeChoice="Cancel"
                    positiveChoice={
                        pendingDelete ? (
                            <RotatingLines
                                visible={true}
                                height="22"
                                width="22"
                                strokeColor="#ffffff"
                                strokeWidth="5"
                                animationDuration="0.75"
                                ariaLabel="rotating-lines-loading"
                                wrapperStyle={{}}
                                wrapperClass=""
                            />
                        ) : (
                            'Delete'
                        )
                    }
                    isShow={showDeleteAllConfirm}
                    onYes={() => setDeleteAll((prev) => ({ ...prev, yes: true }))}
                    onClose={() => setShowDeleteAllConfirm(false)}
                />
            )}
            {/* Show confirmation when clicking on delete a user*/}
            {showDeleteConfirm && (
                <ConfirmPopup
                    header="Are you sure you want to delete the selected Discounts?"
                    message="This action cannot be undone."
                    negativeChoice="Cancel"
                    positiveChoice="Delete"
                    isShow={showDeleteConfirm}
                    onYes={handleDeleteConfirm}
                    onClose={reset}
                />
            )}
        </div>
    );
};

export default Discount;
