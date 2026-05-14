const rateLimit = new Map();

export default async function handler(req, res) {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type");

    if (req.method === "OPTIONS") {
        return res.status(200).end();
    }

    if (req.method !== "POST") {
        return res.status(405).json({ message: "Method Not Allowed" });
    }

    const { cookie } = req.body;
    const clientIp = req.headers["x-forwarded-for"] || req.socket.remoteAddress;
    const today = new Date().toDateString();
    const key = `${clientIp}-${today}`;

    // Check daily limit (100 cookies per day)
    const usedToday = rateLimit.get(key) || 0;
    if (usedToday >= 100) {
        return res.status(429).json({
            message: "Daily limit reached. Max 100 cookies per day.",
        });
    }

    if (!cookie) {
        return res.status(400).json({ message: "Cookie is required" });
    }

    try {
        rateLimit.set(key, usedToday + 1);

        const response = await fetch("https://nftoken.site/v1/api.php", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
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
