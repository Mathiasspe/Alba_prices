const { onRequest } = require("firebase-functions/v2/https");

const ALBA_API = "https://api.albaplay.com/graphql";

exports.albaAvail = onRequest({ cors: true }, async (req, res) => {
  if (req.method !== "POST") {
    res.status(405).send("Method not allowed");
    return;
  }

  try {
    const response = await fetch(ALBA_API, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(req.body),
    });

    const data = await response.json();
    res.set("Cache-Control", "public, max-age=60");
    res.json(data);
  } catch (e) {
    res.status(502).json({ error: "Proxy error" });
  }
});
