import React, { useState, useEffect } from 'react';
import { Line } from 'react-chartjs-2';
import axios from 'axios';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    LineElement,
    PointElement,
    LineController,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, LineElement, PointElement, LineController, Title, Tooltip, Legend);

const BookingStatus = () => {
    const [bookings, setBookings] = useState([]);

    useEffect(() => {
        const fetchBookings = async () => {
            try {
                const response = await axios.get('http://localhost:5058/dashboard/bookingsbymonth', {
                    headers: {
                        'Content-Type': 'application/json',
                    },
                });

                if (response.status === 200) {
                    setBookings(response.data.$values || []);
                }
            } catch (error) {
                console.log('Error fetching :', error);
            }
        };

        fetchBookings();
    }, []);

    const data = {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'June', 'July', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
        datasets: [
            {
                label: 'Bookings',
                data: bookings,
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

    const options = {
        scales: {
            x: {
                type: 'category',
                title: {
                    display: true,
                    text: 'Months',
                },
            },
            y: {
                beginAtZero: true,
                title: {
                    display: true,
                    text: 'Bookings',
                },
            },
        },
    };

    return (
        <div>
            <p className="text-capitalize fs-5 fw-semibold mb-2">Booking Status</p>
            <Line data={data} options={options} />
        </div>
    );
};

export default BookingStatus;
