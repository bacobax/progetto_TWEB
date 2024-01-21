import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import {BrowserRouter} from "react-router-dom";
import {AuthContextProvider} from "./store/AuthContext";

/**
 * Create a root container where the React application will be attached.
 * The root container is created using the ReactDOM.createRoot() method.
 * The method takes a DOM element as an argument, in this case, an element with the id "root".
 * The "root" element is retrieved using the document.getElementById() method.
 * The retrieved element is then typecasted to HTMLElement.
 */
const root = ReactDOM.createRoot(
    document.getElementById("root") as HTMLElement
);

/**
 * Render the React application into the root container.
 * The application is wrapped in multiple context providers and React's StrictMode.
 *
 * React.StrictMode is a wrapper component which checks the application for potential problems in development mode.
 *
 * BrowserRouter is a Router component from the react-router-dom library. It uses the HTML5 history API to keep the UI in sync with the URL.
 *
 * AuthContextProvider is a context provider component defined in the application. It provides authentication context to the components in the application.
 *
 * App is the root component of the application.
 */
root.render(
    <React.StrictMode>
        <BrowserRouter>
            <AuthContextProvider>
                    <App/>
            </AuthContextProvider>
        </BrowserRouter>
    </React.StrictMode>
);
// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
