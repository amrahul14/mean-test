const https = require("https");

exports.getWeather = async (req, res) => {
  const city = req.query.city || "Delhi";
  const apiKey = process.env.WEATHER_API_KEY;
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

  try {
    const response = await fetch(url);
    const data = await response.json();

    if (data.cod !== 200)
      return res.status(400).json({ message: data.message });

    // Sirf zaroori data frontend ko bhejo
    res.json({
      city: data.name,
      temperature: data.main.temp,
      description: data.weather[0].description,
      humidity: data.main.humidity,
      icon: data.weather[0].icon,
    });
  } catch (err) {
    res.status(500).json({ message: "Weather fetch failed" });
  }
};
