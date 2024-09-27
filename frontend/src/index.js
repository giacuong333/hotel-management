import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

// Context
import UserProvider from './providers/UserProvider';

// Bootstrap CSS
import 'bootstrap/dist/css/bootstrap.min.css';
// Bootstrap Bundle JS
import 'bootstrap/dist/js/bootstrap.bundle.min';
// Tippy CSS
import 'tippy.js/dist/tippy.css';
import 'tippy.js/animations/scale.css';

import './index.css';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <UserProvider>
        <App />
    </UserProvider>,
);
