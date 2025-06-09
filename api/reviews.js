const axios = require("axios");

export default async function handler(req, res) {
  console.log("Handler called");

  const placeId = "ChIJhW9eTGZgCq0RVq_DrrKX-u0"; // Double-check this ID is valid
  const apikey = process.env.GOOGLE_API_KEY;

  if (!apikey) {
    console.error("Missing GOOGLE_API_KEY environment variable");
    return res.status(500).json({ error: "Server misconfiguration: Missing API Key" });
  }

  try {
    const url = `https://maps.googleapis.com/maps/api/place/details/json?place_id=${placeId}&fields=reviews&key=${apikey}`;
    console.log("Request URL:", url);

    const response = await axios.get(url);
    console.log("Google API response status:", response.data.status);

    if (response.data.status !== "OK") {
      throw new Error(`Google API error: ${response.data.status}`);
    }

    const reviews = response.data.result.reviews || [];
    res.status(200).json(reviews.slice(0, 5));
  } catch (error) {
    console.error("Error fetching reviews:", error.message);
    res.status(500).json({ error: "Failed to fetch reviews", details: error.message });
  }
}
