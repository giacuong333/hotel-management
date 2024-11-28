import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

// Context
import UserProvider from './providers/UserProvider';

import CheckPermissionProvider from './providers/CheckPermissionProvider';

// Bootstrap CSS
import 'bootstrap/dist/css/bootstrap.min.css';
// Bootstrap Bundle JS
import 'bootstrap/dist/js/bootstrap.bundle.min';
// Tippy CSS
import 'tippy.js/dist/tippy.css';
import 'tippy.js/animations/scale.css';
// Style
import './index.css';
import { BrowserRouter } from 'react-router-dom';
import ServiceProvider from './providers/Service';
import { GoogleOAuthProvider } from '@react-oauth/google';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <BrowserRouter>
        <GoogleOAuthProvider clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}>
            <ServiceProvider>
                <UserProvider>
                    <CheckPermissionProvider>
                        <App />
                    </CheckPermissionProvider>
                </UserProvider>
            </ServiceProvider>
        </GoogleOAuthProvider>
    </BrowserRouter>,
);
