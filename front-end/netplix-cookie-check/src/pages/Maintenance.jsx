import React from "react";
import "./Maintenance.css";

const Maintenance = () => {
    return (
        <div className="maintenance-container">
            <div className="maintenance-card">
                <div className="maintenance-icon">🔧</div>
                <h1 className="maintenance-title">Website Under Maintenance</h1>
                <p className="maintenance-text">
                    We're currently performing scheduled maintenance to improve
                    your experience.
                </p>
                <p className="maintenance-subtitle">
                    We'll be back online shortly. Thank you for your patience!
                </p>
                <div className="maintenance-loader">
                    <div className="loader-dot"></div>
                    <div className="loader-dot"></div>
                    <div className="loader-dot"></div>
                </div>
            </div>
        </div>
    );
};

export default Maintenance;
