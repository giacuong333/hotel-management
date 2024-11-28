import React, { useState, useEffect } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { Col, Form, Row } from 'react-bootstrap';
import { Pie, Line, Bar } from 'react-chartjs-2';
import axios from 'axios';
import ToastContainer, { showToast } from '~/utils/showToast';

import {
    Chart,
    CategoryScale,
    LinearScale,
    Tooltip,
    Legend,
    Title,
    ArcElement,
    BarElement,
    PointElement,
    LineElement,
} from 'chart.js';

Chart.register(ArcElement, PointElement, LineElement, BarElement, CategoryScale, LinearScale, Tooltip, Legend, Title);

const Statistics = () => {
    const currentYear = new Date().getFullYear();

    const startOfYear = new Date(currentYear, 0, 1);

    const endOfYear = new Date(currentYear, 11, 31);

    const [selectedDate, setSelectedDate] = useState(startOfYear);
    const [selectedDateEnd, setSelectedDateEnd] = useState(endOfYear);
    const [dataPie, setDataPie] = useState([]);
    const [dataPieCustomer, setDataPieCustomer] = useState([]);

    const [dataLine, setDataLine] = useState([]);
    const [displayType, setDisplayType] = useState('daily');
    const [labelLines, setLabelLines] = useState([]);

    useEffect(() => {
        if (selectedDate && selectedDateEnd) {
            if (selectedDate > selectedDateEnd) {
            } else {
                setDisplayType(getDisplayType());
            }
        }
    }, [selectedDate, selectedDateEnd]);

    useEffect(() => {
        if (selectedDate > selectedDateEnd) {
            showToast('Start date cannot be after end date!', 'error');
            return;
        }
        const fetchBookings = async (url, setData) => {
            try {
                if (!selectedDate || !selectedDateEnd) {
                    return;
                }

                const startDate = selectedDate?.toLocaleDateString();
                const endDate = selectedDateEnd?.toLocaleDateString();

                const response = await axios.get(url, {
                    params: {
                        start: startDate,
                        end: endDate,
                    },
                    headers: {
                        'Content-Type': 'application/json',
                    },
                });

                if (response.status === 200) {
                    setData(response.data.$values || []);
                }
            } catch (error) {
                console.log('Error fetching:', error);
            }
        };

        fetchBookings('http://localhost:5058/statistics/pie', setDataPie);
        fetchBookings('http://localhost:5058/statistics/line', setDataLine);
        fetchBookings('http://localhost:5058/statistics/bar', setDataPieCustomer);
    }, [selectedDate, selectedDateEnd]);

    const getDisplayType = () => {
        if (!selectedDate || !selectedDateEnd) return 'monthly';

        const diffInMonths =
            (selectedDateEnd.getFullYear() - selectedDate.getFullYear()) * 12 +
            (selectedDateEnd.getMonth() - selectedDate.getMonth());
        const diffInYears = selectedDateEnd.getFullYear() - selectedDate.getFullYear();

        if (diffInYears >= 1) return 'yearly';
        if (diffInMonths >= 1) return 'monthly';
        return 'daily';
    };
    const labelLineDeFault = [
        'Tháng 1',
        'Tháng 2',
        'Tháng 3',
        'Tháng 4',
        'Tháng 5',
        'Tháng 6',
        'Tháng 7',
        'Tháng 8',
        'Tháng 9',
        'Tháng 10',
        'Tháng 11',
        'Tháng 12',
    ];

    useEffect(() => {
        let labels = [];
        if (!selectedDate || !selectedDateEnd) return setLabelLines(labelLineDeFault);
        if (displayType === 'daily') {
            console.log(selectedDate, '---', selectedDateEnd);

            let currentDate = new Date(selectedDate);
            let endDate = new Date(selectedDateEnd);

            currentDate.setHours(0, 0, 0, 0);
            endDate.setHours(23, 59, 59, 999);

            while (currentDate <= endDate) {
                labels.push(currentDate.toLocaleDateString('en-GB', { timeZone: 'Asia/Ho_Chi_Minh' }));
                currentDate.setDate(currentDate.getDate() + 1);
            }
        } else if (displayType === 'monthly') {
            let currentDate = new Date(selectedDate);
            while (currentDate <= selectedDateEnd) {
                labels.push(`Tháng ${currentDate.getMonth() + 1}`);
                currentDate.setMonth(currentDate.getMonth() + 1);
            }
        } else if (displayType === 'yearly') {
            let currentDate = new Date(selectedDate);
            while (currentDate <= selectedDateEnd) {
                labels.push(`${currentDate.getFullYear()}`);
                currentDate.setFullYear(currentDate.getFullYear() + 1);
            }
        }
        setLabelLines(labels);
    }, [displayType, selectedDate, selectedDateEnd]);

    const optionsLine = {
        responsive: true,
        plugins: {
            legend: {
                display: true,
                position: 'top',
            },
            tooltip: {
                enabled: true,
            },
        },
        scales: {
            x: {
                title: {
                    display: true,
                    text: displayType === 'daily' ? 'Ngày' : displayType === 'monthly' ? 'Tháng' : 'Năm',
                },
            },
            y: {
                title: {
                    display: true,
                    text: 'Doanh thu',
                },
                beginAtZero: true,
            },
        },
    };

    const dataLineChart = {
        labels: labelLines,
        datasets: [
            {
                label: 'Doanh thu',
                data: dataLine,
                fill: true,
                tension: 0.3,
                backgroundColor: 'rgba(75,192,192,0.2)',
                borderColor: 'rgba(75,192,192,1)',
                pointBackgroundColor: 'rgba(75,192,192,1)',
                pointBorderColor: '#fff',
                pointHoverBackgroundColor: '#fff',
                pointHoverBorderColor: 'rgba(75,192,192,1)',
                pointRadius: 6,
                pointHoverRadius: 8,
            },
        ],
    };
    console.log(dataLine);

    const dataP = {
        labels: ['Success', 'Cancel'],
        datasets: [
            {
                label: 'Bookings',
                data: dataPie,
                backgroundColor: ['#26B99A', '#3498DB'],
                hoverBackgroundColor: ['#2ECC71', '#2980B9'],
            },
        ],
    };
    const dataPCustomer = {
        labels: ['Total', 'Retry'],
        datasets: [
            {
                label: 'Customers',
                data: dataPieCustomer,
                backgroundColor: ['#26B99A', '#03586A'],
                hoverBackgroundColor: ['#2ECCB6', '#046B7A'],
                barThickness: 100,
            },
        ],
    };
    const optionsBar = {
        responsive: true,
        plugins: {
            legend: {
                display: true,
                position: 'top',
            },
        },
        scales: {
            y: {
                beginAtZero: true,
                max: Math.max(...dataPieCustomer) + 2,
                title: {
                    display: true,
                    text: 'Customer',
                },
            },
        },
    };
    const optionsP = {
        responsive: true,
        plugins: {
            legend: {
                display: true,
                position: 'top',
            },
            tooltip: {
                enabled: true,
            },
        },
    };

    return (
        <div>
            {ToastContainer}
            <Row className="mb-4">
                <Col md={7} className="">
                    {' '}
                </Col>
                <Col md={2} className="d-flex ">
                    <Form.Group controlId="formDate">
                        <Form.Label>Start: </Form.Label>
                        <DatePicker
                            selected={selectedDate}
                            onChange={(date) => setSelectedDate(date)}
                            dateFormat="yyyy/MM/dd"
                            className="form-control"
                        />
                    </Form.Group>
                </Col>
                <Col md={2} className="d-flex ">
                    <Form.Group controlId="formDateEnd">
                        <Form.Label>End: </Form.Label>
                        <DatePicker
                            selected={selectedDateEnd}
                            onChange={(date) => setSelectedDateEnd(date)}
                            dateFormat="yyyy/MM/dd"
                            className="form-control"
                        />
                    </Form.Group>
                </Col>
                <Col md={1} className="">
                    {' '}
                </Col>
            </Row>

            <Row>
                <Col md={1}></Col>
                <Col md={3}>
                    <Pie data={dataP} options={optionsP} />
                </Col>
                <Col md={1}></Col>
                <Col md={6}>
                    <Bar data={dataPCustomer} options={optionsBar} />
                </Col>
                <Col md={1}></Col>
            </Row>
            <Row className="justify-content-center">
                <Col md={12}>
                    <Line data={dataLineChart} options={optionsLine} />
                </Col>
            </Row>
        </div>
    );
};

export default Statistics;
