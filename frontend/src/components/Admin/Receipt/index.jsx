import React, { useCallback, useEffect, useState } from 'react';
import axios from 'axios';
import DataTable from 'react-data-table-component';
import { BsTrash } from 'react-icons/bs';
import { IoSearchOutline } from 'react-icons/io5';
import ToastContainer, { showToast } from '~/utils/showToast';
import FormGroup from '~/components/FormGroup';
import ConfirmPopup from '~/components/ConfirmPopup';
import ReceiptForm from './ReceiptForm';
import { useCheckPermission } from '~/providers/CheckPermissionProvider';
import { RotatingLines } from 'react-loader-spinner';
import formatCurrency from '~/utils/currencyPipe';

const Receipt = () => {
    const [showPanel, setShowPanel] = useState('');
    const [selectedReceipt, setSelectedReceipt] = useState(null);
    const [receipts, setReceipts] = useState([]);
    const [clearSelectedRows, setClearSelectedRows] = useState(false);
    const [deleteAll, setDeleteAll] = useState({ count: 0, payload: [], yes: false });
    const [showDeleteAllConfirm, setShowDeleteAllConfirm] = useState(false);
    const [deleteOne, setDeleteOne] = useState({ payload: null });
    const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
    const [pendingDelete, setPendingDelete] = useState(false);
    const [searchInput, setSearchInput] = useState('');
    const [searchedReceipts, setSearchedReceipts] = useState([]);
    const { deleteReceipt: hasPermissionDelete } = useCheckPermission();

    // For searching
    useEffect(() => {
        if (searchInput.trim() === '') {
            setSearchedReceipts(receipts);
        } else {
            const filteredReceipt = receipts.filter(
                (receipt) =>
                    receipt?.booking?.customer?.name.toLowerCase().includes(searchInput.toLowerCase()) ||
                    receipt?.booking?.customer?.phoneNumber
                        .toString()
                        .toLowerCase()
                        .includes(searchInput.toLowerCase()),
            );
            setSearchedReceipts(filteredReceipt);
        }
    }, [searchInput, receipts]);

    // For fetching
    useEffect(() => {
        const fetchReceipts = async () => {
            try {
                const url = 'http://localhost:5058/receipt';
                const response = await axios.get(url);
                console.log('Receipt response: ', response);
                setReceipts(response?.data?.$values);
            } catch (error) {
                console.error(error);
                showToast("There's something wrong while fetching receipts", 'error');
            }
        };
        fetchReceipts();
    }, []);

    // For deleting multiple receipts
    useEffect(() => {
        const deleteAllReceipts = async () => {
            try {
                setPendingDelete(true);
                // Create payload for deletion
                const payload = deleteAll.payload.map((receiptDelete) => ({ id: receiptDelete.id }));
                console.log('Delete payload', payload);
                const url = 'http://localhost:5058/receipt';
                const response = await axios.delete(url, { data: payload });
                console.log('Delete response', response);
                if (response?.status === 200) {
                    showToast('Receipts deleted successfully', 'success');
                    setReceipts(response?.data?.newReceipts?.$values);
                    setSearchedReceipts(response?.data?.newReceipts?.$values);
                    reset();
                }
            } catch (error) {
                showToast(error?.response?.data?.message || 'Error deleting Discount', 'error');
            } finally {
                setPendingDelete(false);
            }
        };

        if (deleteAll.yes) {
            deleteAllReceipts();
        }
    }, [deleteAll.yes, deleteAll.payload]);

    const columns = [
        {
            name: 'No',
            selector: (row) => row.no,
        },
        {
            name: 'Booking ID',
            selector: (row) => row.booking,
        },
        {
            name: 'Customer',
            selector: (row) => row.customer,
        },
        {
            name: 'Phone',
            selector: (row) => row.phone,
        },
        {
            name: 'Total',
            selector: (row) => row.total,
        },
        {
            name: 'Created At',
            selector: (row) => row.createdAt,
        },
    ];

    if (hasPermissionDelete) {
        columns.push({
            name: 'Actions',
            selector: (row) => row.actions,
        });
    }

    const data = searchedReceipts?.map((receipt, index) => ({
        id: receipt?.id,
        no: index + 1,
        booking: receipt?.bookingId,
        customer: receipt?.booking?.customer?.name || receipt?.booking?.customerName,
        phone: receipt?.booking?.customer?.phoneNumber || receipt?.booking?.customerPhoneNumber,
        total: formatCurrency(receipt?.total),
        createdAt: receipt?.createdAt,
        actions: hasPermissionDelete ? (
            <BsTrash size={18} className="cursor-pointer" onClick={() => handleTrashClicked(receipt?.id)} />
        ) : (
            <></>
        ),
    }));

    const handleRowClicked = useCallback(async (e) => {
        const { id } = e;

        try {
            const response = await axios.get(`http://localhost:5058/receipt/${id}`, {
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

    const reset = () => {
        setDeleteAll({ count: 0, payload: [], yes: false });
        setShowDeleteAllConfirm(false);
        setDeleteOne({ payload: null });
        setShowDeleteConfirm(false);
    };

    //Delete receipt
    const handleTrashClicked = (id) => {
        setDeleteOne({ payload: id });
        setShowDeleteConfirm(true);
    };

    const handleDeleteConfirm = () => {
        if (!deleteOne || !deleteOne.payload) {
            console.error('Invalid deleteOne payload:', deleteOne);
            return;
        }
        deleteReceipt(deleteOne.payload);
    };

    const deleteReceipt = async (payload) => {
        try {
            const response = await axios.delete(`http://localhost:5058/receipt/${payload}`);
            if (response.status === 200) {
                showToast('Receipt deleted successfully', 'success');
                setReceipts((prev) => prev.filter((receipt) => receipt.id !== payload));
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

    const handleSelectedRowsChanged = ({ allSelected, selectedCount, selectedRows }) => {
        setDeleteAll({ count: selectedCount, payload: selectedRows });
        setClearSelectedRows(false);
    };

    return (
        <div>
            <div className="d-flex align-items-center justify-content-between w-full py-4">
                {deleteAll.count !== 0 && (
                    <BsTrash
                        size={30}
                        className="p-1 rounded-2 text-white secondary-bg-color cursor-pointer"
                        onClick={handleDeleteRowsSelected}
                    />
                )}

                {/* Search Form */}
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

            {/* Datatable */}
            <DataTable
                columns={columns}
                data={data}
                selectableRows
                highlightOnHover
                pointerOnHover
                striped
                onRowClicked={handleRowClicked}
                onSelectedRowsChange={handleSelectedRowsChanged}
                clearSelectedRows={clearSelectedRows}
                pagination
            />

            {/* Show a toast */}
            {ToastContainer}

            {/* Receipt Form */}
            <ReceiptForm data={selectedReceipt} isShowed={showPanel} onClose={() => setShowPanel(false)} />

            {/* Show confirmation when clicking on delete receipts */}
            <ConfirmPopup
                header="Are you sure you want to delete all the selected Receipts?"
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

            {/* Show confirmation when clicking on delete a receipt*/}
            <ConfirmPopup
                header="Are you sure you want to delete the selected Receipt?"
                message="This action cannot be undone."
                negativeChoice="Cancel"
                positiveChoice="Delete"
                isShow={showDeleteConfirm}
                onYes={handleDeleteConfirm}
                onClose={reset}
            />
        </div>
    );
};

export default Receipt;
