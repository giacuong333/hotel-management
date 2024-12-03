import React, { useState, useEffect, useRef } from 'react';

import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { Colors } from 'chart.js';
import ContactAbout from './contactAbout';
import CardTimeContact from './cardTimeContact';
import AddressContact from './addressContact';
import ExclusiveOffers from '../Home/ExclusiveOffers';
const Contacts = () => {
    return (
        <section>
            <ContactAbout />
            <CardTimeContact />
            <AddressContact />
            <ExclusiveOffers />
        </section>
    );
};

export default Contacts;
