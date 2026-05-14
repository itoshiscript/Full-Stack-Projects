export default async function handler(req, res) {
    // Enable CORS
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type");

    // Handle preflight request
    if (req.method === "OPTIONS") {
        return res.status(200).end();
    }

    // Only accept POST requests
    if (req.method !== "POST") {
        return res.status(405).json({ message: "Method Not Allowed" });
    }

    const { cookie } = req.body;

    if (!cookie) {
        return res.status(400).json({ message: "Cookie is required" });
    }

    // Validate API key exists
    if (!process.env.NETFLIX_API_KEY) {
        console.error("NETFLIX_API_KEY not set in environment");
        return res.status(500).json({ message: "Server configuration error" });
    }

    try {
        const response = await fetch("https://nftoken.site/v1/api.php", {
            method: "POST",
            headers: {
                "Content-Type": "application/x-www-form-urlencoded",
            },
            body: new URLSearchParams({
                key: process.env.NETFLIX_API_KEY,
                cookie: cookie,
            }),
        });

        const data = await response.json();

        if (!response.ok) {
            return res
                .status(response.status)
                .json(data || { message: "API Error" });
        }

        return res.status(200).json(data);
    } catch (error) {
        console.error("API Error:", error.message);
        return res.status(500).json({ message: "Internal Server Error" });
    }
}
