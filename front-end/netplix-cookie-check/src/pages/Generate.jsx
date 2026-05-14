import React, { useState } from "react";
import axios from "axios";
import "./Generate.css";

const Generate = () => {
    const [cookie, setCookie] = useState("");
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState("");
    const [responseData, setResponseData] = useState(null);
    const [bulkResults, setBulkResults] = useState([]);
    const [isBulkMode, setIsBulkMode] = useState(false);

    const checkSingleCookie = async (cookieValue) => {
        const apiUrl =
            import.meta.env.VITE_API_URL || "http://localhost:3000/api";
        const res = await axios.post(`${apiUrl}/check-cookie`, {
            cookie: cookieValue,
        });
        return res.data;
    };

    const generateCookie = async (e) => {
        e.preventDefault();

        if (!cookie.trim()) {
            setMessage("Please enter a cookie or cookies.");
            return;
        }

        try {
            setLoading(true);
            setMessage("");
            setResponseData(null);
            setBulkResults([]);

            // Detect if bulk mode (multiple cookies separated by ---)
            const cookieLines = cookie
                .split("---")
                .map((c) => c.trim())
                .filter((c) => c.length > 0);

            if (cookieLines.length > 1) {
                // Bulk mode
                setIsBulkMode(true);
                const results = [];

                for (let i = 0; i < cookieLines.length; i++) {
                    try {
                        const res = await checkSingleCookie(cookieLines[i]);
                        results.push({
                            index: i + 1,
                            cookie: cookieLines[i],
                            status: res.status,
                            data: res,
                            error: null,
                        });
                    } catch (error) {
                        results.push({
                            index: i + 1,
                            cookie: cookieLines[i],
                            status: "ERROR",
                            data: null,
                            error: error.response?.data?.message || "API Error",
                        });
                    }
                }

                setBulkResults(results);
                const successCount = results.filter(
                    (r) => r.status === "SUCCESS",
                ).length;
                const deadCount = results.filter(
                    (r) => r.status === "DEAD",
                ).length;
                const errorCount = results.filter(
                    (r) => r.status === "ERROR",
                ).length;

                setMessage(
                    `Bulk check complete: ${successCount} active, ${deadCount} dead, ${errorCount} errors`,
                );
            } else {
                // Single mode
                setIsBulkMode(false);
                const res = await checkSingleCookie(cookieLines[0]);
                setResponseData(res);
                setMessage("Cookie checked successfully!");
            }
        } catch (error) {
            console.error(error);

            setMessage(
                error.response?.data?.message ||
                    "API Error: Unable to check cookie.",
            );
        } finally {
            setLoading(false);
        }
    };

    const isDead = responseData?.status === "DEAD";
    const isSuccess = responseData?.status === "SUCCESS";

    const getStatusGradient = () => {
        if (isDead) return "linear-gradient(135deg, #ff6b6b 0%, #ee5a6f 100%)";
        return "linear-gradient(135deg, #667eea 0%, #764ba2 100%)";
    };

    const getStatusShadow = () => {
        if (isDead) return "0 10px 40px rgba(255, 107, 107, 0.3)";
        return "0 10px 40px rgba(102, 126, 234, 0.3)";
    };

    const getStatusIcon = () => {
        if (isDead) return "❌";
        return "✅";
    };

    return (
        <div className={`container ${loading ? "loading" : ""}`}>
            {loading && (
                <div className="loading-overlay">
                    <div className="loading-card">
                        <div className="loading-icon">⏳</div>
                        <h2 className="loading-title">Checking Cookies</h2>
                        <p className="loading-text">Please wait a moment...</p>
                        <div className="loading-dots">
                            <div className="loading-dot" />
                            <div className="loading-dot" />
                            <div className="loading-dot" />
                        </div>
                    </div>
                </div>
            )}

            <div className="content-wrapper">
                <div className="header">
                    <h1 className="header-title">Netflix Cookie Checker</h1>
                    <p className="header-subtitle">
                        Checks for active netflix cookies
                    </p>
                </div>

                <form className="form" onSubmit={generateCookie}>
                    <label htmlFor="cookie" className="form-label">
                        Enter Your Cookie(s):
                        <span className="form-sublabel">
                            (Separate with --- for bulk check)
                        </span>
                    </label>

                    <textarea
                        id="cookie"
                        rows="6"
                        className="textarea"
                        placeholder="Paste your cookie here... or multiple cookies separated by --- (e.g., cookie1 --- cookie2 --- cookie3)"
                        value={cookie}
                        onChange={(e) => setCookie(e.target.value)}
                    />

                    <button
                        type="submit"
                        disabled={loading}
                        className="button-submit"
                    >
                        {loading ? "⏳ Checking..." : "🚀 Check Cookie(s)"}
                    </button>
                </form>

                {message && (
                    <div
                        className={`message-alert ${
                            message.includes("successfully") ||
                            message.includes("complete")
                                ? "success"
                                : "error"
                        }`}
                    >
                        {message.includes("successfully") ||
                        message.includes("complete")
                            ? "✅"
                            : "⚠️"}{" "}
                        {message}
                    </div>
                )}

                {isBulkMode && bulkResults.length > 0 && (
                    <div className="card-section">
                        <h2 className="section-title">📊 Bulk Check Results</h2>

                        <div className="grid">
                            {bulkResults.map((result) => (
                                <div
                                    key={result.index}
                                    className={`result-card ${result.status.toLowerCase()}`}
                                >
                                    <div className="result-header">
                                        <span className="result-index">
                                            #{result.index}
                                        </span>
                                        <span
                                            className={`result-status ${result.status.toLowerCase()}`}
                                        >
                                            {result.status === "SUCCESS"
                                                ? "✅ SUCCESS"
                                                : result.status === "DEAD"
                                                  ? "❌ DEAD"
                                                  : "⚠️ ERROR"}
                                        </span>
                                    </div>

                                    <p className="result-description">
                                        {result.error ||
                                            (result.status === "SUCCESS"
                                                ? "Cookie is valid"
                                                : "Cookie has expired")}
                                    </p>

                                    <div className="button-group">
                                        <button
                                            onClick={() => {
                                                navigator.clipboard.writeText(
                                                    result.cookie,
                                                );
                                                alert("Cookie copied!");
                                            }}
                                            className="btn-small btn-copy"
                                        >
                                            📋 Copy
                                        </button>

                                        {result.status === "SUCCESS" &&
                                            result.data && (
                                                <>
                                                    {result.data.x_l1 && (
                                                        <a
                                                            href={
                                                                result.data.x_l1
                                                            }
                                                            target="_blank"
                                                            rel="noopener noreferrer"
                                                            style={{
                                                                textDecoration:
                                                                    "none",
                                                            }}
                                                        >
                                                            <button className="btn-small btn-access">
                                                                🖥️ PC
                                                            </button>
                                                        </a>
                                                    )}
                                                    {result.data.x_l2 && (
                                                        <a
                                                            href={
                                                                result.data.x_l2
                                                            }
                                                            target="_blank"
                                                            rel="noopener noreferrer"
                                                            style={{
                                                                textDecoration:
                                                                    "none",
                                                            }}
                                                        >
                                                            <button className="btn-small btn-access">
                                                                📱 Mobile
                                                            </button>
                                                        </a>
                                                    )}
                                                    {result.data.x_l3 && (
                                                        <a
                                                            href={
                                                                result.data.x_l3
                                                            }
                                                            target="_blank"
                                                            rel="noopener noreferrer"
                                                            style={{
                                                                textDecoration:
                                                                    "none",
                                                            }}
                                                        >
                                                            <button className="btn-small btn-access">
                                                                📺 TV
                                                            </button>
                                                        </a>
                                                    )}
                                                </>
                                            )}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {responseData && (
                    <div
                        className="status-card"
                        style={{
                            background: getStatusGradient(),
                            boxShadow: getStatusShadow(),
                        }}
                    >
                        <div>
                            <div className="status-card-icon">
                                {getStatusIcon()}
                            </div>
                            <p className="status-card-label">Cookie Status</p>
                            <h2 className="status-card-title">
                                {responseData.status}
                            </h2>
                        </div>

                        {!isDead && (
                            <div className="status-card-buttons">
                                {responseData.x_l1 && (
                                    <a
                                        href={responseData.x_l1}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        style={{ textDecoration: "none" }}
                                    >
                                        <button className="btn-large">
                                            🖥️ PC
                                        </button>
                                    </a>
                                )}
                                {responseData.x_l2 && (
                                    <a
                                        href={responseData.x_l2}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        style={{ textDecoration: "none" }}
                                    >
                                        <button className="btn-large">
                                            📱 Mobile
                                        </button>
                                    </a>
                                )}
                                {responseData.x_l3 && (
                                    <a
                                        href={responseData.x_l3}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        style={{ textDecoration: "none" }}
                                    >
                                        <button className="btn-large">
                                            📺 TV
                                        </button>
                                    </a>
                                )}
                            </div>
                        )}

                        {isDead && (
                            <div className="status-card-dead">
                                This cookie has expired or is no longer valid.
                                Please try with a fresh cookie.
                            </div>
                        )}
                    </div>
                )}

                <div className="card-section">
                    <h2 className="section-title">
                        ▶ 1. How to Watch (Access Links)
                    </h2>

                    <div className="grid">
                        <div className="guide-card">
                            <button className="btn-guide pc">🖥️ PC</button>
                            <p className="guide-text">
                                For PC or Laptop users, simply click the{" "}
                                <strong>PC button</strong> to instantly log in
                                and start watching on your browser.
                            </p>
                        </div>

                        <div className="guide-card mobile">
                            <button className="btn-guide mobile">
                                📱 Mobile
                            </button>
                            <div className="warning-badge">
                                ⚠️ Safari NOT Supported
                            </div>
                            <p className="guide-text">
                                Click the <strong>Mobile button</strong>. It
                                works perfectly with the official mobile app,
                                but if you are using a browser, you{" "}
                                <strong>must use Google Chrome</strong> on your
                                phone. It will not work in Safari.
                            </p>
                        </div>

                        <div className="guide-card tv">
                            <button className="btn-guide tv">📺 TV</button>
                            <p className="guide-text">
                                Open the Netflix app on your TV and click "Sign
                                In" to generate a code on your TV screen. Then,
                                click the <strong>TV button</strong> here and
                                enter that code in your browser.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Generate;
