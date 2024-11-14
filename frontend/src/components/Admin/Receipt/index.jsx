import React, { useCallback, useEffect, useState } from 'react';
import axios from 'axios';

import DataTable from 'react-data-table-component';

import { FiEdit } from 'react-icons/fi';
import { BsTrash } from 'react-icons/bs';
import { FaSortAlphaDownAlt } from 'react-icons/fa';
import { IoSearchOutline } from 'react-icons/io5';
import { FiPlus } from 'react-icons/fi';

import ToastContainer, { showToast } from '~/utils/showToast';
import FormGroup from '~/components/FormGroup';
import ConfirmPopup from '~/components/ConfirmPopup';
import ReceiptForm from './ReceiptForm';
import Button from 'react-bootstrap/Button';
import { useCheckPermission } from '~/providers/CheckPermissionProvider';
import { RotatingLines } from 'react-loader-spinner';

const Receipt = () => {
    const [showPanel, setShowPanel] = useState('');
    const [selectedReceipt, setSelectedReceipt] = useState(null);
    const [receipt, setReceipts] = useState([]);
    const [clearSelectedRows, setClearSelectedRows] = useState(false);
    const [deleteAll, setDeleteAll] = useState({ count: 0, payload: [], yes: false });
    const [showDeleteAllConfirm, setShowDeleteAllConfirm] = useState(false);
    const [deleteOne, setDeleteOne] = useState({ payload: null });
    const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
    const [pendingDelete, setPendingDelete] = useState(false);

    const [searchInput, setSearchInput] = useState('');
    const [searchedReceipts, setSearchedReceipts] = useState([]);
    const {
        createReceipt: hasPermissionCreate,
        updateReceipt: hasPermissionUpdate,
        deleteReceipt: hasPermissionDelete,
    } = useCheckPermission();
    const columns = [
        {
            name: 'No',
            selector: (row) => row.no,
        },
        {
            name: 'Name Staff',
            selector: (row) => row.staffId,
        },
        {
            name: 'ID Booking',
            selector: (row) => row.bookingId,
        },
        {
            name: 'Name Customer ',
            selector: (row) => row.customerId,
        },
        {
            name: 'Name Room',
            selector: (row) => row.roomId,
        },
        {
            name: 'Name Discount',
            selector: (row) => row.discountId,
        },
        {
            name: 'Total',
            selector: (row) => row.total,
        },
    ];
    if (hasPermissionUpdate || hasPermissionDelete) {
        columns.push({
            name: 'Actions',
            selector: (row) => row.actions,
        });
    }
    const data = searchedReceipts?.map((receipt, index) => ({
        id: receipt?.id,
        no: index + 1,
        staffId: receipt?.staffId,
        customerId: receipt?.customerId,
        bookingId: receipt?.bookingId,
        roomId: receipt?.roomId,
        discountId: receipt?.discountId,
        total: receipt?.total,
        creatAt: receipt?.creatAt,

        actions: (
            <>
                {hasPermissionUpdate ? (
                    <FiEdit
                        size={18}
                        className="cursor-pointer me-3"
                        onClick={() => handleEditClicked(receipt)}
                        style={{ color: '#80CBC4' }}
                    />
                ) : (
                    ''
                )}
                {hasPermissionDelete ? (
                    <BsTrash
                        size={18}
                        className="cursor-pointer"
                        onClick={() => handleTrashClicked(receipt.id)}
                        style={{ color: '#E57373' }}
                    />
                ) : (
                    ''
                )}
            </>
        ),
    }));
   

    const handleEditClicked = (discount) => {
        setSelectedReceipt(discount);
        setShowPanel('edit');
    };

    const handleAddClicked = () => {
        setShowPanel('add');
        setSelectedReceipt(null);
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
                setSelectedReceipt(response.data);
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
       
        setReceipts((prevDiscounts) => [...prevDiscounts, newDiscount]);
        setSearchedReceipts((prevDiscounts) => [...prevDiscounts, newDiscount]);
    };
    
    const handleDiscountUpdated = (currentDiscount) => {
       
        setReceipts((prevDiscounts) =>
            prevDiscounts.map((prevDiscount) =>
                prevDiscount.id === currentDiscount.id ? { ...currentDiscount } : prevDiscount,
            ),
        );
        setSearchedReceipts((prevDiscounts) =>
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
            setSearchedReceipts(receipt);
        } else {
            const filteredDiscount = receipt.filter(
                (discount) =>
                    discount.name.toLowerCase().includes(searchInput.toLowerCase())||
                discount.value.toString().toLowerCase().includes(searchInput.toLowerCase()),
            );
            setSearchedReceipts(filteredDiscount);
        }
    }, [searchInput, receipt]);
    //Search Discount
    //List Discount
    useEffect(() => {
        const ListReceipts = async () => {
            try {
                const response = await axios.get('http://localhost:5058/receipt');
                setReceipts(response?.data?.$values);
            } catch (error) {
                console.error(error);
            }
        };
        ListReceipts();
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
                setReceipts((prev) => prev.filter((discount) => discount.id !== payload));
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
                    setReceipts(response?.data?.newDiscounts?.$values);
                    setSearchedReceipts(response?.data?.newDiscounts?.$values);
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
                <ReceiptForm
                    data={selectedReceipt}
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

export default Receipt;
