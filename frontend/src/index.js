import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";

import UserProvider from "./providers/UserProvider";

// Bootstrap CSS
import "bootstrap/dist/css/bootstrap.min.css";
// Bootstrap Bundle JS
import "bootstrap/dist/js/bootstrap.bundle.min";

import "./index.css";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
      <UserProvider>
            <App />
      </UserProvider>
);
