import React, {useState, useEffect} from 'react';
import axios from 'axios';

import Service from './Service';

const ExtraServices = () => {
    const [ services, setServices ] = useState([]);

    useEffect(() => {
        fetchServices();
    }, [])

    const fetchServices = async () => {
            try {
                const response = await axios.get('http://localhost:5058/service');
                
                if (response?.status === 200) {     
                        const servicesData = response?.data?.$values || response?.data?.obj;
                        servicesData.filter(service => !service.deletedAt);
                        setServices(servicesData);
                }
            } catch (error) {
                console.error('Failed to fetch services:', error);
            } 
    }
    return (
        <ul className="d-flex flex-column gap-4">
            {services.map((service) => (
                <Service 
                    service = {service}
                />
            ))}
        </ul>
    );
};

export default ExtraServices;
