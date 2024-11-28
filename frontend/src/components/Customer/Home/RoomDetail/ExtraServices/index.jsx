import React, { useState, useEffect } from 'react';
import axios from 'axios';

import Service from './Service';

const ExtraServices = ({ onServicesChange }) => {
    const [services, setServices] = useState([]);

    useEffect(() => {
        fetchServices();
    }, []);

    const fetchServices = async () => {
        try {
            const response = await axios.get('http://localhost:5058/service');

            if (response?.status === 200) {
                const servicesData = response?.data?.$values || response?.data?.obj;
                const filteredServices = servicesData.filter((service) => !service.deletedAt);
                // Thêm trạng thái ban đầu (isChecked và quantity)
                const servicesWithState = filteredServices.map((service) => ({
                    ...service,
                    isChecked: false,
                    quantity: 0,
                }));
                setServices(servicesWithState);
            }
        } catch (error) {
            console.error('Failed to fetch services:', error);
        }
    };

    const handleServiceChange = (id, updatedData) => {
        // Cập nhật trạng thái dịch vụ trong danh sách
        const updatedServices = services.map((service) =>
            service.id === id ? { ...service, ...updatedData } : service
        );
        setServices(updatedServices);

        // Gửi dữ liệu dịch vụ đã chọn cho cha
        const selectedServices = updatedServices.filter((s) => s.isChecked && s.quantity > 0);
        onServicesChange(selectedServices);
    };

    return (
        <ul className="d-flex flex-column gap-4">
            {services.map((service) => (
                <Service 
                    key={service?.id} 
                    service={service} 
                    onChange={(updatedData) => handleServiceChange(service.id, updatedData)}
                />
            ))}
        </ul>
    );
};

export default ExtraServices;
