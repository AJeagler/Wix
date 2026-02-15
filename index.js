const express = require("express");
const fetch = require("node-fetch");
const app = express();

const APP_ID = "1675375c154db3be3";
const API_KEY = "0c331b6f7371d139b168e48c99b822526a71d4e2";

async function createUser(uid) {
  const response = await fetch(`https://api-in.cometchat.io/v3/users`, {
    method: "POST",
    headers: {
      "apikey": API_KEY,
      "appId": APP_ID,
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ uid, name: uid })
  });
  return response.json();
}

app.get("/token", async (req, res) => {
  const uid = req.query.uid;
  if (!uid) return res.status(400).json({ error: "Missing uid" });

  try {
    // Try to create user (if it already exists, CometChat ignores it)
    await createUser(uid);

    // Then request auth token
    const tokenRes = await fetch(`https://api-in.cometchat.io/v3/users/${uid}/auth_tokens`, {
      method: "POST",
      headers: {
        "apikey": API_KEY,
        "appId": APP_ID,
        "Content-Type": "application/json"
      }
    });

    const tokenData = await tokenRes.json();
    res.json(tokenData);
  } catch (err) {
    res.status(500).json({ error: "Server error", details: err.toString() });
  }
});

app.listen(3000, () => console.log("Server running"));


