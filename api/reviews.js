const axios = require("axios");

export default async function handler(req, res) {
  const placeId = "ChIJhW9eTGZgCq0RVq_DrrKX-u0"; // Replace this with your actual Place ID
  const apiKey = process.env.GOOGLE_API_KEY;

  try {
    const url = `https://maps.googleapis.com/maps/api/place/details/json?place_id=${placeId}&fields=reviews&key=${apiKey}`;
    const response = await axios.get(url);

    console.log("Google API response:", response.data); // ✅ Log entire response

    const reviews = response.data.result.reviews;
    res.status(200).json(reviews.slice(0, 5)); // return only 5
  } catch (error) {
    console.error("Error fetching reviews:", error); // ✅ Log the error to Vercel
    res.status(500).json({ error: "Failed to fetch reviews", details: error.message });
  }
}
