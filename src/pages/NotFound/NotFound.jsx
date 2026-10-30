import React from 'react';
import { Link } from 'react-router-dom';
import "./notFound.css";

const NotFound = () => {
    return (
        <section className="not_found_section">
            <p className="not_found_code">404</p>
            <h1 className="not_found_title">Page not found</h1>
            <p className="not_found_text">The page you are looking for does not exist or has moved.</p>
            <Link to="/" className="not_found_link">Back to home</Link>
        </section>
    )
};

export default NotFound;
