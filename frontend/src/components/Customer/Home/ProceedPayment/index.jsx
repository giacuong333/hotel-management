import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

import { useUser } from '../../../../providers/UserProvider';
import { formatDate } from '~/utils/formatDate';

const ProccedPayment = () => {
    const { user } = useUser();
    const isAuthenticated = user !== null;

    const location = useLocation();
    const { room, checkInDate, checkOutDate, totalPrice, services } = location.state || {};
    
    return (
        <div style={{ padding: '20px' }}>
          <h2>Payment Details</h2>
          <div style={{ marginBottom: '10px' }}>
            <strong>Room:</strong> {room?.name} (ID: {room?.id})
          </div>
          <div style={{ marginBottom: '10px' }}>
            <strong>Check-In Date:</strong> {formatDate(checkInDate)}
          </div>
          <div style={{ marginBottom: '10px' }}>
            <strong>Check-Out Date:</strong> {formatDate(checkOutDate)}
          </div>
          <div style={{ marginBottom: '10px' }}>
            <strong>Total Price:</strong> ${totalPrice}
          </div>
    
          <h3>Selected Services:</h3>
          {services?.length > 0 ? (
            services.map((service, index) => (
              <div key={index}>{service.name} * {service.quantity}</div>
            ))
          ) : (
            <div>No services selected</div>
          )}
        </div>
    );
}

export default ProccedPayment;