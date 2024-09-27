import Table from 'react-bootstrap/Table';
import 'bootstrap/dist/css/bootstrap.min.css';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import React, { useState, useEffect, Fragment } from 'react';
import axios from 'axios';

import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import DataTable from 'react-data-table-component';

import { FaEye } from 'react-icons/fa';
import { MdDelete } from 'react-icons/md';
import { FaRegEdit } from 'react-icons/fa';
import { IoIosAdd } from 'react-icons/io';
const Service = () => {
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const [showCreate, setShowCreate] = useState(false);

    const handleCloseCreate = () => setShowCreate(false);
    const handleShowCreate = () => setShowCreate(true);

    const handeleDelete = (id) => {
        if (window.confirm('Are you sure to delete ')) {
            alert('delete');
        }
    };

    const columns = [
        {
            name: '#',
            selector: (row, index) => index + 1,
        },
        {
            name: 'Id',
            selector: (row) => row.id,
            sortable: true,
        },
        {
            name: 'Name',
            selector: (row) => row.name,
            sortable: true,
        },
        {
            name: 'Price',
            selector: (row) => row.price,
            sortable: true,
        },
        {
            name: 'Status',
            selector: (row) => (
                <div className="flex-center">
                    <button className={`btn ${row.status === 1 ? 'btn-primary' : 'btn-danger'}`} disabled>
                        {row.status === 1 ? 'Active' : 'InActive'}
                    </button>
                </div>
            ),
            sortable: true,
        },

        {
            name: 'Action',
            cell: (row) => (
                <div>
                    <button className="btn btn-primary" disabled={row.status === 0} onClick={handleShow}>
                        <FaRegEdit />
                    </button>
                    &nbsp;
                    <button className="btn btn-danger" onClick={() => handeleDelete()}>
                        <MdDelete />
                    </button>
                </div>
            ),
        },
    ];

    const empdata = [
        {
            id: 1,
            name: 'Food',
            price: 23,
            status: 1,
        },
        {
            id: 2,
            name: 'Pool',
            price: 23,
            status: 1,
        },
        {
            id: 3,
            name: 'Clean',
            price: 23,
            status: 1,
        },
    ];

    const [data, setData] = useState([]);
    useEffect(() => {
        // getData();
        setData(empdata);
    }, []);

    function handleFilter(event) {
        const newdata = empdata.filter((row) => {
            return row.name.toLowerCase().includes(event.target.value.toLowerCase());
        });
        setData(newdata);
    }
    return (
        <Fragment>
            <ToastContainer />
            <div>
                <nav class="navbar navbar-light bg-light justify-content-between">
                    <p class="navbar-brand"></p>
                    <form class="form-inline mr-2">
                        <button
                            className="btn btn-primary btn-lg"
                            onClick={(e) => {
                                e.preventDefault();
                                handleShowCreate();
                            }}
                        >
                            Create
                        </button>
                    </form>
                </nav>
            </div>
            {/* create */}
            <Modal show={showCreate} onHide={handleCloseCreate} animation={false}>
                <Modal.Header closeButton>
                    <Modal.Title> Create Service</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <form>
                        <div class="form-group">
                            <label for="nameserviceCreate">Name Service:</label>
                            <input type="text" value={'food'} class="form-control" id="nameserviceCreate" />
                        </div>
                        <div class="form-group">
                            <label for="priceCreate">Price:</label>
                            <input type="number" class="form-control" value={'2323'} id="priceCreate" />
                        </div>

                        <div class="form-group">
                            <label for="statusCreate">Status</label>
                            <select class="form-control" id="status">
                                <option>Active</option>
                                <option>InActive</option>
                            </select>
                        </div>
                    </form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleCloseCreate}>
                        Close
                    </Button>
                    <Button
                        variant="primary"
                        onClick={(e) => {
                            e.preventDefault();
                        }}
                    >
                        Save
                    </Button>
                </Modal.Footer>
            </Modal>

            {/* table */}
            <nav class="navbar navbar-light bg-light justify-content-between  p-3">
                <p class="navbar-brand">Service</p>
                <form class="form-inline mr-2">
                    <input
                        class="form-control "
                        type="search"
                        placeholder="Search"
                        aria-label="Search"
                        onChange={handleFilter}
                    />
                </form>
            </nav>

            <DataTable columns={columns} data={data} pagination highlightOnHover />

            {/* Modal */}

            <Modal show={show} onHide={handleClose} animation={false}>
                <Modal.Header closeButton>
                    <Modal.Title> Edit Service</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <form>
                        <div class="form-group">
                            <label for="nameservice">Name Service:</label>
                            <input type="text" value={'food'} class="form-control" id="nameservice" />
                        </div>
                        <div class="form-group">
                            <label for="price">Price:</label>
                            <input type="number" class="form-control" value={'2323'} id="price" />
                        </div>

                        <div class="form-group">
                            <label for="status">Status</label>
                            <select class="form-control" id="status">
                                <option>Active</option>
                                <option>InActive</option>
                            </select>
                        </div>
                    </form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="primary">Save </Button>
                </Modal.Footer>
            </Modal>
        </Fragment>
    );
};
export default Service;
