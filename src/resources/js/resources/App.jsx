import React from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";

import store from "../state/store";
import ErrorBoundary from "./components/Error/ErrorBoundry";
import { Routes } from "./navigation";
const ServerConfig = require("../../../server-config.json");

function App() {
    const { environment } = ServerConfig;

    return (
        <Provider store={store}>
            {environment === "local" && <Routes />}
            {environment !== "local" && (
                <ErrorBoundary>
                    <Routes />
                </ErrorBoundary>
            )}
        </Provider>
    );
}

export default App;

if (document.getElementById("root")) {
    createRoot(document.getElementById("root")).render(<App />);
}
