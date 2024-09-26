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

const Review = () => {
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

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
            name: 'UserId',
            selector: (row) => row.userId,
            sortable: true,
        },
        {
            name: 'RoomId',
            selector: (row) => row.roomId,
            sortable: true,
        },
        {
            name: 'Description',
            selector: (row) => row.description,
            sortable: true,
        },
        {
            name: 'Status',
            selector: (row) => (
                <div className="flex-center">
                    <button className={`btn ${row.status === 1 ? 'btn-primary' : 'btn-danger'}`} disabled>
                        {row.status === 1 ? 'Handle' : 'Pending'}
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
                        <FaEye />
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
            userId: 1,
            roomId: 23,
            description: 1,
            status: 1,
        },
        {
            id: 2,
            userId: 1,
            roomId: 1,
            description: 'sadasdasd',
            status: 1,
        },
        {
            id: 3,
            userId: 2,
            roomId: 2,
            description: 'sadasd',
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
            return row.userId.toString().includes(event.target.value);
        });
        setData(newdata);
    }
    return (
        <Fragment>
            <ToastContainer />

            {/* table */}
            <nav class="navbar navbar-light bg-light justify-content-between">
                <p class="navbar-brand">Review</p>
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
                    <Modal.Title> Detail Review</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <form>
                        <div class="form-group">
                            <label for="userid">UserId:</label>
                            <input type="text" class="form-control" value={'1'} id="userid" disabled />
                        </div>
                        <div class="form-group">
                            <label for="username">UserName:</label>
                            <input type="text" value={'Nguyen son dong'} class="form-control" id="username" disabled />
                        </div>
                        <div class="form-group">
                            <label for="phone">Phone:</label>
                            <input type="text" class="form-control" value={'0912345678'} id="phone" disabled />
                        </div>
                        <div class="form-group">
                            <label for="gamil">Gmail:</label>
                            <input type="text" value={'HapHoang@mgail.com'} class="form-control" id="gmail" disabled />
                        </div>
                        <div class="form-group">
                            <label for="roomid">RoomId:</label>
                            <input type="text" value={'232 A'} class="form-control" id="roomid" disabled />
                        </div>
                        <div class="form-group">
                            <label for="desciption">Desciption:</label>
                            <textarea type="text" class="form-control" id="desciption" value={'Good'} disabled>
                                {' '}
                            </textarea>
                        </div>

                        <div class="form-group">
                            <label for="created">Created-At:</label>
                            <input type="text" class="form-control" id="create" value={'23/1/2003'} disabled />
                        </div>

                        <div class="form-group">
                            <label for="status">Status</label>
                            <select class="form-control" id="status">
                                <option>Handle</option>
                                <option>Panding</option>
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

export default Review;
