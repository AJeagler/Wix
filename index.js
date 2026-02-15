const express = require("express");
const fetch = require("node-fetch");
const app = express();

app.get("/token", async (req, res) => {
  const uid = req.query.uid;
  if (!uid) return res.status(400).json({ error: "Missing uid" });

  try {
    const response = await fetch(`https://api-in.cometchat.io/v3/users/${uid}/auth_tokens`, {
      method: "POST",
      headers: {
        "apikey": "0c331b6f7371d139b168e48c99b822526a71d4e2",
        "appId": "1675375c154db3be3",   // <-- ADD THIS
        "Content-Type": "application/json"
      }
    });

    const data = await response.json();
    res.json(data);

  } catch (err) {
    res.status(500).json({ error: "Server error", details: err.toString() });
  }
});

const port = process.env.PORT || 3000;
app.listen(port, () => console.log("Server running on port", port));

