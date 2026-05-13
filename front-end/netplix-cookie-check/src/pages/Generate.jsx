import React, { useState } from "react";
import axios from "axios";

const Generate = () => {
    const [cookie, setCookie] = useState("");
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState("");
    const [responseData, setResponseData] = useState(null);

    const generateCookie = async (e) => {
        e.preventDefault();

        if (!cookie.trim()) {
            setMessage("Please enter a cookie.");
            return;
        }

        try {
            setLoading(true);
            setMessage("");
            setResponseData(null);

            const res = await axios.post("https://nftoken.site/v1/api.php", {
                key: import.meta.env.VITE_NETFLIX_KEY,
                cookie: cookie,
            });

            setResponseData(res.data.status);
            setMessage("Cookie generated successfully!");
        } catch (error) {
            console.error(error);

            setMessage(
                error.response?.data?.message ||
                    "API Error: Unable to generate API.",
            );
        } finally {
            setLoading(false);
        }
    };

    return (
        <div
            style={{
                maxWidth: "800px",
                width: "100%",
                margin: "50px auto",
                padding: "20px",
                border: "1px solid #ddd",
                borderRadius: "10px",
            }}
        >
            <h1>Netflix Cookies Gen</h1>

            <form onSubmit={generateCookie}>
                <label htmlFor="cookie">Enter Cookie Here:</label>

                <textarea
                    id="cookie"
                    rows="6"
                    placeholder="Paste Here..."
                    value={cookie}
                    onChange={(e) => setCookie(e.target.value)}
                    style={{
                        width: "100%",
                        marginTop: "10px",
                    }}
                />

                <button
                    type="submit"
                    disabled={loading}
                    style={{
                        marginTop: "15px",
                        padding: "10px 20px",
                        cursor: "pointer",
                    }}
                >
                    {loading ? "Generating..." : "Generate"}
                </button>
            </form>

            {message && (
                <p
                    style={{
                        marginTop: "15px",
                        color: message.includes("successfully")
                            ? "green"
                            : "red",
                    }}
                >
                    {message}
                </p>
            )}

            {responseData && (
                <div
                    style={{
                        marginTop: "20px",
                        padding: "15px",
                        background: "#f5f5f5",
                        borderRadius: "8px",
                    }}
                >
                    <h3>Response:</h3>

                    <pre
                        style={{
                            whiteSpace: "pre-wrap",
                            wordBreak: "break-word",
                        }}
                    >
                        {JSON.stringify(responseData, null, 2)}
                    </pre>
                </div>
            )}
        </div>
    );
};

export default Generate;
