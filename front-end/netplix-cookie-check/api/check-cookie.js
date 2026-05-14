export default async function handler(req, res) {
    // Enable CORS
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type");

    // Handle preflight request
    if (req.method === "OPTIONS") {
        return res.status(200).end();
    }

    // Only allow POST
    if (req.method !== "POST") {
        return res.status(405).json({
            message: "Method Not Allowed",
        });
    }

    try {
        const { cookie } = req.body;

        // Validate cookie
        if (!cookie) {
            return res.status(400).json({
                message: "Cookie is required",
            });
        }

        // Validate API key
        if (!process.env.NETFLIX_API_KEY) {
            console.error("NETFLIX_API_KEY is missing");

            return res.status(500).json({
                message: "Server configuration error",
            });
        }

        console.log("API KEY EXISTS:", !!process.env.NETFLIX_API_KEY);

        // Send request to external API
        const response = await fetch("https://nftoken.site/v1/api.php", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                key: process.env.NETFLIX_API_KEY,
                cookie: cookie.trim(),
            }),
        });

        // Read raw response first for debugging
        const rawText = await response.text();

        console.log("EXTERNAL API STATUS:", response.status);
        console.log("EXTERNAL API RESPONSE:", rawText);

        // Try parsing JSON safely
        let data;

        try {
            data = JSON.parse(rawText);
        } catch {
            data = {
                raw: rawText,
            };
        }

        // Return external API errors directly
        if (!response.ok) {
            return res.status(response.status).json({
                success: false,
                externalStatus: response.status,
                data,
            });
        }

        // Success
        return res.status(200).json(data);
    } catch (error) {
        console.error("SERVER ERROR:", error);

        return res.status(500).json({
            success: false,
            message: "Internal Server Error",
            error: error.message,
        });
    }
}
