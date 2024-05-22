// weather.js
import axios from 'axios';

export const fetchWeatherData = async () => {
  const apiKey = 'YOUR_WEATHER_UNDERGROUND_API_KEY'; // Replace with your Weather Underground API key
  const location = 'Ulaanbaatar, Mongolia'; // Adjust as necessary
  const url = `https://api.weather.com/v1/location/${location}/observations/historical.json?apiKey=${apiKey}&units=m&startDate=20220514&endDate=20240514`;

  try {
    const response = await axios.get(url);
    return response.data.observations;
  } catch (error) {
    console.error('Error fetching weather data:', error);
    throw error;
  }
};
